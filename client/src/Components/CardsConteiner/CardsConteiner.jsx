import Cards from "../CardsPokemon/Cards";
import style from "./CardsConteiner.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearFilteredPokemons, setName } from "../../Redux/actions";
import Paginate from "../Paginate/Paginate";

const CardsConteiner = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const pokemonsFilter = useSelector((state) => state.filteredPokemons);
  const pokemonByName = useSelector((state) => state.pokemonByName);
  const setPokemonName = useSelector((state) => state.setName);
  console.log(pokemonByName)

  //Paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(5); // Número de Pokémon por página
  const [totalPages, setTotalPages] = useState(0); // Total de páginas

  const dispatch = useDispatch();

  useEffect(() => {
    const totalItems = pokemons.length;
    setTotalPages(Math.ceil(totalItems / pokemonsPerPage));
  }, [pokemons.length, pokemonsPerPage]);

  useEffect(() => {
    if (pokemonByName !== null) {
      dispatch(setName(true));
    }
    dispatch(clearFilteredPokemons);
  }, [dispatch, pokemonByName]);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber)
    setCurrentPage(pageNumber);
  };

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
      <div>
        <div className={style.divCardsConteiner}>
          <Paginate
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
          />
          {setPokemonName ? (
            <Cards
              id={pokemonByName.id}
              name={pokemonByName.name}
              img={pokemonByName.img}
              key={pokemonByName.id}
            />
          ) : (
            currentPokemons.map((p) => {
              return (
                <Cards
                  id={p.id}
                  name={p.name}
                  img={p.img}
                  key={p.id}
                  types={p.types}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
};
export default CardsConteiner;
