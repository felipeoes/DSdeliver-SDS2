import axios from "axios";
// import { OrderPayload } from "./Orders/types";

const API_URL = 'https://felipe-sds2-project.herokuapp.com';

export function fetchProducts() {
    return axios(`${API_URL}/products`)
}

// export function fetchLocalMapBox(local: string) {
//     return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`)
// }

// export function saveOrder(payload: OrderPayload) {
//     return axios.post(`${API_URL}/orders`, payload);
// }