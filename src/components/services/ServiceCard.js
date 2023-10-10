import styles from '../project/ProjectCard.module.css'
import {BsFillTrashFill} from 'react-icons/bs'

export default function ServiceCard({id, name, cost, description, handleRemove}){

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost) //usamos esse metodo que recebe esse dois argumentos (id e o custo) cost que vem do custo total aqui abaixoe o id do ServiceCard que é o componente pai

    }

    return(
        //toda a estrutura do card
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R$:{cost}
            </p>
            <p>
                {description}
            </p>

            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>

            </div>

        </div>

    )
}