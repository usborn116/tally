const errorHandler = async (error, endpoint) => {
    return await error?.message?.match(/is not valid JSON/) ? {message: `${endpoint} not found`} : error
}

export const getData= async (endpoint, setter, setError)=>{
    try {
        const response=await fetch(`${endpoint}`)
        if (response.status > 400){
            throw new Error(`${response.status}: ${response.statusText}`)
        }
        const data=await response.json()
        console.log('data',data)
        await setter(() => data)
        return data
    }
    catch(error){
        error = await errorHandler(error, endpoint)
        console.log(error)
        console.log('from fun', error.message)
        await setError(error.message)
        return error
    }
}

export const getUser = async (setter, setError) => {
    try {
        const response = await fetch('/get_user')
        if (response.status > 400){
            throw new Error(`${response.status}: ${response.statusText}`)
        }
        const data=await response.json()
        console.log('user',data)
        setter ? await setter(data) : null
        return data
    }
    catch(error){
        console.log(error)
        error = errorHandler(error, endpoint)
        await setError(error.message)
    }
}

export const newData = async (endpoint, info, setError)=>{
    try{
        const response=await fetch(`${endpoint}zzz`, {
            method: 'post',
            headers: {
                "content-type": 'application/json',
                "accept": "application/json",
            },
            body: JSON.stringify(info)
        }) 
        const data=await response.json()
        if(!response.ok) throw data.error
        console.log('new!', data)
        return data
    } catch (error){
        console.log(error)
        setError(() => error)
    }
}

export const updateData = async (endpoint, info, setError) => {
    try{
        const response=await fetch(`${endpoint}`, {
            method: 'put',
            headers: {
                "content-type": 'application/json',
                "accept": "application/json",
            },
            body: JSON.stringify(info)
        }) 
        const data=await response.json()
        if(!response.ok) throw data.error
        return data
    } catch (error){
        console.log(error)
        setError(() => error)
    }
}

export const logIn = async(endpoint, info, setError) => {
    try{
        const response=await fetch(`${endpoint}`, {
            method: 'post',
            headers: {
                "content-type": 'application/json',
                "accept": "application/json",
            },
            body: JSON.stringify(info) 
        }) 
        const data=await response.json()
        if(!response.ok) throw data.error

    } catch (error){
        console.log(error)
        setError(error)
    }
}

export const signup=async (endpoint, info, errorSetter )=>{
    try{
        const response=await fetch(endpoint, {
            method: 'post',
            headers: {
                "content-type": 'application/json',
                "accept": "application/json"
            },
            body: JSON.stringify(info)
        }) 
        const data=await response.json()
        if(!response.ok) throw data.error
    } catch (error){
        console.log("error", error)
        errorSetter(error)
    }
}