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
      /* state.wishlist  = [...state.wishlist, action.payload]; */
      state.wishlist = action.payload;
    },
    removeWistlist: (state, action) => {
      state.wishlist = action.payload
    },
    clearProductId: (state) => {
      state.wishlist = []
    }
  },
});

export const { addWishlist, removeWistlist, clearProductId } = wishlistSlice.actions
export default wishlistSlice.reducer;

