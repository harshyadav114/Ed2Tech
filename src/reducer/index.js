import {combineReducers} from '@reduxjs/toolkit';

import authReducer from '../Slicer/authSlicer';
import cartReducer from '../Slicer/cartSlicer';
import profileReducer from '../Slicer/profileSlicer';
import courseReducer from '../Slicer/courseSlicer';
import viewCourseReducer from '../Slicer/viewCourseSlicer';


const rootReducer=combineReducers({
    auth:authReducer,
    cart:cartReducer,
    profile:profileReducer,
    course:courseReducer,
    viewcourse:viewCourseReducer

})

export default rootReducer;