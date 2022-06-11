// ToBe Implemented
const mongoose = require('mongoose');
const Logger = require('nodemon/lib/utils/log');
const user = mongoose.model('User');

function createNewTournament(req, res) {
    console.log('need to register ', req.body.email);
    var newTournament = new tournament(); 
        newTournament.tournamentId = req.body.tournamentId;
        newTournament.game = req.body.game;
        newTournament.name = req.body.name;
        newTournament.type = req.body.type;
        newTournament.entryFee = req.body.entryFee;
        newTournament.prize = req.body.prize;
        newTournament.managementTeam = req.body.managementTeam;
        newTournament.createdBy = req.body.createdBy;
        newTournament.createdOn = req.body.createdOn;
        newTournament.streaming = req.body.streaming;
        newTournament.matches = req.body.matches;
        newTournament.save(function(err, tournament) {
            if (err) {
                Logger.error(err);
                res.send(err);
            } else {
                Logger.info('Tournament created successfully');
                res.send(tournament);
            }
        });


    }
// Function to view the tournament details
function viewTournamentDetails(req, res) {
    tournament.find({}, function(err, tournament) {
        if (err) {
            Logger.error(err);
            res.send(err);
        } else {
            Logger.info('Tournament details fetched successfully');
            res.send(tournament);
        }
    });
}

//Function to join the tournament using the tournament ID
function joinTournament(req, res) {
    tournament.findOne({ tournamentId: req.body.tournamentId }, function(err, tournament) {
        if (err) {
            Logger.error(err);
            res.send(err);
        } else {
            Logger.info("Tournament joined successfully");
            res.send(tournament);
        }
    });
}
