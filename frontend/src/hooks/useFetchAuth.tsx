import { useCallback, useEffect, useState } from 'react'
import { IResponse } from '../utils/interfaces/backend/IResponse';
import ISignUpRequest from '../utils/interfaces/ISignUp';
import IUsuario from '../utils/interfaces/IUsuario';

export interface ISigninResponse extends IResponse {
    resultado: string | IUsuario
}

export interface ISignupResponse extends IResponse {
    resultado: string
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

    const signup = useCallback(async (payload:ISignUpRequest): Promise<ISignupResponse> => {
        const response = await fetch(url + '/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)

        })
        const data = await response.json()
        return data
    }, [])


    return {
        signin,
        signup
    }

}

export default useFetchAuth
