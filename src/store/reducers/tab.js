import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        isCollapsed: false,
        tabList: [
            {
                label: '首页',
                name: 'home',
                path: '/home'
            }
        ]
    },
    reducers: {
        changeCollapsed(state) {
            state.isCollapsed = !state.isCollapsed
        },
        changeTabList(state, val) {
            if (!state.tabList.some(v => v.path === val.payload.path)) {
                state.tabList.push(val.payload)
            }
        },
        delTablist(state, {payload}){
            state.tabList=state.tabList.filter(e=>e.path!==payload.path)
        }
    }
})

export const { changeCollapsed ,changeTabList,delTablist} = tabSlice.actions

export default tabSlice.reducer