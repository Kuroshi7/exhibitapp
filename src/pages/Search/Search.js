import style from './Search.module.css';
//hooks
import { useBuscarDocumentos } from '../../hook/useBuscarDocumentos'
import { useSearchURL } from '../../hook/useQueryURL';
import { Link } from 'react-router-dom';
import PostDetalhes from '../../components/PostDetalhes';
import { query } from 'firebase/firestore';


//criar hook para recuperar valor da URL.
const Search  =  () => {
    const queryX =  useSearchURL()
        // onde q significa: return Navigate ("/search?q=${query}") do Home.js
    const searchParam =  queryX.get ("q")
    const queryResult = useBuscarDocumentos("posts", searchParam)

    return <div className={style.container}>
            <h2>Página de Pesquisas</h2>
            <p>{searchParam}</p>
            {/* Fragmento <>*/}
            {queryResult.documento && queryResult.documento.length === 0 && (
                <>
                <p> Não foram encontrados Posts</p>
                <Link to = "/" className = "botao botao-dark"> Voltar </Link>
                </>
            )}
            {queryResult.documento && queryResult.documento.map(function(pt){
                console.group("render post")
                console.log(pt)
                console.log(<PostDetalhes key={pt.id} post={pt} />)
                console.groupEnd();
                return (<PostDetalhes key={pt.id} post={pt} />)
            })}
           </div>
};

export default Search