import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { combineReducers } from 'redux';
import newsReducer from './slices/NewsSlice';  

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['news'],
};

const rootReducer = combineReducers({
	news: newsReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
