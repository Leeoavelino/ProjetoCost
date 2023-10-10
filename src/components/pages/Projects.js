import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import Container from '../layout/Container'
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";
import styles from './Projects.module.css'


export default function Projects(){

    const [projects, setProjects] = useState([]) //criando um state para salvar os projetos
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage ] = useState('')

    const location = useLocation() //para acessar o caminho de mensagem aqui

    let message = ''

    if(location.state){
        message = location.state.message
    }

    //para buscar os projetos la no banco de dados
    useEffect(() => {
        
        fetch('http://localhost:5000/projects',{
            method:'GET', //parametros
            headers:{
                'Content-Type': 'application/json', //parametros
            },
        }).then(resp => resp.json()) //pegamos os dados e transformamos em json
        .then(data =>{ //pegamos os dados ja transformados em json
            console.log(data)
            setProjects(data) //setamos os projetos
            setRemoveLoading(true)
            // o true é pra remover o loader pois ele sempre inicia.
        })
        .catch(err => console.log(err))
    },[])

    function removeProjects(id){

        fetch(`http://localhost:5000/projects/${id}`,{ //request apontando pro banco para acessar o id do projeto na rota
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },

        }).then(resp => resp.json())
        .then((data) =>{  //o parametro data nao esta sendo usado
            setProjects(projects.filter((project) => project.id !== id)) //faz um filtro no projeto e elimina o projeto com o id que estamos deletando
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch(err => console.log(err))

    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>
                    Meus projetos
                </h1>

                <LinkButton to='/newproject' text='Criar Projeto' />

            </div>
            {/* se o message esta preenchido. passamos para essa parte e usamos o componente message */}
            {message && <Message type='success' msg={message} />}
            {projectMessage && <Message type='success' msg={projectMessage} />}

            <Container customClass="start">
                {/* condicional para so exibir os projetos se tiver projetos para serem carregados   */}
                {projects.length > 0 && //Esta é uma verificação condicional que verifica se a propriedade projects é uma matriz não vazia. Se houver pelo menos um projeto na matriz, a condição será verdadeira e o mapeamento dos projetos será executado.
                projects.map((project) => //Se a condição acima for verdadeira, ele irá mapear cada projeto na matriz projects e renderizar um componente ProjectCard para cada projeto.
                    <ProjectCard 
                     id={project.id}
                     name={project.name}
                     budget={project.budget}            
                     category={project?.category?.name}
                     key={project.id}
                     handleRemove={removeProjects} />

                    //  aqui é aonde exibimos os projetos existentes no banco de dados
                )}
                {!removeLoading && <Loading /> }

                {/* quando o estado do loader estiver sido removido e nao tivermos projetos para mostrar. vai aparecer essa mensagem */}
                {removeLoading && projects.length === 0 && ( //apos carregar e nao tivermos projetos para exibir. ai iremos retornar esse paragrafo
                    <p> Não há Projetos Cadastrados!</p>
                )

                }

            </Container>
            
        </div>
    )
}