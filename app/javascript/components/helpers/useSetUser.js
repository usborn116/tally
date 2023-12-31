import { useState, useEffect } from 'react';
import { getUser } from './api_helpers';

export const useSetUser = () => {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState('blank')
    const [error, setError] = useState(null)

    useEffect(() => {
        getUser(setUser, setError)
    }, [loading, error])

    return {loading: loading, setLoading: setLoading, user: user, setUser: setUser, error: error, setError: setError }
}