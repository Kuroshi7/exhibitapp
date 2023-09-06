import { useAutenticacao } from '../../hook/useAutenticacao';
import style from './Register.module.css';
import {useState, useEffect} from 'react'
const Register =() => {
    const[ displayName,setdisplayName]=useState("")
    const[email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassowrd,setconfirmPassword]= useState("")
    const [error,setError]=useState("")


    const {createUsuario, error:authError,loading} = useAutenticacao();
    const handleSubmitVictor = async (e) =>{
        e.preventDefault()
        setError("")
        const userVSB ={
            displayName,email,password
        }
        if (password!==confirmPassowrd){
            setError("Regitie a senha. senha precisam ser iguais")
            return
        }
        const resUseAutenticacao = await createUsuario (userVSB)
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
        <div className={style.register}>
            <h1>Cadastre-se e junte-se a outros artistas</h1>
            <form onSubmit={handleSubmitVictor}>
                <label>
                    <span>Nome:</span>
                    <input type ='text' name = 'displayName'
                    requierd placeholder='Nome de usuário'
                     value={displayName} onChange={(e)=> setdisplayName(e.target.value)}/>
                </label>
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
                <label>
                    <span>Confirmar senha</span>
                    <input type='password' name='confirmPassowrd' required placeholder='Confirmação de senha'
                     value={confirmPassowrd}onChange={(e)=> setconfirmPassword(e.target.value)}/>
                </label>
                {!loading && <button className='botao'>
                    Cadastrar
                </button>}
                {loading && <button className='botao' disabled>
                    Aguarde ...
                </button> }
                {error && <p className='error'> {error} </p>}
            </form>
        </div>
    )
}
export default Register