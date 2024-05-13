import { api } from '@/api';
import { getToken } from '@/app/lib/session';
import { DataEvent } from '@/models/eventModel';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getEventsByIdThunk = createAsyncThunk(
  'mystore/events/byId',
  async (payload: any) => {
    try {
      const token = await getToken();

      let { page } = payload;

      if(page == null) page = '';

      const res = await api.get(`events/byId?page=${page}`, {
        headers: {
          'token': 'Bearer ' + token,
        }
      })

      return {
        events: res.data.data,
        pagination: res.data.pagination
      }
    } catch (error) {
      return undefined
    }
  }
)

export const deleteEventByIdThunk = createAsyncThunk(
  'mystore/events/:eventId',
  async (id: string) => {
    try {
      const token = await getToken();

      await api.delete(`events/${id}`, {
        headers: {
          'token': 'Bearer ' + token,
        }
      })

      return id
    } catch (error) {
      return undefined
    }
  }
)

export const addEventByIdThunk = createAsyncThunk(
  'mystore/addEvent/',
  async (payload: any) => {
    try {
      const token = await getToken();

      const res = await api.post('events/', payload, {
        headers: {
          'token': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        }
      })

      return res.data.data
    } catch (error) {
      return undefined
    }
  }
)

type TPagiantion = {
  totalPage: number;
  currentPage: number;
}

type InitialState = {
  events: DataEvent[];
  pagination: TPagiantion;
  isLoading: boolean;
};

const initialState: InitialState = {
  events: [],
  pagination: {} as TPagiantion,
  isLoading: true,
};

const myStoreSlice = createSlice({
  name: 'mystore',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getEventsByIdThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEventsByIdThunk.fulfilled, (state, action) => {
      state.events = action.payload?.events;
      state.pagination = action.payload?.pagination;
      state.isLoading = false;
    });
    builder.addCase(getEventsByIdThunk.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addEventByIdThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addEventByIdThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addEventByIdThunk.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(deleteEventByIdThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteEventByIdThunk.fulfilled, (state, action) => {
      // if (action.payload) state.events = state.events.filter((ev) => ev.id !== action.payload);
      state.isLoading = false;
    });
    builder.addCase(deleteEventByIdThunk.rejected, (state) => {
      state.isLoading = false;
    });
  }
})

export const {} = myStoreSlice.actions;
export default myStoreSlice.reducer;
