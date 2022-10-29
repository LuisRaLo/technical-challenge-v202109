import { useCallback, useEffect, useState } from 'react'
import { IResponse } from '../utils/interfaces/backend/IResponse';
import IUsuario from '../utils/interfaces/IUsuario';
import useAsyncStorage from './useAsynStorage';

export interface IUsuariosResponse extends IResponse {
    resultado: string | IUsuario
}

function useFetchUsuarios() {
    const { getItem } = useAsyncStorage();
    
    const jwt = () => getItem().then((data) => data?.jwt);
    
    const url = (process.env.REACT_APP_BE_BASE_URI as string) +
    (process.env.REACT_APP_BE_BASE_PATH as string) + '/usuarios'

    const getUsuarios = useCallback(async (): Promise<IUsuario[]> => {

        const response = await fetch(url + '/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        })
        const data: IUsuariosResponse = await response.json()
        console.log(data)
        if (Array.isArray(data.resultado)) {
            return data.resultado as IUsuario[]
        }
        return []
    }, [])

    const getUsuarioByID = useCallback(async (id: number, jwt: string): Promise<IUsuario | null> => {
        if (!id) return null;

        const response = await fetch(url + '/' + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwt
                }
            })
        const data: IUsuariosResponse = await response.json()
        return data.resultado as IUsuario
    }, [])


    return {
        getUsuarios,
        getUsuarioByID
    }

}

export default useFetchUsuarios
