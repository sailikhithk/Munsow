import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "../features/appStateSlice";
import InstitutionReducers from "../Actions/reducer";
const store = configureStore({
  reducer: {
    appState: appStateSlice,
    AdminData: InstitutionReducers,
  },
});

export default store;
