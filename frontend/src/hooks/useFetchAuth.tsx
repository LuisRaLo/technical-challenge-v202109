import { useCallback, useEffect, useState } from 'react'
import { IResponse } from '../utils/interfaces/backend/IResponse';
import IUsuario from '../utils/interfaces/IUsuario';

export interface ISigninResponse extends IResponse {
    resultado: string | IUsuario
}

function useFetchAuth() {

    const url = (process.env.REACT_APP_BE_BASE_URI as string) +
        (process.env.REACT_APP_BE_BASE_PATH as string) + '/auth';

    const signin = useCallback(async (email: string, password: string): Promise<ISigninResponse> => {
        const response = await fetch(url + '/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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
