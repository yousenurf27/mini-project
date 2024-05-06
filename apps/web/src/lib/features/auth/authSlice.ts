import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { JWTPayload } from 'jose';

interface ValueState {
  isAuth: boolean;
  session: JWTPayload | undefined
}

const initialState = {
  value: {
    isAuth: false
  } as ValueState,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAuth: (state, action: PayloadAction<ValueState>) => {
      // console.log(action.payload)
      state.value = action.payload
    }
  },
})

export const { addAuth } = authSlice.actions

export default authSlice.reducer
