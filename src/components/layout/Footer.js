import { FaFacebook, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import style from './Footer.module.css'

export default function Footer(){
    return(
        <footer className={style.footer}>
            <ul className={style.social_list}>
                <li>
                    <FaFacebook/>
                </li>

                <li>
                    <FaInstagram/>
                </li>

                <li>
                    <FaLinkedinIn/>
                </li>

                <li>
                    <FaTwitter/>
                </li>
            </ul>
            <p className={style.copy_right}><span>Léo&copy; 2023</span></p>
       </footer>
    )
}
    
    