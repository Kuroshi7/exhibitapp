import { useState, useEffect } from "react";
//BD firebase
import { db } from "../firebase/config";
//Funçoes do firebase para buscar dados do bd padrao SQ
import { collection, query, orderBy, onSnapshot, where, getDocs } from "firebase/firestore";
import { setConsent } from "firebase/analytics";

export const useBuscarDocumentos = (docCollection, search = null, uid = null) => {
    const [documento, setDocumento] = useState (null)
    const [error, setError] = useState (null)
    const [loading, setLoading]= useState (null)

    //Controle de memory leak
    const [cancelado, setCancelado]= useState (false)
    //console.log (aqui cheguei)
    // se chegar a docCollection ou search ou uid,
    //ou seja qualquer um que chegar eu posso buscar dados automaticamente.
    //se cancelado nao vou mais buscar dados e encerro o papel deste hook
    
    useEffect (()=>{
        async function carregarDados (){
            if (cancelado){
                return;

            }
            setLoading(true);
            //tratamento de erros da busca dos dados
            try{
                console.log ("Executando funçao carregarDados.")
                //busca
                //meu teste
                const collectionRef = await collection (db, docCollection)
                //create a query against the collection.
                const q1 = query (collectionRef, orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q1);
                //setDocumento (
                    setDocumento(
                        querySnapshot.docs.map((doc)=>({
                            id: doc.id,
                        ...doc.data(),
                        }))
                    );
                    setLoading (false)
            } catch (error) {
                console.log ("Gerou erro: "+ error)
                setError(error.message);
                setLoading(false)
            }
        }
        carregarDados ();
    },[docCollection, search, uid, cancelado]         
                )
                //memory leak
                useEffect(()=>{
                    return () => setCancelado (true);
                }, []);
                return {documento, error, loading};
            }
        