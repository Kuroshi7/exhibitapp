import { useContext, createContext } from "react";

//criando context
const AuthContext = createContext();

//provedor de contexto
//utilizado no app.js
export function AuthProviderFac ({children, value}){
    return <AuthContext.Provider
    value={value} > {children}</AuthContext.Provider>
}

//Utilizado no navbar.js
export function useAuthValueFac (){
    return useContext (AuthContext);
}