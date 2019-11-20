import api from "../config/api"


export async function registerUser(userInfo) {
    const {username, email, password} = userInfo
    // call to server to register user
    try {
        const response = await api.post("/auth/register", userInfo)
        console.log("Got user back from server", response)
        return response.data
    }
    catch (error) {
        console.log("got error registering user", error)
        throw(error)

    }
    return true
}

export async function loginUser(userInfo) {
    const {username, password} = userInfo
    // call to server to login user
    // return user info if successful and error if not
    try {
        const response = await api.post("/auth/login", userInfo)
        console.log("got user back from server", response)
        return response.data
    }
    catch(error){
        console.log("got error logging in ", error)
        throw error
    }
}

export async function logoutUser() {
    // call to server to logout user
    try {
        return api.get("/auth/logout")
    }
    catch (error) {
        console.log(" an error occurred logging out", error)
        throw(error)
    }
}
