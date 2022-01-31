import {configureStore} from '@reduxjs/toolkit';
import subAdmin from './sub-admin';

const store = configureStore({reducer: {subAdmin: subAdmin.reducer}})


export default store