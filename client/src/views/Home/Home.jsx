import { useEffect } from "react"
import {useDispatch} from "react-redux"
import CardsConteiner from "../../Components/CardsConteiner/CardsConteiner"
import { getPokemon } from "../../Redux/actions"


const Home = () =>{

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getPokemon())
    },[dispatch])


    return(
        <>
        <CardsConteiner/>
        </>
    )
}
export default Home