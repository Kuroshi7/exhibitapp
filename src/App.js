import './App.css';
//navigate e para redirecionar os usuarios logados para uma pagina e nao logados para outra
import {BrowserRouter, Routes,Route,Navigate} from 'react-router-dom';
import { AuthProviderFac } from './context/AuthContext';
import About from "./pages/About/About.js";
import Home from "./pages/Home/Home.js";
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { useState, useEffect } from 'react';
import { useAutenticacao } from './hook/useAutenticacao';
//mapeia autenticacao do usuario
import { onAuthStateChanged } from 'firebase/auth';
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePost from './pages/CreatePost/CreatePost';
function App() {
  //logica de monitoramento de estado do usuario
  //aqui engloba todos os elementos da pagina
  const [user,setUser] = useState (undefined)
  // recuperar o usuario logado do nosso hook
  const {auth}= useAutenticacao()

  //Executado toda vez que houver mudanca em termo de autenticacao
  useEffect (() => {
    onAuthStateChanged (auth, (user) => {
      setUser (user)
    })
  },[auth])
  
  //Estado de loading do usuario comparando com undefinesd, se for undefined esta carregando de algum jeito
  //conseguiremos fazer um inner return com <p> para que nao mostre nada ate usuario carregar por completo
  const loadingUser = user ===undefined
  if (loadingUser){
    return<p>Carregando...</p>
  }


  return (
    <div className="App">
     <h1>START</h1>
     <AuthProviderFac value={{user}}>
     <BrowserRouter>
     <Navbar />
      <div clasName='container'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path= '/' element={<About/>} />
          <Route path='/login' element=
          {!user ? <Login/>: <Navigate to= "/"/>} />
          <Route path='/register' element=
          {!user ? <Register/>: <Navigate to ="/"/>}/>
          <Route path='/Posts/create' element=
          { user ? <CreatePost/>: <Navigate to = "/login"/>}/>
          <Route path='/dashboard' element= 
          {user ? <Dashboard/>: <Navigate to = "/login"/>}/>
        </Routes>
        
      </div>
      <Footer />
     </BrowserRouter>
     </AuthProviderFac>
    </div>
  );
}

export default App;
