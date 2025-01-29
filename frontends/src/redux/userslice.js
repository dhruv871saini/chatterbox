import { createSlice } from '@reduxjs/toolkit';

const userslice = createSlice({
  name: 'user',
  initialState: {
    authUser: null, 
    otherUsers: [],
    selectorUsers: [],
    getOnlineUser:[]
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectorUsers: (state, action) => {
      state.selectorUsers = action.payload;
    },
    setgetOnlineUser:(state,action)=>{
      state.getOnlineUser=action.payload
    }
  },
});

export const { setAuthUser, setOtherUsers, setSelectorUsers ,setgetOnlineUser} = userslice.actions;
export default userslice.reducer;
