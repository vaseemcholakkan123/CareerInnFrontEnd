import { createSlice } from '@reduxjs/toolkit'
  

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {username:null,profile:null,user_id:null,email:null,banner:null,location:null,info:null,mobile:null,is_premium_user:false,resume:null},
  },
  reducers: {
    Adduser: (state, action) => {
      state.value = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loadUserFromLocalStorage: (state) => {
        const userString = localStorage.getItem('user');
        if (userString) {
          const user = JSON.parse(userString);
          state.value = user;
        }
      }, 
  },
  
})   

// Action creators are generated for each case reducer function
export const { Adduser,loadUserFromLocalStorage } = userSlice.actions

export default userSlice.reducer