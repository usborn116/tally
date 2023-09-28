export const getData= async (endpoint, setter)=>{
    try {
        const response=await fetch(`${endpoint}`)
        if (response.status > 400){
            throw new Error(`${response.status}: ${response.statusText}`)
        }
        const data=await response.json()
        console.log('data',data)
        setter(() => data)
    }
    catch(error){
        console.log(error)
    }
}

export const getUser = async (setter) => {
    const response = await fetch('/get_user')
    const data=await response.json()
    console.log('user', data)
    await setter(data)
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