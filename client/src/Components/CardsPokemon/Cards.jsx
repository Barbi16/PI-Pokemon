import style from "./Cards.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearPokemonById } from "../../Redux/actions";

const Cards = (props) => {


  const dispatch = useDispatch();
  function handlerClear() {
    dispatch(clearPokemonById());
  }

  return (
    <div className={style.divCars}>
      <div className={style.divInner}>
        <div className={style.frontCard}>
          <h3> {props.name} </h3>
          <Link
            key={props.id}
            to={`pokemon/${props.id}`}
            onClick={handlerClear}
          >
            <img src={props.img} alt="pokemons" />
          </Link>
        </div>
        <div className={style.backCard}>
          <h2>Types</h2>
          {props.types && props.types.map((type, index) => (
            <Link className={style.typeName} key={index} to={`pokemon/${props.id}`} onClick={handlerClear}>
              <h3> {type.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Cards;
