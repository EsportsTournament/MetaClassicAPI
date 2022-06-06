const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: [String]
    },
    gender: {
        type: String
    },
    role: {
        type: String
    },
    dob: {
        type: Date
    },
    address: {
        type: [String]
    },
    image: {
        type: String
    },
    tournamentsParticipatedIn: {
            type: [
                {
                    matchesPlayed: [{
                        type: {
                            matchId: String,
                            position: Number
                        }
                    }]
                }
            ]
    },
    awards: {
        type: [String]
    },
    games: {
        type: [
            {
                gameName: String,
                playerId: String,
                playerName: String,
                addedOn: Date,
                modifiedOn: Date,
                gameTags: [String],
            }
        ]
    },
    metaData: [{
        type: {
            lastLoggedIn: {
                type: Date
            },
            macAddress: {
                type: String
            },
            ipAddress: {
                type: String
            },
            deviceDetails: {
                type: String
            },
            location: {
                type: String
            }
        }
    }]
})

mongoose.model('User', userSchema)