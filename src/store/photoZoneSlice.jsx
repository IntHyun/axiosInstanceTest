import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialZoneState = {
  photoZoneData: [],
  error: null,
  loading: false,
};

export const getPhotoZone = createAsyncThunk(
  'photoZone/getPhotoZone',
  async (accountname) => {
    const URL = 'https://api.mandarin.weniv.co.kr';
    const authToken = localStorage.getItem('token');
    // const accountName = localStorage.getItem('accountname');
    const res = await axios.get(
      `${URL}/product/${accountname}?limit=infinity`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-type': 'application/json',
        },
      },
    );
    return res.data;
  },
);

const photoZoneSlice = createSlice({
  name: 'photoZone',
  initialState: initialZoneState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPhotoZone.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getPhotoZone.fulfilled, (state, payload) => {
        state.error = null;
        state.loading = false;
        state.photoZoneData = payload;
      })
      .addCase(getPhotoZone.rejected, (state, payload) => {
        state.error = payload;
        state.loading = false;
      });
  },
});

export const photoZoneAction = photoZoneSlice.actions;

export default photoZoneSlice.reducer;
