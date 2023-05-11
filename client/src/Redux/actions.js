import axios from "axios";

export const GET_POKEMON = "GET_POKEMON";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_TYPE = "GET_POKEMON_TYPE";
export const CLEAR_POKEMON_BY_ID = "CLEAR_POKEMON_BY_ID";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const GET_SELECTED_OPTION = "GET_SELECTED_OPTION";
export const ORDER_POKEMONS_UPWARD_ALFAB = "ORDER_POKEMONS_UPWARD_ALFAB";
export const ORDER_POKEMONS_FALLING_ALFAB = "ORDER_POKEMONS_FALLING_ALFAB";
export const ORDER_POKEMONS_UPWARD_ATTACK = "ORDER_POKEMONS_UPWARD_ATTACK";
export const ORDER_POKEMONS_FALLING_ATTACK = "ORDER_POKEMONS_FALLING_ATTACK";
export const CLEAR_FILTERED_POKEMONS = "CLEAR_FILTERED_POKEMONS";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const SET_NAME = "SET_NAME";
export const ADD_POKEMON = "ADD_POKEMON"

export const getPokemon = () => {
  return async function (dispatch) {
    const apiPokemon = await axios.get("/pokemons");
    const pokemons = apiPokemon.data;

    dispatch({ type: GET_POKEMON, payload: pokemons });
  };
};

export const getPokemonById = (id) => {
  
  return async function (dispatch) {
    const apiPokemon = await axios.get(`/pokemons/${id}`);
    const pokemonById = apiPokemon.data;

    dispatch({ type: GET_POKEMON_BY_ID, payload: pokemonById });
  };
};

export const getPokemonType = () => {
  return async function (dispatch) {
    const apiTypes = await axios.get("/types");
    const pokemonTypes = apiTypes.data;
    dispatch({ type: GET_POKEMON_TYPE, payload: pokemonTypes });
  };
};
export const clearPokemonById = () => {
  return {
    type: "CLEAR_POKEMON_BY_ID",
  };
};

export const filterByType = () => {
  return {
    type: "FILTER_BY_TYPE",
  };
};

export const getSelectedOption = (option) => {
  return {
    type: "GET_SELECTED_OPTION",
    payload: option,
  };
};

export const orderThePokemons = (type) => {
  if (type === "upward") {
    
    return {
      type: "ORDER_POKEMONS_UPWARD_ALFAB",
    };
  }
  if (type === "falling") {
    return {
      type: "ORDER_POKEMONS_FALLING_ALFAB",
    };
  }
  if (type === "+attack") {
    return {
      type: "ORDER_POKEMONS_UPWARD_ATTACK",
    };
  }
  if (type === "-attack") {
    
    return {
      type: "ORDER_POKEMONS_FALLING_ATTACK",
    };
  }
};

export const clearFilteredPokemons = () => {
  return {
    type: "CLEAR_FILTERED_POKEMONS",
  };
};

export const getPokemonByName = (value) => {
  
  return async function (dispatch) {
    if (value) {
      try {
        let pokemon = await axios.get(
          `/pokemons?name=${value}`
        );

        return dispatch({
          type: "GET_POKEMON_BY_NAME",
          payload: pokemon.data,
        });
      } catch (error) {
        return dispatch({
          type: "GET_POKEMON_BY_NAME",
          payload: error.name,
        });
      }
    }
  };
};

export const setName = (estado) => {
  return {
    type: "SET_NAME",
    payload: estado,
  };
};

// Post

export function addPokemon(pokemon) {
  return async function (dispatch) {
    try {
      dispatch({ type: "ADD_POKEMON", payload: true });
      await axios.post(`/pokemons`, pokemon);
    } catch (error) {
      
      dispatch({ type: "ADD_POKEMON", payload: false });
    }
  };
}