const { sendGetRequestToHahowAPI } = require('../lib/axios')

function getHeroesList(){
    return sendGetRequestToHahowAPI('/heroes')
}

module.exports = {
    getHeroesList,
}