import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { connectionString } from '../../config/ConnectionString'

const initialState = {
  userArray: [],
  status: 'loading',
  error: false,
};


export const fetchUsers = createAsyncThunk('dashboardReducer/fetchUsers', async () => {
  try {
    const response = await axios.get(`${connectionString}api/users`);
    debugger
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

 const DashboardReducer = createSlice({
  name: 'dashboardReducer',
  initialState,
//   reducers: {
//     userData: (state, action) => {
//       return {
//         ...state,
//         allusers: action.payload,
//       };
//     },

//   },
  extraReducers : {
      
    [fetchUsers.pending] :(state, action) => {
      state.status = 'loading';
    } ,
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.userArray = action.payload.data
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = true
    }
},
});


export default DashboardReducer.reducer;
