import { useNavigate } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import style from './Newprojects.module.css'

export default function Newproject(){

    const history = useNavigate() // é um hook fornecido pelo pacote react-router-dom que pode ser usado para navegar entre diferentes rotas em uma aplicação React que utiliza o React Router. Este hook permite que você navegue programaticamente para uma rota específica em resposta a algum evento ou ação em seu aplicativo.

    // passando o project como argumento no createPost
    function createPost(project){
        if (project.name && project.budget && project.category && project.category.id) {
            //so criar um projeto se todos os campos forem preenchidos
            project.cost = 0  //inicializando como 0 e ao passar do curso o custo vai aumentando
            project.services = []  //inicializando com array vazio

            fetch("http://localhost:5000/projects", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(project)
            })
            .then(
                (resp => resp.json())
            ).then((data) => {
                console.log(data)
                //redirect
                history('/projects', { state:{ message: 'Projeto criado com sucesso!'}})
                //quando der sucesso na adiçao do projeto, redirecionamos e mandados para /projects, e mandamos a mensagem criado com sucesso.
            })
            .catch(err => console.log(err))
        }else{
            console.log('nao tem nada escrito!')
        }

    }

    return(
        <div className={style.newproject_container}>
            <h1>
                Criar Projeto
            </h1>

            <p> Crie seu projeto para depois adicionar os serviços</p>

            <ProjectForm handleSubmit={createPost} btnText='Criar Projeto' />

        </div>
    )
}