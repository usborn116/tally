export const getData= async (endpoint, setter)=>{
    try {
        const response=await fetch(`${endpoint}`)
        if (response.status > 400){
            throw new Error(`${response.status}: ${response.statusText}`)
        }
        const data=await response.json()
        console.log('data',data)
        setter(() => data)
        return data
    }
    catch(error){
        console.log(error)
    }
}

export const getUser = async (setter) => {
    const response = await fetch('/get_user')
    const data=await response.json()
    console.log('user', data)
    setter ? await setter(data) : null
    return data
}

export const newData = async (endpoint, info)=>{
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
        console.log('new!', data)
        return data
    } catch (error){
        console.log(error)
    }
}

export const updateData = async (endpoint, info) => {
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
    }
}

export const logIn = async(endpoint, info, setter, errorSetter) => {
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
        //setter(() => data)
        if(!response.ok) throw data.error

    } catch (error){
        console.log(error)
        //errorSetter(error)
    }
}

export const signup=async (endpoint, info, setter, loader, errorSetter)=>{
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
        //setter(() => data)
        if(!response.ok) throw data.error
    } catch (error){
        console.log("error", error)
        //errorSetter(error)
    }
}