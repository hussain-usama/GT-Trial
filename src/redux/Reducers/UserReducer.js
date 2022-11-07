import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email : "",
  password: "",
  token: "",
  username: ""
}

 const UserReducers = createSlice({
  name: 'userReducer',
  initialState,
     reducers: {
      LoginUser: (state, action) => {
      return {
        ...state,
        allusers: action.payload,
      };
    },

  },
})

export const { LoginUser } = UserReducers.actions

export default UserReducers.reducer