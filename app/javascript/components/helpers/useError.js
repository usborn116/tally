import { useState } from 'react';

export function useError() {

    const [error, setError] = useState(null)

    const response = {error: error, setError: setError }

    return response
}