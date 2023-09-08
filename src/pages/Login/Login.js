import style from './Login.module.css';
import { useAutenticacao } from '../../hook/useAutenticacao';
import {useState, useEffect} from 'react'
const Login =() => {
    
    const[email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError]=useState("")


    const {login, error:authError,loading} = useAutenticacao();
    const handleSubmitVictor = async (e) =>{
        e.preventDefault()
        setError("")
        const userVSB ={
            email,password
        }
        
        const resUseAutenticacao = await login (userVSB)
        console.log("conteudo de resUseAutenticacao: ", resUseAutenticacao)
        console.log("Conteudo de userVSB: ", userVSB)
    };
    //criando useEffect para mapear mudança em setErro. dispara essa funçao
    useEffect(()=>{
        //checar se muda para valor e nao para null. =null nao entra em if.
        if (authError){
            //substituir erro apresentado para o usuario recebido do useAutenticacao.js
            setError (authError)
        }
    }, [authError])
    return (
        <div className={style.login}>
            <h1>Entrar</h1>
            <p>Faça login para usar o sistema</p>
            <form onSubmit={handleSubmitVictor}>
                
                <label>
                    <span>E-mail:</span>
                    <input type='text' name='email' required placeholder='E-mail de usuário'
                     value={email}onChange={(e)=> setEmail(e.target.value)}/>
                </label>
                <label>
                    <span>Senha:</span>
                    <input type='password' name='password' required placeholder='Senha de acesso'
                     value={password}onChange={(e)=> setPassword(e.target.value)}/>
                </label>
              
                {!loading && <button className='botao'>
                    Entrar
                </button>}
                {loading && <button className='botao' disabled>
                    Aguarde ...
                </button> }
                {error && <p className='error'> {error} </p>}
            </form>
        </div>
    )
}
export default Login