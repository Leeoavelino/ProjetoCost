import { useEffect, useState } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

export default function ProjectForm({ handleSubmit, btnText, projectData }){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    //comunicando com o banco de dados
    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json()) //pega a resposta e transforma em json
        .then((data) =>{
            setCategories(data) //e os dados que foram transformados em json mandamos para setCategories
        })
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        // console.log(project)
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e){
        setProject({ ...project, category:{
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        } })
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <div>
                <Input type='text' text='Nome do projeto' name='name' placeholder='Insira o nome do projeto' handleOnChange={handleChange} value={project.name ? project.name : '' } />
                 {/* no value se a categoria tiver prenchida passamos o id dela nao esteja passamos um valor vazio */}
            </div>
            {/* Este bloco representa um campo de entrada de texto para o nome do projeto. O componente Input é usado aqui e recebe várias propriedades */}
            <div>
                <Input type='number' text='Orçamento do porjeto' name='budget' placeholder='Insira o orçamento total' handleOnChange={handleChange} value={project.budget ? project.budget : ''} />  
                 {/* no value se a categoria tiver prenchida passamos o id dela nao esteja passamos um valor vazio */}
            </div>
            
            <div>
                <Select name='category_id' text='Selecione a categoria' options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : '' } />
                {/* no value se a categoria tiver prenchida passamos o id dela nao esteja passamos um valor vazio */}
            </div>

            {/* Este bloco representa um campo de seleção para escolher uma categoria para o projeto. */}

            <SubmitButton text={btnText} />
            
        </form>
    )
}

