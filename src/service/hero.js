const HahowAPI = require('../lib/hahow-api')

function getHeroesList(){
    const api = new HahowAPI();
    
    return api.findHeroes();
}

module.exports = {
    getHeroesList,
}