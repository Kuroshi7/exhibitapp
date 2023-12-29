
import style from './PostDetalhes.module.css';
import { Link } from "react-router-dom";


const PostDetalhes = ({post}) => {
    
    
   
    return (
        <div className={style.post_detail}>
            {/* Atributos definidos em CreatePost.js*/}
            <img src={post.imagem} alt = {post.titulo} />
            <h2>{post.titulo}</h2>
            <p className={style.createdBy}>{post.createdBy}</p>
            <div className={style.tags}>
        {/* tagsArray do metodo inserirDocumento do CreatePost.js*/}
            {post.tagsArray.map ((tag, i)=>(
                <p key = {i}><span>#</span>{tag}</p>
            ))}
        </div>
        {/*uso de crase por usarmos template strings*/}
        <Link to = {`/post/${post.id}`}
        className="botao botao-outline"> Ler </Link>
        </div>
    )
}

export default PostDetalhes