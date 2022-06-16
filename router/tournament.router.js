// ToBe Implemented
const express = require('express');

const {createNewTournament, viewAllTournamentDetails, joinTournament, getTournamentDetails} = require('../controller/tournamentController');
const router = express.Router();

router.get("/",(req,res)=>{
    res.json("just checking tournament")
})

router.put("/create",(req,res)=>{
    console.log("Creating the tournament");
    createNewTournament(req,res);
})

router.get("/view",(req,res)=>{
    console.log("Viewing all the tournaments");
    viewAllTournamentDetails(req,res);
})

router.get("/join",(req,res)=>{
    console.log("Joining the tournament");
    joinTournament(req,res);
})

router.get("/getTournament/:id",(req,res)=>{
    console.log("Getting the tournament details");
    getTournamentDetails(req,res);
}
)
module.exports = router;