import loading from '../../img/loading.svg'
import styles from './Loading.module.css'
export default function Loading(){
    return(
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} alt='Loading' />
        </div>
    )
}
//usado para aprecer aquele simbolo de carregando enquanto estiver carregando o projeto. muito bom para utilizar em outros projetos.