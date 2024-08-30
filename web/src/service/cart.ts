import { postEcomApi, getEcomApi, deleteEcomPayloadApi } from "./apis";

export async function getCarts() {
    const response: any = await getEcomApi(`api/carts`);
    return response
    if (!response) return
    // Toast("error", "Permission Denied");
}

export async function addTOCarts(payload: any) {
    const response: any = await postEcomApi(`api/carts`, payload);
    return response
    if (!response) return
    // Toast("error", "Permission Denied");
}

export async function deleteCart(payload: any) {
    const response: any = await deleteEcomPayloadApi(`api/carts/remove`, payload);
    return response
    if (!response) return
}

