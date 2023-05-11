import { React, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilteredPokemons,
  filterByType,
  getPokemonByName,
  getPokemonType,
  getSelectedOption,
  orderThePokemons,
  setName
} from "../../Redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const [type, setTypes] = useState("");
  const dispatch = useDispatch();
  const pokemonTYPE = useSelector((state) => state.pokemonTypes);

  useEffect(() => {
    dispatch(getPokemonType());

  }, [dispatch]);

  const handlTypes = (e) => {
    setTypes(e.target.value);
    dispatch(getPokemonType(e.target.value));
  };

  //seleccionar las types
  const select = useSelector((state) => state.selectedOption);

  const handlClick = (e) => {
    dispatch(getSelectedOption(e.target.value));
    dispatch(filterByType());
  };

  // ordenamiento
  function handleOrder(e) {

    dispatch(orderThePokemons(e.target.value));
    dispatch(clearFilteredPokemons());
  }

  //busqueda por name
  const [namesearch, setNamesearch] = useState("");

  
  const handleSearch = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setNamesearch(inputValue);

  };
  const submit = (e) =>{
    e.preventDefault()
    dispatch(getPokemonByName(namesearch))
    setNamesearch("")
  }

  //boton clear
  const hanldeClearFilter = () =>{
    dispatch(clearFilteredPokemons())
    dispatch(setName(false))
    
    
  }

  return (
    <div className={style.conteinerSeachBar}>
      <form onSubmit={submit} className={style.form}>
          <input
          value={namesearch}
            type="text"
            onChange={handleSearch}
            placeholder="Find your pokemon..."
            className={style.conteinerInput}
          />
          <button onClick={hanldeClearFilter} className={style.buttonFilter}>Borrar Filtros</button>
      </form>
      
      <div className={style.conteinerSelects}>
        <div className={style.selectFilter}>
          <label htmlFor="filter"> Selecciona los tipos </label>
          <select
            className={style.selectCheck}
            multiple
            name="filter"
            id="filter"
            onChange={handlTypes}
            value={type}
          >
            <option value="Types">Types</option>
            {pokemonTYPE &&
              pokemonTYPE.map((t) => {
                return (
                  <option
                    value={t.name}
                    key={t.id}
                    onClick={handlClick}
                    className={
                      select && select.includes(t.name)
                        ? style.selected
                        : style.noSelected
                    }
                  >
                    {t.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <label for="orderPokemons">Ordenalos: </label>
          <select onChange={handleOrder}>
            <option value="order">Order</option>
            <option key="upward" value="upward">
              Ascendente
            </option>
            <option key="falling" value="falling">
              Descendente
            </option>
            <option key="+attack" value="+attack">
              + Fuerza{" "}
            </option>
            <option key="-attack" value="-attack">
              - Fuerza
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
