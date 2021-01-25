import axios from "axios";
import { OrderPayload } from "./types";
import { API_URL, API_TOKEN } from '@env';

export function fetchProducts() {
    return axios(`${API_URL}/products`)
}

export function fetchLocalMapBox(local: string) {
    return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${API_TOKEN}`)
}

export function saveOrder(payload: OrderPayload) {
    return axios.post(`${API_URL}/orders`, payload);
}

