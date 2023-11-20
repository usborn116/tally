export const errorHandler = async (error, endpoint, setError) => {
    const response = await error?.message?.match(/is not valid JSON/) ? {message: `${endpoint} not found`} : error
    setError(String(response))
    return String(response)
}

const putPostData = async (endpoint, type, info) => {
    return await fetch(`${endpoint}`, {
        method: `${type}`,
        headers: {
            "content-type": 'application/json',
            "accept": "application/json",
        },
        body: JSON.stringify(info)
    }) 
}

const getHelper = async (endpoint) => {
    const response=await fetch(`${endpoint}`)
    if (response.status > 400){
        throw new Error(`${response.status}: ${response.statusText}`)
    }
    return response
}

export const getData= async (endpoint, setter, setError)=>{
    try {
        const response=await getHelper(endpoint)
        const data=await response.json()
        await setter(data)
        return data
    }
    catch(error){
        return await errorHandler(error, endpoint, setError)
    }
}

export const getUser = async (setter, setError) => {
    try {
        const response = await getHelper('/get_user')
        const data=await response.json()
        setter ? await setter(data) : null
        return data
    }
    catch(error){
        return await errorHandler(error, '/get_user', setError)
    }
}

export const newData = async (endpoint, info, setError)=>{
    try{
        const response=await putPostData(endpoint, 'post', info)
        const data=await response.json()
        if(!response.ok) throw data.error
        return data
    } catch (error){
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

export const signup=async (endpoint, info, errorSetter )=>{
    try{
        const response=await putPostData(endpoint, 'post', info)
        const data=await response.json()
        if(!response.ok) throw data.error
    } catch (error){
        return await errorHandler(error, endpoint, setError)
    }
}