import style from './CreatePost.module.css'
//1 manipulaçao de estados digitado na tela x react
import { useState } from 'react'
//2 redirecionamento apos o post
import {useNavigaState} from 'react'
//3 pegar usuario e atrelalo ao post para o Dashboard
import { useAuthValueFac } from '../../context/AuthContext'

//Firestore DB
import { useInserirPost } from '../../hook/useInserirPost'
import { useNavigate } from 'react-router-dom'


const CreatePost = () =>{
    //4 uso do useState ()
    const [titulo,setTitulo]= useState("");
    const [imagem,setImagem]= useState("");
    const [corpo,setCorpo]= useState ("");
    //Array por isso []
    const [tagPost,setTagPost] =useState([]);
    let [erroLocal,setErroLocal] =useState("");
    //firestore DB
    const{inserirDocumento, resposta}= useInserirPost("posts")
    const {user} = useAuthValueFac()
    const navigate = useNavigate();
    //05 criar funçao submeter o formulario.


    const handleSubmit = (e) =>{
        e.preventDefault();
        //Firestore DB limpar erros
        erroLocal = ""

        //Firestore DB validar URL da imagem
        try {
            console.log ("URL:" , imagem)
            new URL (imagem);

        } catch (error) {
            setErroLocal ("A imagem precisa ser uma URL.");
            erroLocal = "A imagem precisa ser uma URL."
            console.log("Gerou Erro:")
        }

        //caso alguma validaçao esteja com erro nao continuara a inclusão.
        console.log ("Antes IF erroLocal:" + erroLocal)
        if (erroLocal) {
            console.log ("Entrou no if do return:")
            erroLocal="";
            console.log ("Depois limpar erroLocal" + erroLocal)
            return;
        }
        console.log ("Depois IF erroLocal:" + erroLocal)
        // Firestore DB criar arrays de tags
        const tagsArray = tagPost.split (",").map ( (t) => t.trim().toLowerCase());
        console.log("tagsArray: "+ tagsArray)

        //firestore DB checar se todos os valors
        if (!titulo|| !imagem || !tagPost || !corpo){
            erroLocal = "Preencha todos os campos."
        };

        

        inserirDocumento({
            titulo,
            imagem,
            corpo,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        });

        //Firestore DB redirect home page.
        console.log ("Redirecionando0");
        navigate ("/")

        
      
    }

    return(
    <div className={style.create_post}>
        <h1>Create post</h1>
        <p>Sobre algo que queira compartilhar/ seu trabalho</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Titulo</span>
                <input type='text'name='title'
                required placeholder='um bom titulo'
                onChange={(e) => setTitulo (e.target.value)}
                value={titulo}/>
            </label>
            <label>
                <span>URL image: </span>
                <input type='text' name='image'
                required placeholder='Insira uma imagem.'
                onChange={(e)=> setImagem (e.target.value)}
                value={imagem}/>
            </label>
            <label>
                <span> Conteudo: </span>
                <textarea name='body'
                required placeholder='Insira uma descrição'
                onChange={(e)=> setCorpo (e.target.value)}
                value={corpo}/>
            </label>
            <label>
                <span>Tags da Publicação</span>
                <input type='text' name='tags'
                required placeholder='Insira as tags separadas por virgulas "," (tag1, tag2,...)'
                onChange={(e)=> setTagPost(e.target.value)}
                value={tagPost}/>
            </label>
            {!resposta.loading && <button className='botao'> 
            Publicar 
            </button>}
            {resposta.loading && <button className='botao' disabled>
            Aguarde...
            </button>}
            {resposta.error && <p className='error'>{resposta.error}</p>}
            {erroLocal && <p className='error'>{erroLocal}</p>}
        </form>
    </div>
    )
}
export default CreatePost