import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../pages/HomePage";
import { RootState } from "../store";

export type ProductWithCount = Product &{
   count: number; 
 }

interface ShopSliceState{
   favoriteProducts :Product[];
   cartProducts :ProductWithCount[];
   currentLink :number|null;
   currentProduct :Product;
}

 const initialState:ShopSliceState = {
    favoriteProducts : JSON.parse(localStorage.getItem('favorite') || '[]'),
    cartProducts : JSON.parse(localStorage.getItem('cart') || '[]'),
    currentLink : 0,
    currentProduct : JSON.parse(localStorage.getItem('current') || 'null'),
};

export const shopSlice=createSlice(
    {name: 'shop',
    initialState,
    reducers:{
        addProduct:(state, action:PayloadAction<Product>)=>{
     state.favoriteProducts.push(action.payload);
 },

       removeProduct:(state, action:PayloadAction<Product>)=>{   
    state.favoriteProducts = state.favoriteProducts.filter(obj=>obj.id !== action.payload.id);
},

       addCartProduct:(state, action:PayloadAction<Product>)=>{
    let findProduct =state.cartProducts.find((obj)=>obj.id===action.payload.id)
       if(findProduct) {
        findProduct.count++}
        else{
        state.cartProducts.push({
        ...action.payload,
        count:1})
        }
     },
       minusCartProduct:(state, action:PayloadAction<ProductWithCount>)=>{
        let findProduct=state.cartProducts.find((obj)=>obj.id===action.payload.id)
        if (findProduct && findProduct.count>1) {
            findProduct.count--}
         },

       removeCartProduct:(state, action:PayloadAction<ProductWithCount>)=>{   
    state.cartProducts = state.cartProducts.filter(obj=>obj.id !== action.payload.id);
    },
       setCurrentLink(state, action:PayloadAction<number|null>){
        state.currentLink=action.payload;
    },
       setCurrentProduct(state, action:PayloadAction<Product>){
        state.currentProduct = action.payload;
    },
    }
           }
)
export const selectLink=(state:RootState) => state.shop.currentLink;
export const selectCart=(state:RootState) => state.shop.cartProducts;
export const selectFavorite=(state:RootState) => state.shop.favoriteProducts;
export const selectCurrentProduct=(state:RootState) => state.shop.currentProduct;
export const { addProduct, removeProduct, addCartProduct, minusCartProduct, removeCartProduct, setCurrentLink, setCurrentProduct}= shopSlice.actions;
export default shopSlice.reducer;

