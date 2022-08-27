const properties = require('../config/properties');
const axios = require('axios');
const userMap = {
  "cranky": 'UCJ2tGQAyeWDopEMA0iAVSRQ'
}
const clanMap = {
  "ckzo": '%23PR09UCRR'
}
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjlmMDkwMTgyLTNlODMtNGE1Zi05NmM4LTJjYTY4NTlkM2QxZiIsImlhdCI6MTY2MTU4NDAyNCwic3ViIjoiZGV2ZWxvcGVyL2UwZWEyYjE4LTE1NzItNDA2YS1jYzkzLWFiNDYzMDA4MjY0YSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjIyMy4yMjYuMTg5LjExNiIsIjAuMC4wLjAiXSwidHlwZSI6ImNsaWVudCJ9XX0.yZxDiXvc3UOT9bwdFPjmF5XPCDvLgbyCQqwYAWGcklLW7ckJ7HUZj-lSEfLDe2XaTDKWeZB-CDy0pDq4GAKUoA";
const config = {
  headers: { Authorization: `Bearer ${token}` }
};

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

async function fetchAllPlayersDetails(req, res) {
  console.log('Fetching all players list of ', req.body);
  var playerList = [];
  if (clanMap[req.body.clan]) {
    try {
      await axios.get("https://api.clashofclans.com/v1/clans/" + clanMap[req.body.clan] + "/members", config)
        .then((cocRes) => {
          console.log('data found');
          Promise.all(cocRes.data.items.map(item => {
            return new Promise((resolve, reject) => {
              axios.get("https://api.clashofclans.com/v1/players/%23" + item.tag.substring(1), config).then(
                (playerRes) => {
                  resolve(playerRes.data)
                }
              ).catch((err) => reject(err));
            })
          })).then(data => {
            res.send(data);
          }).catch(err => console.log(err))
        })
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
