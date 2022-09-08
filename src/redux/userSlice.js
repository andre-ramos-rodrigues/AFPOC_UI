import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  isFetching: true,
  error: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.currentUser = null;
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    loginFailure: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      return initialState
    }
  }
})

export const {loginStart, loginSuccess, loginFailure, logout, subscription} = userSlice.actions
export default userSlice.reducer
