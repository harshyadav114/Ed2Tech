import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
};

const profileSlice=createSlice({
    name:"profile",
    initialState: initialState,
    reducers:{
    setuser(state,value){
        state.user=value.payload
    },
    setloading(state,value){
        state.loading=value.payload
    }

}
})

export const {setloading,setuser} = profileSlice.actions;

export default profileSlice.reducer;