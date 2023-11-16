import { useState } from 'react';

export function useError() {

    const [error, setError] = useState(null)

    return {error: error, setError: setError }
}