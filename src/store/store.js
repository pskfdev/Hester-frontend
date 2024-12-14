import { configureStore } from "@reduxjs/toolkit";
/* Store */
import wishlistSlice from "./wishlistSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
//Function
import { saveState } from "./function/util";

export const store = configureStore({
  reducer: {
    wishlistStore: wishlistSlice,
    cartStore: cartSlice,
    userStore: userSlice
  },
});

/* ติดตามค่า store ถ้า store ไหนมีการเปลี่ยนแปลงค่า ให้ใช้ฟังก์ชั่น saveState เพื่อบันทึกข้อมูลล่าสุดลง LocalStorage */
store.subscribe(() => {
  saveState(store.getState())
})