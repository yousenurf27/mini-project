import { api } from '@/api';
import { DataEvent } from '@/models/eventModel';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getRecentEventsThunk = createAsyncThunk(
  'event/recent',
  async () => {
    try {
      const res = await api.get('events/recent')

      return res.data.data
    } catch (error) {
      return undefined
    }
  }
)

export const getEventsThunk = createAsyncThunk(
  'event/',
  async (payload: any) => {
    try {
      let { search, page } = payload;

      if(search == null) search = '';
      if(page == null) page = '';
      
      const res = await api.get(`events?page=${page}&search=${search}`)

      return {
        events: res.data.data,
        pagination: res.data.pagination
      }
    } catch (error) {
      return undefined
    }
  }
)

export const getEventByEventIdThunk = createAsyncThunk(
  'event/:eventId',
  async (id: string) => {
    try {
      
      const res = await api.get(`events/${id}`)

      return {
        event: res.data.data
      }
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
  event: DataEvent;
  events: DataEvent[];
  pagination: TPagiantion;
  isLoading: boolean;
};

const initialState: InitialState = {
  event: {} as DataEvent,
  events: [],
  pagination: {} as TPagiantion,
  isLoading: true,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getRecentEventsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRecentEventsThunk.fulfilled, (state, action) => {
      state.events = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getRecentEventsThunk.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getEventsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEventsThunk.fulfilled, (state, action) => {
      state.events = action.payload?.events;
      state.pagination = action.payload?.pagination;
      state.isLoading = false;
    });
    builder.addCase(getEventsThunk.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getEventByEventIdThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEventByEventIdThunk.fulfilled, (state, action) => {
      state.event = action.payload?.event;
      state.isLoading = false;
    });
    builder.addCase(getEventByEventIdThunk.rejected, (state) => {
      state.isLoading = false;
    });
  }
})

export const {} = eventSlice.actions;
export default eventSlice.reducer;
