var now = new Date() // 当前日期
var nowDayOfWeek = now.getDay() // 今天本周的第几天
var nowDay = now.getDate() // 当前日
var nowMonth = now.getMonth() // 当前月
var nowYear = now.getYear() // 当前年
nowYear += (nowYear < 2000) ? 1900 : 0 //

// 格式化日期：yyyy-MM-dd
function formatDate (date) {
    var myyear = date.getFullYear()
    var mymonth = date.getMonth() + 1
    var myweekday = date.getDate()

    if (mymonth < 10) {
        mymonth = '0' + mymonth
    }
    if (myweekday < 10) {
        myweekday = '0' + myweekday
    }
    return (myyear + '-' + mymonth + '-' + myweekday)
}

// 获得某月的天数
function getMonthDays (myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1)
    var monthEndDate = new Date(nowYear, myMonth + 1, 1)
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
    return days
}

// 获得本季度的开始月份
function getQuarterStartMonth () {
    var quarterStartMonth = 0
    if (nowMonth < 3) {
        quarterStartMonth = 0
    }
    if (nowMonth > 2 && nowMonth < 6) {
        quarterStartMonth = 3
    }
    if (nowMonth > 5 && nowMonth < 9) {
        quarterStartMonth = 6
    }
    if (nowMonth > 8) {
        quarterStartMonth = 9
    }
    return quarterStartMonth
}

// 获得当天的开始日期
function getDayStartDate () {
  var dayStartDate = new Date(nowYear, nowMonth, nowDay - 1)
  return formatDate(dayStartDate)
}

// 获得当天的结束日期
function getDayEndDate () {
  var dayEndDate = new Date(nowYear, nowMonth, nowDay)
  return formatDate(dayEndDate)
}

// 获得本周的开始日期
function getWeekStartDate () {
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1)
    return formatDate(weekStartDate)
}

// 获得本周的结束日期
function getWeekEndDate () {
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek))
    return formatDate(weekEndDate)
}

// 获得本月的开始日期
function getMonthStartDate () {
    var monthStartDate = new Date(nowYear, nowMonth, 1)
    return formatDate(monthStartDate)
}

// 获得本月的结束日期
function getMonthEndDate () {
    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth))
    return formatDate(monthEndDate)
}

// 获得本季度的开始日期
function getQuarterStartDate () {
    var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1)
    return formatDate(quarterStartDate)
}

// 或的本季度的结束日期
function getQuarterEndDate () {
    var quarterEndMonth = getQuarterStartMonth() + 2
    var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth))
    return formatDate(quarterStartDate)
}

// 获得本年的开始日期
function getYearStartDate () {
    // 获得当前年份4位年
    var currentYear = now.getFullYear()
    // 本年第一天
    var currentYearFirstDate = new Date(currentYear, 0, 1)
    return formatDate(currentYearFirstDate)
}

// 获得本年的结束日期
function getYearEndDate () {
    // 获得当前年份4位年
    var currentYear = now.getFullYear()
    // 本年最后
    var currentYearLastDate = new Date(currentYear, 11, 31)
    return formatDate(currentYearLastDate)
}

// 获取今天日期
function getNowDay () {
  return [formatDate(now), formatDate(now)]
}

// 获取昨日日期
function getYestoday () {
  return [formatDate(new Date(now.getTime() - 3600 * 1000 * 24 * 1)), formatDate(new Date(now.getTime() - 3600 * 1000 * 24 * 1))]
}

// 获取近一周
function getNearWeek () {
  return [formatDate(new Date(now.getTime() - 3600 * 1000 * 24 * 7)), formatDate(new Date(now.getTime() - 3600 * 1000 * 24 * 1))]
}

// 获取近一个月
function getNearMonth () {
  return [formatDate(new Date(now.getTime() - 3600 * 1000 * 24 * 30)), formatDate(new Date(now.getTime() - 3600 * 1000 * 24 * 1))]
}

// 获取近一年
function getNearYear () {
  return [formatDate(new Date(now.getTime() - 3600 * 1000 * 24 * 365)), (new Date(now.getTime() - 3600 * 1000 * 24 * 1))]
}

// 根据指定日期获取近一个月
export function getNearMonthByAppoint (date) {
  return [formatDate(new Date(new Date(date).getTime() - 3600 * 1000 * 24 * 30)), formatDate(new Date(date))]
}

export default {
  dayRange: [getDayStartDate(), getDayEndDate()],
  weekRange: [getWeekStartDate(), getWeekEndDate()],
  monthRange: [getMonthStartDate(), getMonthEndDate()],
  quarterRange: [getQuarterStartDate(), getQuarterEndDate()],
  yearRange: [getYearStartDate(), getYearEndDate()],
  nowDay: getNowDay(),
  Yestoday: getYestoday(),
  nearWeek: getNearWeek(),
  nearMonth: getNearMonth(),
  nearYear: getNearYear()
}
