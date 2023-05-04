const axios = require("axios");
const { Pokemon, Type } = require("../db");

let idBDD = 100;

async function getPokemon() {
  //traemos todos los pokes de la API
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=40"
    );
    return Promise.all(
      response.data.results.map(async (pokemon) => {
        let result = await axios.get(pokemon.url);
        let pokemons = {
          id: result.data.id,
          name: result.data.name,
          hp: result.data.stats[0].base_stat,
          attack: result.data.stats[1].base_stat,
          defense: result.data.stats[2].base_stat,
          speed: result.data.stats[4].base_stat,
          height: result.data.height,
          weight: result.data.weight,
          img: result.data.sprites.other.home.front_default,
          types: result.data.types.map((type) => {
            return { name: type.type.name };
          }),
        };
        return pokemons;
      })
    );
  } catch (error) {
    return error;
  }
}

async function getIdPokemon(id) {
  const numID = Number(id.id);
  // si el largo d mi string es menor a 2 busco en la api
  if (numID < 100) {
    const pokApi = await getPokemon();
    const findIdpokApi = pokApi.find((f) => f.id === numID);
    if (findIdpokApi) return findIdpokApi;
  } else {
    const pokBDDId = await Pokemon.findByPk(id.id, {

      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    } );

    console.log(pokBDDId)
    if (pokBDDId) return pokBDDId;
  }
  throw new Error("El id solicitado no existe");
}

async function addPokemon(
  name,
  hp,
  img,
  attack,
  defense,
  speed,
  height,
  weight,
  types
) {

console.log(types)
 
  
    //verificamos que el pokemon que se quiere agregar no exista
    const findNameBD = await Pokemon.findOne({ where: { name: name } });
    if (findNameBD) throw new Error("El pokemon ya existe");

    //agregamos un pokemon
    const newPokemon = await Pokemon.create({
      id: ++idBDD,
      name,
      hp,
      img,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    console.log(types)
    for (const t of types) {
     
      let tipos = await Type.findOne({
        where: {
          name: t,
        },
      });

      await newPokemon.addType(tipos);
    }
    //console.log(newPokemon)
    let pokemonCreate = await Pokemon.findOne({
      where: {
        id: newPokemon.id,
      },
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    //console.log(newPokemon);
    return pokemonCreate;

  
}

async function getTypes() {
  const findApiType = await Type.findAll();
  if (findApiType.length) {
    return findApiType;
  } else {
    const apiTypes = await axios.get("https://pokeapi.co/api/v2/type");
    //console.log(apiTypes.data.results)
    const promise = Promise.all(
      apiTypes.data.results.map(async (type, index) => {
        let typesApi = await axios.get(type.url);
        //console.log(typesApi.data.name)

        const types = await Type.create(
          {
            id: `TYPE${index}`,
            name: typesApi.data.name,
          },
          {
            timestamps: false,
          }
        );

        return types;
      })
    );
    return promise;
  }
}
// Trae todos los pokemos de la DB y API
async function getAllPokemons() {
  const dbPokemons = await Pokemon.findAll({
    include: {
      model: Type,
      through: {
        attributes: [],
      },
      attributes: ["name"],
    },
  });
 
  const ApiPokemons = await getPokemon();
  const totalPoke =  await dbPokemons.concat(ApiPokemons)
console.log(totalPoke)
  return totalPoke;
}
module.exports = {
  getPokemon,
  getIdPokemon,
  addPokemon,
  getTypes,
  getAllPokemons,
};
