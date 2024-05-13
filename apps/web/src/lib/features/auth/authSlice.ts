import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { JWTPayload } from 'jose';

interface PayloadUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  referral: string;
  role: string;
}

interface ValueState {
  isAuth: boolean;
  session: JWTPayload | PayloadUser | undefined;
  token: string | undefined;
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
      state.value = action.payload
    }
  },
})

export const { addAuth } = authSlice.actions

export default authSlice.reducer
