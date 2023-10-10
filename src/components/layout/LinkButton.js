import { Link } from 'react-router-dom'
import style from './LinkButton.module.css'

export default function LinkButton({to, text}){
    return(

        <Link className={style.btn} to={to}>
            {text}
        </Link>

    )
}

// o parametro to é pra indicar para aonde vai apos clicar no botao. e o texto é o que vai estar escrito no botao.