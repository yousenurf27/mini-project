import { api } from '@/api';
import { getToken } from '@/app/lib/session';
import { DataVoucher } from '@/models/voucherModel';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getVouchersByIdThunk = createAsyncThunk(
  'user/vouhcer',
  async () => {
    try {
      const token = await getToken();

      const res = await api.get('users/voucher', {
        headers: {
          'token': 'Bearer ' + token,
        }
      })

      return res.data.data
    } catch (error) {
      return undefined
    }
  }
)

type InitialState = {
  vouchers: DataVoucher[];
  isLoading: boolean;
};

const initialState: InitialState = {
  vouchers: [],
  isLoading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getVouchersByIdThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVouchersByIdThunk.fulfilled, (state, action) => {
      state.vouchers = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getVouchersByIdThunk.rejected, (state) => {
      state.isLoading = false;
    });
  }
})

export const {} = userSlice.actions;
export default userSlice.reducer;
