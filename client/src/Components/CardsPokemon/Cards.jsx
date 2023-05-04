import style  from "./Cards.module.css"
import {Link} from "react-router-dom"
import { useDispatch } from "react-redux"
import { clearPokemonById } from "../../Redux/actions"

const Cards = (props)=>{

    console.log(props)
 const dispatch = useDispatch()
 function handlerClear () {

    dispatch(clearPokemonById())
 }

    return(
        <div className={style.divCars }>
            <h3>Name: {props.name}</h3>
            <Link   key={props.id}  to={`pokemon/${props.id}`} onClick={handlerClear} ><img  src={props.img} alt="pokemons" /></Link>
        </div>
    )
}
export default Cards 
