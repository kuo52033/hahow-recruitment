const { getHeroesList } = require('../../service/hero')

module.exports = async (req, res, next) =>{
    try {
        const heroesList = await getHeroesList();

        res.status(200).json(heroesList);
    } catch (error) {
        next(error);
    }
}