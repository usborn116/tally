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