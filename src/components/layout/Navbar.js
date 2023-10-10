import { Link } from "react-router-dom"
//importando o componente link do react router. ele é usado para subtituir a tag a do html
import Container from "./Container"
import styles from './Navbar.module.css'
//importando uma imagem e colocando em logo. para se tornar o logo do projeto
import logo from '../../img/costs_logo.png'

export default function Navbar(){
    return(
        <nav className={styles.navbar}>
            <Container>
                {/* to especifica o caminho de destino do qual vamos navegar */}
                <Link to='/'>
                    <img src={logo} alt='Costs'/>
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to='/'> Home </Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/projects'> Projects </Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/company'> Company </Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/contact'> Contact </Link>
                    </li>

                </ul>
            </Container>
        </nav>
    )
}
