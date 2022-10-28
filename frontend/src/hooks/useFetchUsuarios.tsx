import { useCallback, useEffect, useState } from 'react'
import IUsuario from '../utils/interfaces/IUsuario';


function useFetchUsuarios() {
    const [usuarios, setUsuarios] = useState<IUsuario[]>([])
    const [usuario, setUsuario] = useState<IUsuario>()

    const url = (process.env.REACT_APP_BE_BASE_URI as string) +
        (process.env.REACT_APP_BE_BASE_PATH as string);

    const getUsuarios = useCallback(async () => {
        const response = await fetch(url + '/usuarios')
        const data = await response.json()
        setUsuarios(data)
    }, [])

    const getUsuarioByID = useCallback(async (id: number) => {
        const response = await fetch(url + '/' + id)
        const data = await response.json()
        setUsuarios(data)
    }, [])

    useEffect(() => {
        getUsuarios()
    }, [getUsuarios])

    return {
        usuarios,
        getUsuarioByID
    }

}

export default useFetchUsuarios
