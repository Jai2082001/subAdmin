import {createSlice} from '@reduxjs/toolkit'


const subAdmin = createSlice({
    name: 'cart',
    initialState: {},
    reducers: {
        changeSubAdmin(state, action){
            state = action
        }
    }
})

export const subAdminActions = subAdmin.actions;
export default subAdmin