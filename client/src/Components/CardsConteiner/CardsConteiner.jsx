import Cards from "../CardsPokemon/Cards";
import style from "./CardsConteiner.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearFilteredPokemons, setName } from "../../Redux/actions";

const CardsConteiner = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const pokemonsFilter = useSelector((state) => state.filteredPokemons);
  const pokemonByName = useSelector((state) => state.pokemonByName);
  const setPokemonName = useSelector((state) => state.setName);

  const dispatch = useDispatch();
  
 console.log(pokemons)


  useEffect(() => {
    
    
    if (pokemonByName !== null) {
      dispatch(setName(true));
    }
    dispatch(clearFilteredPokemons);
  }, [ dispatch, pokemonByName]);



 
  if (pokemonsFilter.length !== 0) {
    return (
      <div className={style.divCardsConteiner}>
        {pokemonsFilter.map((p) => {
          return <Cards id={p.id} name={p.name} img={p.img} key={p.id} />;
        })}
      </div>
    );
  } else {
    return (
      <div className={style.divCardsConteiner}>
        {setPokemonName ? (
          <Cards
            id={pokemonByName[0].id}
            name={pokemonByName[0].name}
            img={pokemonByName[0].img}
            key={pokemonByName[0].id}
            
          />
        ) : (
          pokemons.map((p) => {
            return <Cards id={p.id} name={p.name} img={p.img} key={p.id} types={p.types}/>;
          })
        )}
      </div>
    );
  }
};
export default CardsConteiner;
