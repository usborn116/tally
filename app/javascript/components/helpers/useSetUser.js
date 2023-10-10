import { useState, useEffect } from 'react';
import { getUser } from './api_helpers';

export function useSetUser() {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getUser(setUser, setError)
    }, [loading, error])

    const response = {loading: loading, setLoading: setLoading, user: user, setUser: setUser, error: error, setError: setError }
    return response
}