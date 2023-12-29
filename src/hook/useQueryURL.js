import { useLocation } from "react-router-dom";
import { useMemo } from "react";

//cache do valor para performance da app
//esta funçao sera executada quando search mudar por isso [search]

export function useSearchURL (){
    const {search} = useLocation();
    return useMemo (() => new URLSearchParams(search),[search])
}