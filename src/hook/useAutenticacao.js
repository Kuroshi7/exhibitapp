import { db } from "../firebase/config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    
    
} from "firebase/auth"
import { useState,useEffect } from "react";
export const useAutenticacao = () =>{
    const [error,setError] = useState (null)
    const [loading,setLoading] = useState (null)
    //cleanup- evitar memory leak
    const [cancelarAposdarCerto,setCancelarAposdarCerto]=useState (false)
    //obter autenticaçao do firebase. usar funçoes de autenticaçao quanto nescessario
    const auth = getAuth ()
    //funçao para checar o estado
    function validarIfIsCancelled (){
        if(cancelarAposdarCerto){
            return;
        }
    }
    //Register
    const createUsuario = async (data) => {
        //async segue BD externo demora mais tempo para voltar que JSON. garante Clean Up ao criar usuario
        validarIfIsCancelled()
        //se nao for cancelado loading = true
        setLoading(true)
        setError ("");
        try{
            //funçoes firbase
            const{user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile (user, {displayName: data.displayName})
            setLoading (false)
            return user
        } catch (catError){
            console.log (catError.message)
            console.log (typeof catError.message)
            let erroAPI
            //se senha = "password"
            if (catError.message.includes ("Password")){
                erroAPI = "Senha fora do padrão Firebase. Deve conter 6 caracteres"
            }else {
                if (catError.message.includes ("email-already")){
                    //Usuario ja existe
                    erroAPI= "E-mail já cadastrado"
                }
                else {
                    erroAPI = "ocorreu um erro tente mais tarde"
                }
            }
            setError (erroAPI)
            setLoading(false)
        }
    };


    //Criar funcao useEffect para colocar variavel cancelarAposdarCerto como true ai sair da pagina
    //sera executado 1 vez por sintaxee,[])
    //Vai garanter que nao tenhamos memory leak
    useEffect(()=>{
        return ()=> setCancelarAposdarCerto (true);
    },[])

    //Funçao logout. Apos definiçao das variaveis auth e funçao de memory leak
    const logout = async () => {
        //evitar memory leak
        validarIfIsCancelled();
        //logout funçao do firebase
        signOut (auth);
    }

    //login entrada do sistema
    const login = async (data) => {
        //evitar memory leak
        validarIfIsCancelled();
        setError (false)
        setLoading (true)
        try{
            await signInWithEmailAndPassword
            (auth,data.email,data.password)
            setLoading(false)
        } catch (catEror) {
            let erroAPI
            //se houver termo Password na mensagem
            if (catEror.message.includes("user-not-found")){
                erroAPI ="usuário não cadastrado."
            }else {
                if (catEror.message.includes("wrong-password")){
                    //Usuario ja existe
                    erroAPI ="Senha incorreta."
                }else{
                    erroAPI ="Ocorreu um erro no login, tente mais tarde."
                }
            }
            setError(erroAPI)
            setLoading(false)
        }
    }
    
    


    return{
        auth,createUsuario,error,loading,logout,login,
    }
};