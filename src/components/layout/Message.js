import { useState, useEffect } from 'react'
import style from './Message.module.css'

export default function Message({type, msg}){
    //o type é o tipo da mensagem que pode ser success ou de error

    const [visible, setVisible] = useState(false)
    //para auterar a visibilidade da mensagem. ela ja aparece invisivel por causa do false

    useEffect(() => {

        if(!msg){ //se a mensagem n existe
            setVisible(false)
            return //encerra aqui
        }
        //passando do if retorna a mensagem
        setVisible(true) 

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000) //mostra a mensagem ate 3 segundos e depois apaga.

        return () => clearTimeout(timer)

    }, [msg])

    return(

        <>

            {visible && (

                <div className={`${style.message} ${style[type]}`}>
                    {msg}
                </div>

                )

            }
        
        </>

    )
}