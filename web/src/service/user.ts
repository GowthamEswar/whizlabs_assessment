import { getApi } from "./apis";

export async function getUsers() {
    const response: any = await getApi(`users`);
    return response
    if (!response) return
    // Toast("error", "Permission Denied");
}
