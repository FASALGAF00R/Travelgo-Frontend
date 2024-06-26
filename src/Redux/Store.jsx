import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserSlice from './UserSlice';
import AgentSlice from './AgentSlice';


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = {
  user: persistReducer(persistConfig, UserSlice),
  agent: persistReducer(persistConfig, AgentSlice),
};

const Store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(Store);

export  { Store, persistor };
