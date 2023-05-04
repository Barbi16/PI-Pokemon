import { GET_POKEMON, GET_SELECTED_OPTION, ORDER_POKEMONS_UPWARD_ALFAB, ORDER_POKEMONS_FALLING_ALFAB, CLEAR_FILTERED_POKEMONS, ORDER_POKEMONS_UPWARD_ATTACK, ORDER_POKEMONS_FALLING_ATTACK, GET_POKEMON_BY_NAME, SET_NAME } from "./actions";
import { GET_POKEMON_BY_ID } from "./actions";
import { CLEAR_POKEMON_BY_ID } from "./actions";
import {FILTER_BY_TYPE} from "./actions"
import {GET_POKEMON_TYPE} from "./actions"
import { ADD_POKEMON } from "./actions";



const initialState = {
  pokemons: [],
  pokemonById: [],
  filteredPokemons: [],
  pokemonTypes:[],
  selectedOption: [],
  pokemonByName : null,
  setName: false,
  addPokemon: false
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON:
      return { ...state, pokemons: action.payload };

    case GET_POKEMON_BY_ID:
      return { ...state, pokemonById: action.payload };

    case GET_POKEMON_TYPE:
      return{...state, pokemonTypes: action.payload}

    case CLEAR_POKEMON_BY_ID:
      return {
        ...state,
        pokemonById: [],
      };

    case FILTER_BY_TYPE:
      const filteredPokemons = state.pokemons.filter(pokemon => {
        return pokemon.types.some(type => state.selectedOption.includes(type.name));
      });
      
      if (filteredPokemons.length) {
        return {
          ...state,
       
          filteredPokemons: filteredPokemons,
        };
      } else {
        return {
          ...state,
          filteredPokemons: [],
        };
      }

      case GET_SELECTED_OPTION :
        const itemIndex = state.selectedOption.indexOf(action.payload);
        if (itemIndex === -1) {
          return {
            ...state,
            selectedOption: [...state.selectedOption, action.payload]
          };
        } else {
          return {
            ...state,
            selectedOption: state.selectedOption.filter(name => name !== action.payload)
          };
        }
      case ORDER_POKEMONS_UPWARD_ALFAB: 
        let orderPokeUpward = state.pokemons.sort((a, b) => a.name.localeCompare(b.name))
        
        return{
          ...state,
          filteredPokemons: orderPokeUpward
        }
      case ORDER_POKEMONS_FALLING_ALFAB:
      let orderPokeFalling = state.pokemons.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        } else if (a.name > b.name) {
          return -1;
        } else {
          return 0;
        }
      });
      return{
        ...state,
        filteredPokemons: orderPokeFalling
      }

      case ORDER_POKEMONS_UPWARD_ATTACK:
        const orderPokeUpwardAttack = state.pokemons.sort(
          (a, b) => {
            if (a.attack < b.attack) {
              return 1;
            } else if (a.attack > b.attack) {
              return -1;
            } else {
              return 0;
            }
          }
        )
     
        return{
          ...state,
          filteredPokemons: orderPokeUpwardAttack
        }

       case ORDER_POKEMONS_FALLING_ATTACK:
        console.log('pasa');
        const orderPokeFallingAttack = state.pokemons.sort(
          (a, b) => {
            if (a.attack < b.attack) {
              return -1;
            } else if (a.attack > b.attack) {
              return 1;
            } else {
              return 0;
            }
          }
        )
        console.log(orderPokeFallingAttack)
        return{
          ...state,
          filteredPokemons: orderPokeFallingAttack
        }

    case CLEAR_FILTERED_POKEMONS:
      return{
        ...state,
        filteredPokemons: [] , 
         selectedOption: []
      }
    
    case GET_POKEMON_BY_NAME  :
      console.log(action.payload)
      return{
        ...state,
        pokemonByName: action.payload
      }

    case SET_NAME:
      return{
        ...state, 
        setName: action.payload
      }

    case ADD_POKEMON:
      return {
        ...state,
        addedPokemon: action.payload,
      };  
      

    default:
      return { ...state };
  }
};
export default rootReducer;
