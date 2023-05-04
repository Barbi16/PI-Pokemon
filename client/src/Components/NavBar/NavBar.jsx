import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
import style from "./NavBar.module.css"
import logo from "../../img/pngwing.com (1).png"


const NavBar = () => {
    return(
        <div>
            <div className={style.containerNavBar}>
                <Link to="/home" className={style.linkLogo}><img className={style.logoImg} src={logo} alt="logo de pokemons" /></Link>
                <Link to="/create" className={style.Link}><button className={style.form}>Create  </button></Link>
            </div>
            <img src="../../img/fotos-de-pokemon.jpg" alt="" />
            <SearchBar/>
        </div>


    )
}
export default NavBar