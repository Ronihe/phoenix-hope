/* Step model  */
const db = require('../db');
const APIError = require('../helpers/APIError');
const sqlPartialUpdate = require('../helpers/partialUpdateSql');
const { TWILIO } = require('../config');
const bt = require('big-time');
const lt = require('long-timeout');
// const Goal = require('./Goal');

const accountSid = TWILIO.accountSid;
const authToken = TWILIO.authToken;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const sendingNum = TWILIO.sendingNumber;

class Twilio {
  //send a message
  static async sendMsg(msg, phone) {
    console.log(phone);
    const receivingNum = '+1' + phone;
    console.log(receivingNum);
    const message = await client.messages.create({
      body: msg,
      to: receivingNum,
      from: sendingNum
    });

    return msg;
  }

  // send a message before the due date, should it be async func?
  static sendDueMsg(msg, hours, phone) {
    // 24 hours before the due day

    bt.setTimeout(async () => {
      await Twilio.sendMsg(msg, phone);
    }, hours * 3600 * 1000);
    return `${msg} will be sendt in ${hours} hours`;
  }

  //send interval reminder
  static setDailyReminder(msg, hours, phone) {
    const dailyReminder = lt.setInterval(() => {
      Twilio.sendMsg(msg, phone);
    }, 24 * 3600 * 1000);
    //stops duedate
    bt.setTimeout(() => {
      lt.clearInterval(dailyReminder);
    }, hours * 3600 * 1000);
  }
  // static async:

  //return your goals, use the goals in the goals method

  // cancel a inteval reminder
  static cancelSendMsg(setTimer) {
    clearTimeout(setTimer);
  }
  //
}
module.exports = Twilio;
