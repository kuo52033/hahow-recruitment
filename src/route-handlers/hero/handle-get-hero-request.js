const { getHeroById } = require('../../service/hero')

module.exports = async (req, res, next) =>{
    try {
        const hero = await getHeroById(req.params.heroId);
             
        res.status(200).json(hero);
    } catch (error) {
        next(error);
    }
}