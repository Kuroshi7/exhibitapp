import style from './Navbar.module.css';
import { NavLink} from 'react-router-dom';
import { useAutenticacao } from '../hook/useAutenticacao';
import { useAuthValueFac } from '../context/AuthContext';

const Navbar = () => {
    const {user} = useAuthValueFac()
    const {logout} =useAutenticacao ();
    return <nav className={style.navbar}>
        <NavLink to = "/" className={style.brand}>
            Ex<span>hibit</span>
        </NavLink>
        <ul className={style.links_list}>
            <li>
                <NavLink to="/" className={({isActive}) =>  (isActive ? style.active:"") } >Home</NavLink>
            </li>
            {!user &&(<>
            <li>
                <NavLink to = "/login" className={({isActive}) => (isActive ? style.active:"")}>Entrar</NavLink>
            </li>
            <li>
            <NavLink to = "/register" className={({isActive}) => (isActive ? style.active:"")}>Cadastrar</NavLink>
            </li>
            </>)}
            <li>
                <NavLink to="/about" className={({isActive}) => (isActive ? style.active:"") } >Sobre</NavLink>
            </li>
            {user && (<>
            <li>
                <NavLink to = "/post/create" clasName ={({isActive}) => (isActive ? style.active:"") }>Nova publicação</NavLink>
            </li>
            <li>
                <NavLink to = "/dashboard" className={({isActive})=> (isActive ? style.active:"")}>Dashboard</NavLink>
            </li>
            </>)}
            {user && (
                <li>
                    <button onClick={logout}>
                        Sair
                    </button>
                </li>
            )}
        </ul>
    </nav>;
}
export default Navbar