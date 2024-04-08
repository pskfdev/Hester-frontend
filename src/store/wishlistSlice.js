import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "./function/util";


const initialState = {
  product_id: loadState(),
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    addWishlist: (state, action) => {
      state.product_id  = [...state.product_id, action.payload];
    },
    removeWistlist: (state, action) => {
      state.product_id = action.payload
    },
    clearProductId: (state) => {
      state.product_id = []
    }
  },
});

export const { addWishlist, removeWistlist, clearProductId } = wishlistSlice.actions
export default wishlistSlice.reducer;

