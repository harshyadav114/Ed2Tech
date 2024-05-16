import {createSlice} from '@reduxjs/toolkit';


const initialState={
    loading:false,
    token:localStorage.getItem('token') ? (JSON.parse(localStorage.getItem('token'))) : (null),
    signupdata:null 
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setsignupdata(state,value){
            state.signupdata=value.payload;
        },
        setloading(state,value){
            state.loading=value.payload;
        },
        settoken(state,value){
            state.token=value.payload
        },
    }

});

export const {setloading,setsignupdata,settoken}=authSlice.actions;

export default authSlice.reducer;