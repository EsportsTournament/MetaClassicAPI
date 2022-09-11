const TelegramBot = require('node-telegram-bot-api');
const token = '5499870108:AAHp12qelQILmIcyUZXQ2l2wpMZ0REjZyqA';
const bot = new TelegramBot(token, {polling: true});
let idList = [];

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    console.log('on text -', msg);
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
  
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
  });
  // Listen for any kind of message. There are different kinds of
  // messages.
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
  console.log('msg - ', msg);
  idList.push(msg.chat.id);
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, '1.5 hoshiyar, bot hai taiyar');
  });
  