import React from 'react';
import {useSelector} from 'react-redux';
import { Navigate } from "react-router-dom"

const Openroute = ({children}) => {
    const {token}=useSelector(state=>state.auth);
    if (token === null) {
        return children
      } else {
        return <Navigate to="/dashboard/myprofile" />
      }
}

export default Openroute