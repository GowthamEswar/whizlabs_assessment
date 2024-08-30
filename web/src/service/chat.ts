import { getChatApi, postChatApi } from "./apis";

export async function getMessage(id: string) {
    const response: any = await getChatApi(`api/message/${id}`);
    return response
    if (!response) return
    // Toast("error", "Permission Denied");
}

export async function postMessage(message: any) {
    console.log("inner postMessage")
    const response: any = await postChatApi(`api/message`, message);
    return response
    if (!response) return
    // Toast("error", "Permission Denied");
}

export async function getChats() {
    const response: any = await getChatApi(`api/chat`);
    return response
    if (!response) return
    // Toast("error", "Permission Denied");
}

export async function createChat(payload: any) {
    const response: any = await postChatApi(`api/chat`, payload);
    return response
    if (!response) return
}
