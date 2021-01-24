export type Order = {
        id: number,
        address: string,
        latitude: number,
        longitude: number,
        moment: string,
        status: string,
        total: number,
        products: Product[];
}

export type Product = {
        id: number,
        name: string,
        price: number,
        description: string,
        imageUri: string,
        amount: number
}

export type OrderLocationData = {
        latitude: number;
        longitude: number;
        address: string;

}

type ProductId = {
        id: number;
    }

export type OrderPayload = {
        products: ProductId[];
    } & OrderLocationData;