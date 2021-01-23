import axios from "axios";
// import { OrderPayload } from "./Orders/types";

const API_URL = 'https://felipe-sds2-project.herokuapp.com';

export function fetchProducts() {
    return axios(`${API_URL}/products`)
}

// IMPLEMENTAÇÃO MAPBOX
const ACCESS_TOKEN_MAP_BOX =
"access_token=pk.eyJ1IjoiZmVsaXBlb2VzIiwiYSI6ImNrang5bWtxbjAxa20yd3A0MTVtbnJ1eXkifQ.rfoDt6tAkCzMRDIRS2NGgQ";

const mapboxToken = "pk.eyJ1IjoiZmVsaXBlb2VzIiwiYSI6ImNrang5bWtxbjAxa20yd3A0MTVtbnJ1eXkifQ.rfoDt6tAkCzMRDIRS2NGgQ";

// export const fetchLocalMapBox = (local: string) =>
// fetch(
//   `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`
// ).then(response => response.json()).then(data => data);

export function fetchLocalMapBox(local: string) {
    return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`)
}

// export function saveOrder(payload: OrderPayload) {
//     return axios.post(`${API_URL}/orders`, payload);
// }

