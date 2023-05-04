import style from "./Detail.module.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPokemonById } from "../../Redux/actions";
import { useSelector } from "react-redux";

const Detail = () => {
  const dispatch = useDispatch();

  const pokemonById = useSelector((state) => state.pokemonById);
  const { id } = useParams();
  console.log(pokemonById);
  useEffect(() => {
    dispatch(getPokemonById(id));
  }, [dispatch, id]);

  if (pokemonById.length === 0) {
    return <div className={style.spinner}></div>;
  } else {
    return (
      <div className={style.detailConteiner}>
        <div className={style.tarjetPoke}>
          <h1 className={style.name}>{pokemonById.name}</h1>
          <h2>
            Types:
            {pokemonById && pokemonById.types.map((t) => {
              return <span> {t.name}</span>;
            })}
          </h2>
          <h2 className={style.hp}> 🩸 health {pokemonById.hp} </h2>
          <h2 className={style.attack}>🗡 attack {pokemonById.attack}</h2>

          <h2>🛡 defense {pokemonById.defense}</h2>
          <h2>💨 speed {pokemonById.speed}</h2>
          <h2>📏 height {pokemonById.height}</h2>
          <h2>🟣 weight {pokemonById.weight}</h2>
          <img
            src={pokemonById.img}
            alt="pokemon"
            className={style.imgPoke}
          ></img>
        </div>
      </div>
    );
  }
};
export default Detail;
