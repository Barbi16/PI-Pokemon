const{ Op } = require("sequelize")
const { Router } = require("express");

const {
  getPokemon,
  getIdPokemon,
  addPokemon,
  getTypes,
  getAllPokemons
} = require("../controllers/controller.js");
const { Pokemon, Type } = require("../db.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/pokemons", async (req, res) => {
  const {name}= req.query;
  
  //si en el endpoint pasan un name
  try {
    if (name) {
      const namePok = name.toLowerCase();
   
      const pokBDDName = await Pokemon.findAll({
        where: {
          name: {[Op.iLike]: `%${namePok}%`}}
        
      });
      
      if (pokBDDName.length !== 0) {
        return res.status(200).json(pokBDDName);
      } else {
        const pokApi = await getPokemon();
        const findNameApi = pokApi.find((p) => p.name === namePok);
        if (findNameApi) {
          return res.status(200).json(findNameApi);
        } else {
           throw new Error("El pokemon no existe");
        }
      }
    } else {
      // trae todos los pok de la api
      const result = await getAllPokemons();
      res.status(200).json(result);
    }
  } catch (error) {

    res.status(400).json({error: error.message})
  }

});

router.get("/pokemons/:id", async (req, res) => {
  const id = req.params;
  try {
    const result = await getIdPokemon(id);
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
;
});

router.post("/pokemons", async (req, res) => {
  
  const { name, hp, img, attack, defense, speed, height, weight,types } = req.body;

 

  try {
    const newPokemons = await addPokemon(name, hp, img, attack, defense, speed, height, weight, types);
    return res.status(200).json(newPokemons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/types", async (req, res) => {
try {
  const result = await getTypes();
  res.status(200).json(result)
} catch (error) {
  res.status(400).json({error: error.message})
}

});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
