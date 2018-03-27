let date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1
let day = date.getDate()
let hour = date.getHours()
let minute = date.getMinutes()
let second = date.getSeconds()

var formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 格式化年月日时分秒
var formatDateTime = date => {
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 格式化时间、日期
var formatDate = (type, dateTime = new Date()) => {
  if (dateTime) {
    date = new Date(dateTime)
    year = date.getFullYear()
    month = date.getMonth() + 1
    day = date.getDate()
  } else {
    date = new Date()
    year = date.getFullYear()
    month = date.getMonth() + 1
    day = date.getDate()
  }

  hour = date.getHours()
  minute = date.getMinutes()
  second = date.getSeconds()

  switch (type) {
    case "yyyy-MM-dd":
      return [year, month, day].map(formatNumber).join('-')
      break;
    case "yyyy-MM":
      return [year, month].map(formatNumber).join('-')
      break;
    case "yyyy-MM-01":
      return [year, month].map(formatNumber).join('-') + '-01'
      break;
    case "yyyy":
      return year + '年'
      break;
    case "HH:mm":
      return [hour, minute].map(formatNumber).join(':')
      break;
    default:
      return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
      break;
  }
}

// 根据数额转换单位
var formatNum = (number = 0) => {
  // 如果不是数字类型直接返回
  if (isNaN(number)) {
    return {
      value: number,
      unit: ''
    }
  }
  // 小于千万级别的数额都转换为万的单位
  if ((number >= 1000 && number < 10000000) || (number <= -1000 && number > -10000000)) {
    return {
      value: parseFloat(number / 10000).toFixed(2),
      unit: '万'
    }
  }
  // 小于亿级别的数额都转换为千万的单位
  else if ((number >= 10000000 && number < 100000000) || (number <= -10000000 && number > -100000000)) {
    return {
      value: parseFloat(number / 10000000).toFixed(2),
      unit: '千万'
    }
  }
  // 大于亿级别的数额则为亿
  else if (number >= 100000000 || number <= -100000000) {
    return {
      value: parseFloat(number / 100000000).toFixed(2),
      unit: '亿'
    }
  }
  // 小于千级别的数额默认为元
  else {
    return {
      value: parseFloat(number).toFixed(1),
      unit: ''
    }
  }
}

// 格式化金额
var angelMoney = (monery = 0) => {
  monery = monery.toString()
  monery = monery.replace(/^(\d*)$/, "$1.")
  monery = (monery + "00").replace(/(\d*\.\d\d)\d*/, "$1")
  monery = monery.replace(".", ",")
  let re = /(\d)(\d{3},)/
  while (re.test(monery)) {
    monery = monery.replace(re, "$1,$2")
  }
  monery = monery.replace(/,(\d\d)$/, ".$1")
  return '¥ ' + monery.replace(/^\./, "0.")
}

module.exports = {
  formatDateTime: formatDateTime,
  formatDate: formatDate,
  formatNum: formatNum,
  angelMoney: angelMoney
}
