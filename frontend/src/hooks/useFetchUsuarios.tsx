import { useCallback } from 'react'
import IUsuario from '../utils/interfaces/IUsuario';


function useFetchUsuarios() {

    const url = (process.env.REACT_APP_BE_BASE_URI as string) +
        (process.env.REACT_APP_BE_BASE_PATH as string) + '/usuarios'

    const getUsuarios = useCallback(async (): Promise<IUsuario[]> => {
        const response = await fetch(url)
        const data = await response.json()
        return data
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
        const data = await response.json()
        return data
    }, [])


    return {
        getUsuarios,
        getUsuarioByID
    }

}

export default useFetchUsuarios
