import { createSlice } from "@reduxjs/toolkit";

const tabSlice=createSlice({
    name:'tab',
    initialState:{
    isCollapsed:false
    },
    reducers:{
        changeCollapsed(state){
            state.isCollapsed=!state.isCollapsed
        }
    }
})

export const {changeCollapsed}=tabSlice.actions

export default tabSlice.reducer