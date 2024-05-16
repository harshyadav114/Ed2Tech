import React from 'react';
import {sidebarLinks} from '../../../data/dashboard-links';
import SidebarLink from './SidebarLink';
import {useSelector,useDispatch} from 'react-redux';
import { VscSignOut } from "react-icons/vsc"
import { useNavigate } from "react-router-dom"
import { logout } from "../../../services/operations/auth";
import ConfirmationModal from '../../common/Modal';
import { useState } from 'react';


const Sidenav = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }
  console.log(user)
  return (
    <><div className='flex min-[410px]:min-w-[150px] min-w-[120px] min-h-[calc(100vh-3.5rem)] max-w-[400px] w-1/5 flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>
        <div className='flex flex-col gap-2'>
          {
            sidebarLinks.map((link)=>
            {
              if(link.type && link.type!==user?.accounttype) return null
              return (
                <SidebarLink key={link.id} path={link.path} name={link.name} icon={link.icon}/>
              )
          }  )} 
        </div>
        <div className="mx-auto mt-5 mb-5 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col">
          <SidebarLink
            name ={"Settings"}
            path ={"/dashboard/settings"}
            icon={"VscSettingsGear"}
          />

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="sm:px-6 px-3 py-3 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
        </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default Sidenav