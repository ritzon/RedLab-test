const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require("moment")
moment.locale('es')

// This method is for convert the US format date to EU format date
function convertUsToEuDate(inputFormat) {
  /*
	function pad(s) { return (s < 10) ? '0' + s : s; }
	let d = new Date(inputFormat);
	return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
  */
  let date = inputFormat.split("-");
  return date.reverse().join("/");
}

// This method is for convert the EU format date to US format date
function convertEuToUsDate(inputFormat) {
  let date = inputFormat.split("/");
  return date.reverse().join("-");
}

// This method is for convert the EU format date to US format date witn - instead of /
function getCurrentDate() {
  let date = new Date();
  let str_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  return str_date;
}

function convert24hTo12h (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}

function throwException(codeMessage){
    const messages = require("../config/properties/messages");
    throw {code: codeMessage, message: messages[codeMessage]}
}

function getFirstPropertyOfObject(obj){
  return obj[Object.keys(obj)[0]];
}

// return uniq values of array (user filter function)
function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

function getWorkingDays(days) {
  let all_days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  let json_days = {
    'sunday': false,
    'monday': false,
    'tuesday': false,
    'wednesday': false,
    'thursday': false,
    'friday': false,
    'saturday': false
  };

  for(let i=0; i<days.length; i++) {
    let pos = days[i];
    json_days[[ all_days[pos] ]] = true;
  }

  return json_days;
}

function getDaysDiff(fDate, sDate) {
  let oneDay = 24*60*60*1000;
  let start = new Date(convertEuToUsDate(fDate.slice(0,10)));
  let end = new Date(convertEuToUsDate(sDate.slice(0,10)));
  let diffDays = Math.round(Math.abs((start.getTime() - end.getTime())/(oneDay)));
  let result = diffDays ? diffDays : 0
  
  return result;
}

function codeStringToBase64(str) {
  return Buffer.from(str).toString('base64');
}

function decodeBase64ToString(str) {
  return Buffer.from(str, 'base64').toString('ascii');
}

module.exports = {
  convertEuToUsDate,
  convertUsToEuDate,
  convert24hTo12h,
  getCurrentDate,
  throwException,
  getFirstPropertyOfObject,
  onlyUnique,
  getWorkingDays,
  Op,
  moment,
  getDaysDiff,
  codeStringToBase64,
  decodeBase64ToString
}