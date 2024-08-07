export const errorHandler = async (error, endpoint, setError) => {
    const response = await error?.message?.match(/is not valid JSON/) ? {error: true, message: `${endpoint} not found`} : error
    await setError(() => response)
    return {error: true, message: String(response)}
}

const putPostData = async (endpoint, type, info) => {
    return await fetch(`/api/${endpoint}`, {
        method: `${type}`,
        headers: {
            "content-type": 'application/json',
            "accept": "application/json",
        },
        body: JSON.stringify(info)
    }) 
}

const getHelper = async (endpoint, include) => {
    const param_mark = endpoint.match(/\?/) ? '&' : '?'
    const included_associations = include ? `${param_mark}include=${include.join(',')}` : ''
    const response=await fetch(`/api/${endpoint}${included_associations}`)
    if (response.status > 400){
        throw new Error(`${response.status}: ${response.statusText}`)
    }
    return response
}

export const getData= async (endpoint, setter, setError, include=null)=>{
    try {
        const response=await getHelper(endpoint, include)
        const data=await response.json()
        await setter(data)
        return data
    }
    catch (error) {
        return errorHandler(error, endpoint, setError)
    }
}

export const logout = async (setError) =>{
    try{
        await fetch(`/api/users/sign_out`, {
            method: 'delete',
            headers: {
                "content-type": 'application/json',
                "accept": "application/json",
            },
        }) 
    } catch (error){
        setError({message: 'Error logging out!'})
    }
}

export const newData = async (endpoint, info, setError)=>{
    try{
        const response=await putPostData(endpoint, 'post', info)
        const data=await response.json()
        if(!response.ok) throw data.error
        return data
    } catch (error) {
        return await errorHandler(error, endpoint, setError)
    }
}

export const updateData = async (endpoint, info, setError) => {
    try{
        const response=await putPostData(endpoint, 'put', info)
        const data=await response.json()
        if(!response.ok) throw data.error
        return data
    } catch (error){
        return await errorHandler(error, endpoint, setError)
    }
}

export const logIn = async(endpoint, info, setError) => {
    try{
        const response=await putPostData(endpoint, 'post', info)
        const data=await response.json()
        if(!response.ok) throw data.error
    } catch (error){
        return await errorHandler(error, endpoint, setError)
    }
}

export const signup=async (endpoint, info, setError )=>{
    try{
        const response=await putPostData(endpoint, 'post', info)
        const data=await response.json()
        if(!response.ok) throw data.error
    } catch (error){
        return await errorHandler(error, endpoint, setError)
    }
}