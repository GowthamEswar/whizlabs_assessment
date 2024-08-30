import { postEcomApi, getEcomApi, deleteEcomApi } from "./apis";

export async function getProducts() {
    const response: any = await getEcomApi(`api/products`);
    return response
    if (!response) return
    // Toast("error", "Permission Denied");
}

export async function createProduct(payload: any) {
    const response: any = await postEcomApi(`api/products`, payload);
    return response
    if (!response) return
}

export async function deleteProduct(id: any) {
    const response: any = await deleteEcomApi(`api/products/${id}`);
    return response
    if (!response) return
}
