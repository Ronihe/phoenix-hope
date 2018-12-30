/* Step model  */
const db = require('../db');
const APIError = require('../helpers/APIError');
const sqlPartialUpdate = require('../helpers/partialUpdateSql');
const { TWILIO } = require('../config');
// const Goal = require('./Goal');

const accountSid = TWILIO.accountSid;
const authToken = TWILIO.authToken;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const sendingNum = TWILIO.sendingNumber;
const receivingNum = TWILIO.receivingNumber;

class Twilio {
  //send a message
  static async sendMsg(msg) {
    const message = await client.messages.create({
      body: msg,
      to: receivingNum,
      from: sendingNum
    });

    return msg;
  }

  // send a message before the due date, should it be async func?
  static sendDueMsg(msg, hours) {
    // 24 hours before the due day
    setTimeout(async () => {
      await Twilio.sendMsg(msg);
    }, hours * 3600 * 1000);
    return `${msg} will be sendt in ${hours} hours`;
  }

  // send interval reminder
  // static setDailyReminder(msg, hours) {
  //   //set reminder
  //   const dailyReminder = setInterval(async () => {
  //     await Twilio.sendMsg(msg);
  //   }, 24 * 3600 * 1000);
  //   //stops duedate
  //   setTimeout(() => {
  //     clearInterval(dailyReminder);
  //   }, hours * 3600 * 1000);
  // }
  // static async:

  //return your goals, use the goals in the goals method

  // cancel a inteval reminder
  static cancelSendMsg(setTimer) {
    clearTimeout(setTimer);
  }
  //
}
module.exports = Twilio;
