import { useEffect } from "react";

export default function useOnclickOutside(ref,handler){

    useEffect(()=>{

        function listener(e){
            if(!ref.current || ref.current.contains(e.target) ){
                return;
            }

            handler(e);
        }

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener)

        return() =>{
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart',listener)
        }
    },[ref,handler])
}