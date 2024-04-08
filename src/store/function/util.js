/* Load data from localStorage */
export const loadState = () => {
  try {
    const wishlistStore = localStorage.getItem("wishlistStore");
    const wishlist = JSON.parse(wishlistStore);

    if (wishlist.product_id.length == 0) {
      return [];
    } else {
      return wishlist.product_id;
    }
  } catch (error) {
    return [];
  }
};


/* save value to localStorage */
/* state คือ เข้าถึงข้อมูลใน store ไฟล์store */
export const saveState = (state) => {
    try {
      const userStore = JSON.stringify(state.userStore.user)
      const wishlistStore = JSON.stringify(state.wishlistStore)
  
      localStorage.setItem('wishlistStore', wishlistStore)
      localStorage.setItem('userStore', userStore)
    } catch (error) {
      console.log("saveState error!" + error.message)
    }
  }
  
