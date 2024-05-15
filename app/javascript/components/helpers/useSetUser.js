import { useState, useEffect } from 'react';
import { getData } from './api_helpers';

export const useSetUser = (toggle = null) => {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getData('get_user', setUser, setError)
    }, [loading, error, toggle])

    return {loading: loading, setLoading: setLoading, user: user, setUser: setUser, error: error, setError: setError }
}