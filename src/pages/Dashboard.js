import React from 'react';
import Navbar from '../component/common/Navbar';
import Sidenav from '../component/core/Dashboard/Sidenav';
import {Outlet} from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
        <div className='flex flex-col'>
            <Navbar/>
            <div className='flex'>
                <Sidenav/>
                <Outlet/>
            </div>
        </div>
    </>
  )
}

export default Dashboard