const mongoose = require('mongoose');

let tournamentSchema = new mongoose.Schema({
    tournamentId: {
        type: String
    },
    game: {
        type: String
    },
    name: {
        type: String
    },
    type: {
        type: String
    },
    entryFee: {
        type: Number
    },
    prize: {
        type: {
            totalPrize: Number,
            otherPrizes: [
                {
                    name: String,
                    value: Number
                }
            ]
        }
    },
    managementTeam: {
        type: [String]
    },
    createdBy: {
        type: String
    },
    createdOn: {
        type: Date
    },
    streaming: {
        type: [
            {
                platformName: String,
                applyPromotion: Boolean,
            }
        ]
    },
    matches: {
            type: [{
                matchDate: {
                    type: Date
                },
                matchDetails: {
                    type: String
                },
                maxTeamAllowed: {
                    type: Number
                },
                maxPlayerAllowed: {
                    type: Number
                },
                maxPlayerPerTeamAllowed: {
                    type: Number
                },
                matchType: {
                    type: String
                },
                matchVenue: {
                    type: String
                },
                matchWinner: {
                    type: {
                        teamName: {
                            type: String
                        },
                        teamPlayers: [{
                            type: String
                        }],
                        playerName: {
                            type: String
                        }
                    }
                },
                matchEliminators: {
                        type: [{
                            teamName: {
                                type: String
                            },
                            teamPlayers: [{
                                type: String
                            }],
                            playerName: {
                                type: String
                            }
                        }]
                    },
                matchAwardWinners:{
                        type: [{
                            name: {
                                type: String
                            },
                            winner: {
                                type: String
                            }
                        }]
                },
                matchAwards:  {
                    type: [String]   
                },
                metaData: {
                    addedBy: {
                        type: String
                    },
                    addedOn: {
                        type: Date
                    },
                }
            }]
    },
    tournamentWinner: {
        type: {
            teamName: {
                type: String
            },
            teamPlayers: [{
                type: String
            }],
            playerName: {
                type: String
            }
        }
    },
    tournamentEliminators: {
            type: [{
                teamName: {
                    type: String
                },
                teamPlayers: [{
                    type: String
                }],
                playerName: {
                    type: String
                }
            }]
        },
    tournamentAwardWinners:{
            type: [{
                name: {
                    type: String
                },
                winner: {
                    type: String
                }
            }]
    },
    tournamentAwards:  {
        type: [String]   
    },
    images: {
        type: [String]
    }
})

mongoose.model('tournament', tournamentSchema)