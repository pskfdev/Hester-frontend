import { createSlice } from "@reduxjs/toolkit";


const initialState ={
  cart: [],
}

export const cartSlice = createSlice({
  name: "cartStore",
  initialState: initialState,
  reducers: {
    addCart: (state, action) => {
      state.cart  = [...state.cart, action.payload];
    },
    removeCart: (state, action) => {
      state.cart = action.payload
    },
    clearCart: (state) => {
      state.cart = []
    },
    /* ใช้สำหรับดึงข้อมูลล่าสุด เมื่อมีการรีเฟรช */
    updateCart: (state, action) => {
      state.cart = action.payload;
    }
  },
});

export const { addCart, removeCart, clearCart, updateCart } = cartSlice.actions
export default cartSlice.reducer;