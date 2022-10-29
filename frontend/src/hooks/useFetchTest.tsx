import { useCallback, useEffect, useState } from 'react'

function useFetchTest() {

    const url = (process.env.REACT_APP_BE_BASE_URI as string) +
        (process.env.REACT_APP_BE_BASE_PATH as string) + '/test';


    const isValidateJwt = useCallback(async (jwt: string) => {
        const response = await fetch(url + '/isValidateJwt',{
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
        isValidateJwt
    }

}

export default useFetchTest
