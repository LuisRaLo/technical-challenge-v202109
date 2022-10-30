import { useCallback, useEffect, useState } from 'react'
import { NewNewsletterState } from '../context/features/newsletter/NewNewsleterSlice';
import { IResponse } from '../utils/interfaces/backend/IResponse';
import IUsuario from '../utils/interfaces/IUsuario';
import useAsyncStorage from './useAsynStorage';

export interface IUsuariosResponse extends IResponse {
    resultado: string | IUsuario
}

function useFetchNewsletter() {
    const { getItem } = useAsyncStorage();

    const jwt = () => getItem().then((data) => data?.jwt);

    const url = (process.env.REACT_APP_BE_BASE_URI as string) +
        (process.env.REACT_APP_BE_BASE_PATH as string) + '/newsletter'

    const sendNewsletter = useCallback(async (payload: NewNewsletterState): Promise<any> => {
        const formData = new FormData();
       if (payload.contenido.attachments && payload.contenido.attachments.length > 0) {
            formData.append('file', payload.contenido.attachments[0]);
        }
        
        formData.append('payload', JSON.stringify({
            "contenido": {
                "titulo": payload.contenido.titulo,
                "asunto": payload.contenido.asunto,
                "contenido": payload.contenido.contenido,
            },
            "programing": payload.programing,
            "users": payload.users
        }));
        

        const response = await fetch(url + '/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + jwt,
            },
            body: formData

        });

        const data = await response.json()

        return data;
        
    }, [])



    return {
        sendNewsletter
    }

}

export default useFetchNewsletter
