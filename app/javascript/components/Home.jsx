import React, {useEffect} from "react";
import { getData } from "./helpers/api_helpers";
import { Error } from "./Error";
import { useSetUser } from "./helpers/useSetUser";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export const Home = () => {
    
    const { user, setUser, loading, setLoading, error, setError } = useSetUser()

    useEffect(() => {
        setLoading(true)
        getData('user', setUser, setError, ['sessions', 'shared_sessions'])
        setLoading(false)
    }, [loading])

    if (error) return (<Error message={error.message} setError={setError}/>)

    return (
        <>
        <Header setUser={setUser} user={user} setLoading={setLoading} setError={setError} />
            <div className="home">
                <Outlet context={[user, setUser, loading, setLoading, error, setError]} />
        </div> 
        <Footer />
        </>

    )
}