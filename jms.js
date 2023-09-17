/*
 * Surge 面板显示 JMS 剩余流量信息和套餐到期时间
 * update: 8/7/2023
 * version: 1.1
 * telegram: @Slotheve
*/

let args = getArgs();
let title = args.title || "JMS_info"
let icon = args.icon || "airplane.circle";
let iconColor = args.color || "#32CD32";
const apiUrl = args.url;

JMS_getDataInfo(apiUrl, function (result) {

  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  hour = hour > 9 ? hour : "0" + hour;
  minutes = minutes > 9 ? minutes : "0" + minutes;

  if (result.error) {
    $done({ title: `${title} | ${hour}:${minutes}`, content: "获取失败，请检查模块或网络", icon: icon, "icon-color": "#ff4500" });
  }

  let jsonData = JSON.parse(result.data);
  let usage = jsonData.bw_counter_b;
  let total = jsonData.monthly_bw_limit_b;
  let resetDay = jsonData.bw_reset_day_of_month;

  let resetDate = JMS_getExpireDate(resetDay);
  let resetDayLeft = getRmainingDays(parseInt(resetDay));
  let expireDate = args.expire;
  let content = [`已用: ${JMS_bytesToSize(usage)} | 剩余: ${toMultiply(total, usage)}`];

  if (resetDayLeft || expireDate) {
    if (resetDayLeft && expireDate && expireDate !== "false") {
      if (/^[\d.]+$/.test(expireDate)) expireDate *= 1000;
      content.push(`重置: \t${resetDayLeft} 天 \t| 到期: ${formatTime(expireDate)}`);
    } else if (resetDayLeft && !expireDate) {
      content.push(`重置: \t${resetDayLeft} 天 \t| 到期: ${formatTime(resetDate)}`);
    } else if (!resetDayLeft) {
      content.push(`到期时间：${formatTime(resetDate)}`);
    }
  }

  $done({
    title: `${title} | ${toPercent(usage, total)} | ${hour}:${minutes}`,
    content: content.join("\n"),
    icon: `${icon}`,
    "icon-color": `${iconColor}`,
  });
})

function getArgs() {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}

function JMS_getDataInfo(url, callback) {
  const headers = {
    'User-Agent': 'Quantumult%20X'
  };

  $httpClient.get({url: url, headers: headers}, function (error, response, data) {
    if ((error) || (response.status !== 200)) {
      callback({ error: true, data: null });
    } else {
      callback({ error: false, data: data });
    }
  });
}

function getRmainingDays(resetDay) {
    if (!resetDay) return;
  
    let now = new Date();
    let today = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();
    let daysInMonth;
  
    if (resetDay > today) {
      daysInMonth = 0;
    } else {
      daysInMonth = new Date(year, month + 1, 0).getDate();
    }
  
    return daysInMonth - today + resetDay;
  }

//function JMS_bytesToSize(bytes) {
//  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
//  if (bytes === undefined) return "N/A";
//  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)));
//  return Math.round((bytes / Math.pow(1000, i)) * 100) / 100 + " " + sizes[i];
//}

function JMS_bytesToSize(bytes) {
  if (bytes === 0) return "0B";
  let k = 1000;
  sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}

//function bytesToSizeNumber(bytes) {
//  if (bytes === 0) return "0";
//  let k = 1024;
//  let i = Math.floor(Math.log(bytes) / Math.log(k));
//  return (bytes / Math.pow(k, i)).toFixed(2);
//}

function toPercent(num, total) {
  return (Math.round((num / total) * 10000) / 100).toFixed(1) + "%";
}

function toMultiply(total, num) {
  let totalDecimalLen, numDecimalLen, maxLen, multiple;
  try {
    totalDecimalLen = total.toString().split(".").length;
  } catch (e) {
    totalDecimalLen = 0;
  }
  try {
    numDecimalLen = num.toString().split(".").length;
  } catch (e) {
    numDecimalLen = 0;
  }
  maxLen = Math.max(totalDecimalLen, numDecimalLen);
  multiple = Math.pow(10, maxLen);
  const numberSize = ((total * multiple - num * multiple) / multiple).toFixed(maxLen);
  return JMS_bytesToSize(numberSize);
}

function JMS_getExpireDate(dayOfMonth) {
  if (!dayOfMonth) return;

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const nextMonth = (currentMonth + 1 ) % 12;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  const lastDayOfMonth = new Date(nextYear, nextMonth, 0).getDate();
  const resetDate = Math.min(dayOfMonth, lastDayOfMonth);

  if (dayOfMonth > today) {
    return new Date(nextYear, nextMonth, resetDate).toLocaleDateString();
  } else {
    return new Date(nextYear, currentMonth, resetDate).toLocaleDateString();
  }
}

function formatTime(time) {
  let dateObj = new Date(time);
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  return year + "." + month + "." + day;
}
