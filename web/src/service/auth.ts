import { NavigateFunction } from "react-router-dom";
import { postAuthApi } from "./apis";
// import Toast from "../components/Toast";
import { signInType } from "../utlity/interface";

export async function signIn(data: signInType, navigate: NavigateFunction) {
    const payload = {
        ...data,
        email: data.email.toLowerCase(),
    }
    const response: any = await postAuthApi('login', payload)
    if (!response) return
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    navigate('/app/product')
    // Toast("error", "Permission Denied");
}

export async function signUp(data: signInType, navigate: NavigateFunction) {
    const payload = {
        ...data,
        email: data.email.toLowerCase(),
    }
    const response: any = await postAuthApi('signup', payload)
    if (!response) return
    navigate('/')
    // Toast("error", "Permission Denied");
}