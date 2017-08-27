function getIdOfGivenNickName(nicknames, chosenOpponent) {
   
    for (let key in nicknames) {
        if (nicknames[key] === chosenOpponent) {
            return key;
        }
    }
}

module.exports = { 
    getIdOfGivenNickName, 
    users: {}
}