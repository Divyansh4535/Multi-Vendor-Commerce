import { createSlice } from "@reduxjs/toolkit";


const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isOpen: false,
    },
    reducers: {
        toggleSidebar(state) {
            state.isOpen = !state.isOpen
        }
    }
})

export default sidebarSlice.reducer;
export const  { toggleSidebar } = sidebarSlice.actions