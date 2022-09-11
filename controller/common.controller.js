const properties = require('../config/properties');
const axios = require('axios');
const { Client } = require('clashofclans.js');
const client = new Client();
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


(async function () {
  await client.login({ email: 'adityathakur532@gmail.com', password: 'qdiJ4aGfbnXG!yM' });
  console.log('connected to coc');
})();

const userMap = {
  "cranky": 'UCJ2tGQAyeWDopEMA0iAVSRQ'
}

const clanMap = {
  // "ckzo": '#LUJJJORV'
  "ckzo": '#PR09UCRR'
}

async function fetchYoutubeVideoList(req, res) {
  console.log('Fetching youtube video list');
  if (userMap[req.body.user]) {
    await axios.get("https://www.googleapis.com/youtube/v3/search?key=" +
      properties.youtubeAPIKey +
      "&channelId=" + userMap[req.body.user] + "&part=snippet,id&chart=mostPopular&maxResults=11", {
      withCredentials: true,
    }).then((ytRes) => {
      console.log(ytRes.data.items);
      res.send(ytRes.data.items.filter(item => item.id.kind == "youtube#video").map(
        ytLink => ytLink.id.videoId
      ))
    });
  } else {
    res.send({
      error: 205,
      msg: "User not found"
    });
  }
}

const playerMapper = (player) => {
  return {
    league: player.league,
    name: player.name,
    tag: player.tag,
    townHallLevel: player.townHallLevel,
    builderHallLevel: player.builderHallLevel,
    role: player.role,
    labels: player.labels
  };
}

async function getPlayerList(clanTag) {
  const clan = await client.getClan(clanTag);
  return await clan.fetchMembers().then(memberList => {
    return {"clan": clan, 
    "members": memberList.map(playerMapper),
     "clanLink": clan.shareLink};
  });
}

async function getWarDetails(clantag) {
  return client.getCurrentWar(clantag).then(
    (currentWar) => { 
      let warMemberList = [];
      currentWar.clan.members.forEach( member => {
        const attacker = {
          name: member.name,
          score: 0,
          pos: member.mapPosition,
          th: member.townHallLevel,
          attacks: [],
          defence: JSON.parse(JSON.stringify(currentWar.getDefenses(member.tag), getCircularReplacer()))
        };
        member.attacks.forEach(attack => {
          const newAttack = currentWar.getAttack(attack.attackerTag, attack.defenderTag);
          const defender = currentWar.getMember(attack.defenderTag);
          const attackToSend = { 
            ...newAttack, 
            defenderName: defender.name,
            defenderTh: defender.townHallLevel, 
            defenderMapPosition: defender.mapPosition
           };
          attacker.attacks.push(JSON.parse(JSON.stringify(attackToSend, getCircularReplacer())));
          attacker.score += attack.destruction
        });
        attacker.defence.forEach( defence => {
          attacker.score += (100 - defence.destruction);
        })
        warMemberList.push(attacker);
      });
      return {
        currentWar: currentWar,
        members: warMemberList
      };
    }
  )
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

async function fetchAllPlayersDetails(req, res) {
  console.log('Fetching all players list of ', req.body.clan);
  if (clanMap[req.body.clan]) {
    try {
      await getPlayerList(clanMap[req.body.clan]).then(
        clanInfo => {
          delete clanInfo.members[0].client;
          res.send(JSON.stringify({clanPlayers: clanInfo.members, clan: clanInfo.clan, clanLink: clanInfo.clanLink}, getCircularReplacer()));
        }
      )
    } catch (err) {
      console.log('Error occured:- ', err);
      res.send(err);
    }
  } else {
    res.send({
      error: 205,
      msg: "Clan not allowed"
    });
  }
}

async function fetchCurrentWarDetails(req, res) {
  console.log('Fetching current war details of ', req.body.clan);
  if (clanMap[req.body.clan]) {
    try {
      await getWarDetails(clanMap[req.body.clan]).then(
        war => {
          res.send(JSON.stringify(war, getCircularReplacer()));
        }
      )
    } catch (err) {
      console.log('Error occured:- ', err);
      res.send(err);
    }
  } else {
    res.send({
      error: 205,
      msg: "Clan not allowed"
    });
  }
}

module.exports = { fetchYoutubeVideoList, fetchAllPlayersDetails, fetchCurrentWarDetails };
