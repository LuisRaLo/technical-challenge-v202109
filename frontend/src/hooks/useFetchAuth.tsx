import { useCallback, useEffect, useState } from 'react'
import IUsuario from '../utils/interfaces/IUsuario';


function useFetchAuth() {

    const url = (process.env.REACT_APP_BE_BASE_URI as string) +
        (process.env.REACT_APP_BE_BASE_PATH as string);

    const signin = useCallback(async (email: string, password: string) => {
        const response = await fetch(url + '/usuarios', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })

        })
        const data = await response.json()
        return data
    }, [])


    return {
        signin
    }

}

export default useFetchAuth
