import style from "./Landing.module.css"
import { Link } from "react-router-dom"

const Landing = () =>{
    return(
        <div className={style.landingConteiner}>
        <Link to="/home"><button className={style.buttonLanding}>Let's   GO</button></Link>
        </div>
    )
}
export default Landing