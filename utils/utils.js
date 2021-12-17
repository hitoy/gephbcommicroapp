/**
 * 通用JS功能模块
 */
//给数字增加0
function addzero(num) {
  if (num < 10) num = '0' + num;
  return num.toString();
} //格式化时间


function formatDate(format, seconds) {
  let d = new Date(seconds * 1000);
  let finds = ['Y', 'm', 'n', 'd', 'j', 'H', 'i', 's'];
  let replace = [addzero(d.getFullYear()), addzero(d.getMonth() + 1), (d.getMonth() + 1).toString(), addzero(d.getDate()), d.getDate().toString(), addzero(d.getHours()), addzero(d.getMinutes()), addzero(d.getSeconds())];
  finds.forEach(function (el, index) {
    format = format.replace(el, replace[index]);
  });
  return format;
}

module.exports = {
  formatDate: formatDate
};