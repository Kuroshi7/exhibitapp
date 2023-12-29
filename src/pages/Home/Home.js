
import { useState } from 'react';
import style from './Home.module.css';

//Hooks nescessarios
import { Link, useNavigate } from 'react-router-dom';
import {useBuscarDocumentos} from '../../hook/useBuscarDocumentos';

//Componentes
import PostDetalhes from '../../components/PostDetalhes';



const Home = () => {
    const [query,setQuery] = useState("")
    //temporario, ajustar com o hook posteriormente
    const {documento:postados, loading} =useBuscarDocumentos("posts");
    const navigate = useNavigate ()
    const handleSubmit =(e) => {
        e.preventDefault ()
        if (query) {
            console.log(query)
            //abrira nova pagina. 
            return navigate (`/search?q=${query}`)
        }
    };
    return (
        <div className = {style.home}>
            <h1>Posts mais recentes</h1>
            <form onSubmit={handleSubmit} className={style.search_form}>
                <input type='text' placeholder=' ou busque por tags...' onChange={(e) =>
                setQuery(e.target.value)}/>
                <button className="botao botao-dark"> Pesquisar </button>

            </form>
            <div>
                {loading && <p>Carregando...</p>}
                <h2>Inicio</h2>


                {postados && postados.map((p) => (
                    <PostDetalhes key={p.id} post={p} />
                ))}
                
                {postados && postados.length === 0&&(
                    <div className={style.noposts} >
                        <p> Não foram encontrados posts....</p>
                        <Link to = "/post/create"
                        className='botao'> Criar primeiro post... </Link>
                    </div>
                )}
                <h2>Fim</h2>
            </div>

        </div>

    )
}

export default Home