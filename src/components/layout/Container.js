import style from './Container.module.css'
export default function Container(props){
    return(
        <div className={`${style.container} ${style[props.customClass]}`}>
            {/* renderiza o conteudo filho dos elementos que vierem do props, que seram todos os elementos que estiverem dentro de container */}
            {props.children}
        </div>

    )
}
//O uso de ${style[props.customClass]} permite que você passe uma classe personalizada através da propriedade customClass.

//  No geral, esse componente Container é útil para criar contêineres personalizados com classes de estilo dinâmicas em sua aplicação React. Ele pode ser usado para encapsular conteúdo e aplicar estilos específicos a diferentes partes da interface. 
