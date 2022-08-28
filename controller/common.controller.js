const properties = require('../config/properties');
const axios = require('axios');
const { Client } = require('clashofclans.js');
const client = new Client();
(async function () {
  await client.login({ email: 'adityathakur532@gmail.com', password: 'qdiJ4aGfbnXG!yM' });
  console.log('connected to coc');
})();
const userMap = {
  "cranky": 'UCJ2tGQAyeWDopEMA0iAVSRQ'
}
const clanMap = {
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
      )
      )
    });

  } else {
    res.send({
      error: 205,
      msg: "User not found"
    });
  }
}

async function getPlayerList(clanTag) {
  const clan = await client.getClan(clanTag);
  return await clan.fetchMembers().then(member => {
    return member;
  });
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
        players => {
          delete players[0].client;
          res.send(JSON.stringify({clanPlayers: players}, getCircularReplacer()));
        }
      )
    } catch (err) {
      console.log('Error occured:- ', err);
      res.send(err);
    }
  } else {
    res.send({
      error: 205,
      msg: "Clan not found"
    });
  }
}

module.exports = { fetchYoutubeVideoList, fetchAllPlayersDetails };
