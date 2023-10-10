import { parse, v4 as uuidv4 } from 'uuid'
import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../services/ServiceForm'
import ServiceCard from '../services/ServiceCard'
 
export default function Project(){

    const {id} = useParams() //para pegar o id que vem da  url
    console.log(id)

    const [project, setProject] = useState([]) //começa vazio
    const [services, setServices] = useState([]) //criando um state para services para exibir os serviços
    const [showProjectForm, setShowProjectForm] = useState(false) //esse state é responsavel por mostrar ou nao mostrar o projeto. No inicio ele nao exibe o formulario do projeto, por isso esta como false
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState() //para colocar mensagem usando a rota do useState
    const [type, setType] = useState() //tipo da mensagem (sussesso ou error)

    useEffect(() =>{
        fetch(`http://localhost:5000/projects/${id}`, {  
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services) //pegando os dados recebidos do banco de dados e colocando no setServices
        })
        .catch(err => console.log)
    }, [id]) //monitorando o id do projeto

    function editPost(project){
        setMessage('')
        //budget validation
        if(project.budget < project.cost){ //o project.budget nao pode ser menor que project.cost. caso seja vai aparecer essa mensagem abaixo
            setMessage('O orçamento nao pode ser menor que o custo do projeto!')
            setType('error')
            return false //para o projeto aqui
        }
        //metodo patch so atualiza o que mandamos, diferente do update que muda a entidade toda
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method:'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false) //ao contrario do que ja esta
            setMessage('Projeto atualizado!')
            setType('success') //continua o projeto pois deu sucesso 
        })
        .catch(err =>console.log(err))
    }
    function createService(project){
        setMessage('')
        
        //ultimo serviço
        const lastService = project.services[project.services.length -1] //aqui pegamos o ultimo serviço, que é o serviço atual.
        lastService.id = uuidv4() //metodo que importamos da biblioteca
        const lastServiceCost = lastService.cost //pegamos o custo desse ultimo serviço
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)  //atualizaçao do custo com a adiçao do custo novo com o custo atual

        //condicional para verificar se o valor novo é maior que o valor total do projeto. caso seja nao vai passar.
        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop() //remover o valor do projeto pois esta errado
            return false
        }
        //add serivice cost
        project.cost = newCost
        //update do projeto com o valor que incluimos acima
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setShowServiceForm(false) //apos criar o serviço ele fecha e volta pra pagina que se encontra os serviços criados
        })
        .catch(err => console.log(err))
    }

    //funçao para remover projetos do sistema
    function removeService(id, cost){

        const servicesUpdated = project.services.filter(
            //usamos o metodo filter, onde iremos pegar cada um dos service e iremos tirar o service que tem o id igual o que passamos no argumento.
            (service) => service.id !== id
        )
        const projectUpdated = project

        projectUpdated.services = servicesUpdated //aqui ja esta com o serviço atualizado sem o que excluimos

        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost) //removendo o custo do serviço excluido do projeto
            
        //atualizando no banco 
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',                                                
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)  
            setServices(servicesUpdated)
            //setProject e setServices: Em resumo, essa linha de código é responsável por atualizar o estado project com um novo valor, resultando em uma possível atualização da interface do usuário com base nesse novo estado.
            setMessage('Serviço removido com sucesso!') //retornar mensagem de sucesso
            setType('success') // com da mensagem sera verde
        })
        .catch(err => console.log(err))

    }
    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm) //nesse metodo trocamos o estado atual. se nmao esta mostrando quando vem nesse metodo ele passa a mostrar.
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm) //esse metodo é para a parte do adicione um serviço
    }
    return(
        <div>
            {project.name ? (  //condicional 
            <div className={styles.project_details}>
                {/* dentro do container exibimos as informaçoes do projeto */}
                <Container customClass='column' > 
                    {/* condicional para a mensagem - exibimos o tipo da mensagem e a mensagem */}
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.details_container}>
                        <h1>
                            Projeto: {project.name}
                        </h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                        {/* no inicio ja vai aparecer o editar projeto. caso clique em editar projeto vai aparecer o fechar prjeto e o formulario de ediçao do projeto vai ser exibido */}
                            {!showProjectForm ? 'Editar projeto' : 'Fechar'} 
                        </button>
                        {/* se nao tiver editar projeto aparece esse resumo do projeto atual */}
                        {!showProjectForm ? ( 
                            <div className={styles.project_info}>
                                <p> 
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> R${project.cost}
                                </p>
                                
                            </div>
                        ) : (
                                <div className={styles.project_info}>
                                    {/* metodo para fazer a ediçao -usando o ProjectForm como base */}
                                    <ProjectForm handleSubmit={editPost} btnText='Concluir edição' projectData={project} /> 
                                </div>
                            )}
                    </div>
                        {/* local aonde iremos adicionar um serviço */}
                    <div className={styles.service_form_container}>
                        <h2>
                            Adicione um serviço:
                        </h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {/* condicional caso nao tenhamos clicado no botao ainda aparece Adicionar serviço apos clicar vai aparecer fechar */}
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>

                        <div className={styles.project_info}>
                            {/* condicional, se o showServiceForm estiver ativo iremos mostrar um formulario para ser adicionado o serviço  */}
                            {showServiceForm && 
                                <ServiceForm
                                handleSubmit={createService}
                                btnText='Adicionar serviço'
                                projectData={project}
                                />}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass='start'>
                                {/* condicional para verificar se existem serviços */}
                            {services.length > 0 &&
                            // ele mapeia cada service no array e renderiza no ServiceCard
                                services.map((service) => (
                                    <ServiceCard 
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}                                   
                                    />
                                ))
                            }
                            {/* a condicional de baixo é caso nao existam serviços. ai retornamos esse paragrafo */}
                            {
                                services.length === 0 && <p>Não há serviços cadastrados</p>
                            }
                    </Container>

                </Container>
            </div>
           ) : (
                <Loading />
             )}
        </div>
     )
}