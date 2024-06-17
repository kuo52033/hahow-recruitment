async function getHeroesList(){
    return {
        heroes: [
          {
            id: 1,
            name: "Daredevil",
            image: "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg"
          },
          {
            id: 2,
            name: "Thor",
            image: "http://x.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg"
          },
        ]
      }
}

module.exports = {
    getHeroesList,
}