export interface FoodData {
    id?: number,
    title: string,
    image: string,
    price: number
}
export interface CartItem extends FoodData {
    quantity:number;
}