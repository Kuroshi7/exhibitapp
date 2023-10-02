import { Link } from "react-router-dom";
import style from "./About.module.css"
const About = () => {
    return (
        <div className={style.about}>
            <h2>ABOUT</h2>
            <p>Este projeto consiste em um blog em react e firebase</p>
            <Link to = "/post/create" className ='botao'> Criar Post</Link>
        </div>
    )
}
export default About