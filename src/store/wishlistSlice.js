import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "./function/util";


/* const initialState = {
  product_id: loadState(),
}; */
const initialState ={
  wishlist: [],
}

export const wishlistSlice = createSlice({
  name: "wishlistStore",
  initialState: initialState,
  reducers: {
    addWishlist: (state, action) => {
      state.wishlist  = [...state.wishlist, action.payload];
    },
    removeWistlist: (state, action) => {
      state.wishlist = action.payload
    },
    clearProductId: (state) => {
      state.wishlist = []
    },
    /* ใช้สำหรับดึงข้อมูลล่าสุด เมื่อมีการรีเฟรช */
    updateWishlist: (state, action) => {
      state.wishlist = action.payload;
    }
  },
});

export const { addWishlist, removeWistlist, clearProductId, updateWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer;

