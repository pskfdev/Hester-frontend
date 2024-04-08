import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from "./wishlistSlice";
import userSlice from "./userSlice";
import { saveState } from "./function/util";

export const store = configureStore({
  reducer: {
    wishlistStore: wishlistSlice,
    userStore: userSlice
  },
});

/* ติดตามค่า store ถ้า store ไหนมีการเปลี่ยนแปลงค่า ให้ใช้ฟังก์ชั่น saveState เพื่อบันทึกข้อมูลล่าสุดลง LocalStorage */
store.subscribe(() => {
  saveState(store.getState())
})