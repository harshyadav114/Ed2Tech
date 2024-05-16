import {createSlice} from '@reduxjs/toolkit';

const initialState={
    step:1,
    course:null,
    editcourse:false,
    paymentloading: false,
    editsec:false
}

const courseSlice=createSlice({
    name:'course',
    initialState,
    reducers:{
        setStep(state,value){
            state.step=value.payload
        },
        setCourse(state,value){
            state.course=value.payload
        },
        setEditcourse(state,value){
            state.editcourse=value.payload
        },
        resetCourseState: (state) => {
            state.step = 1
            state.course = null
            state.editcourse = false
        },
        setPaymentloading(state,value){
            state.paymentloading=value.payload
        },
        setEditsec(state,value){
            state.editsec=value.payload
        }
    }
})

export const {
    setCourse,
    setEditcourse,
    setStep,
    setPaymentloading,
    resetCourseState
}=courseSlice.actions;

export default courseSlice.reducer;

