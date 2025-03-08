import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
    favoriteProducts : JSON.parse(localStorage.getItem('favorite'))||[],
    cartProducts : JSON.parse(localStorage.getItem('cart'))||[],
    currentLink : 0,
    currentProduct : JSON.parse(localStorage.getItem('current')) || null,
};

export const shopSlice=createSlice(
    {name: 'shop',
    initialState,
    reducers:{
        addProduct:(state, action)=>{
     state.favoriteProducts.push(action.payload);
 },

       removeProduct:(state, action)=>{   
    state.favoriteProducts = state.favoriteProducts.filter(obj=>obj.id !== action.payload.id);
},

       addCartProduct:(state, action)=>{
    let findProduct=state.cartProducts.find((obj)=>obj.id===action.payload.id)
       if(findProduct) {
        findProduct.count++}
        else{
        state.cartProducts.push({
        ...action.payload,
        count:1})
        }
     },
       minusCartProduct:(state, action)=>{
        let findProduct=state.cartProducts.find((obj)=>obj.id===action.payload.id)
        if (findProduct && findProduct.count>1) {
            findProduct.count--}
         },

       removeCartProduct:(state, action)=>{   
    state.cartProducts = state.cartProducts.filter(obj=>obj.id !== action.payload.id);
    },
       setCurrentLink(state, action){
        state.currentLink=action.payload;
    },
       setCurrentProduct(state, action){
        if(state.currentProduct === null){
        state.currentProduct = action.payload;
        }else{state.currentProduct = null;
        state.currentProduct = action.payload;
        }
    },
    }
           }
)
export const selectLink=(state) => state.shop.currentLink;
export const selectCart=(state) => state.shop.cartProducts;
export const selectFavorite=(state) => state.shop.favoriteProducts;
export const selectCurrentProduct=(state) => state.shop.currentProduct;
export const { addProduct, removeProduct, addCartProduct, minusCartProduct, removeCartProduct, setCurrentLink, setCurrentProduct}= shopSlice.actions;
export default shopSlice.reducer;

