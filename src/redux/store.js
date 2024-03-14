import { configureStore } from "@reduxjs/toolkit";
import quesReducer from "./slices/QuestionSlice";
import { combineReducers } from "@reduxjs/toolkit";
import answerReducer from "./slices/AnswerSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  questions: quesReducer,
  userAnswer: answerReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
