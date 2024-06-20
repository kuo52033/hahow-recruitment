const { getHeroesList, getAuthenticatedHeroesList } = require('../../service/hero')

module.exports = async (req, res, next) =>{
    const { isAuth } = res.locals;
    let heroes;

    try {
        if(isAuth){
            heroes = await getAuthenticatedHeroesList();
        }else{
            heroes = await getHeroesList();
        }
             
        res.status(200).json({ heroes });
    } catch (error) {
        next(error);
    }
}