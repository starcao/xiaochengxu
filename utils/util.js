const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function customtime(date, format = true) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  let show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
  let daily = date.getDay();

  if (format) {
    return { year: year, month: formatNumber(month), day: formatNumber(day), hour: formatNumber(hour), minute: formatNumber(minute), second: formatNumber(second), week: show_day[daily]};
  }
  return {year: year, month: month, day: day, hour: hour, minute: minute, second: second, week: show_day[daily]};
}

module.exports = {
  formatTime: formatTime,
  customtime: customtime
}
