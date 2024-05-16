import React from 'react';
import Logosrc from '../../assets/Logo/whitetrans.png';
import {useLocation,Link} from 'react-router-dom';
import { NavbarLinks } from "../../data/navbar-links";
import { Account_type } from '../../utils/constant';
import { useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import Profiledropdown from './Profiledropdown';
import { catalogData } from '../../services/Apiendpoints';
import {apiconnector} from '../../services/Apiconnector'
import { useEffect, useState } from 'react';
import { FaCaretUp } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs"

const Navbar = () => {
    const location=useLocation();
    const matchRoute = (route) => {
        if(route===location.pathname) return true;
        else return false;
      }
    const {user}=useSelector(state=>state.profile)
    const {token}=useSelector(state=>state.auth);
    const {totalitems}=useSelector(state=>state.cart);
    const [catalogdata,setcatalogdata]=useState(null);
    const [loading,setloading]=useState(false);
    const [uparrow,setuparrow]=useState(catalogdata?.filter((subLink) => subLink?.courses?.length > 0));
    const[menu,setmenu]=useState(false)
    async function getcatalogdata(){
        setloading(true);
        try{
            
            const data=await apiconnector('GET',catalogData.CATALOGPAGEDATA_API_PUBLISHED)
            //console.log(data)
            setcatalogdata(data?.data?.data);
        }catch(error){
            console.log(error);
        }
        setloading(false);
    }
    useEffect(()=>{
        getcatalogdata();
        //console.log(catalogdata)
    },[]);
    useEffect(()=>{
        const temp=catalogdata?.filter((subLink) =>( subLink?.courses?.length > 0 ));
        //console.log(temp);
        
        setuparrow(temp);
        
        
        
    },[catalogdata])

  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""} transition-all duration-200`}>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to="/">
          <img src={Logosrc} alt="Logo" width={120} height={22} loading="lazy" />
        </Link>
        <ul className="flex gap-x-6 text-richblack-25 max-md:hidden">
            {
                NavbarLinks.map((element,ind) => (
                    <li key={ind}>
                        
                        {element.title!=='Catalog'?(
                            <Link to={element?.path} >
                                <p
                                className={`${
                                    matchRoute(element?.path)
                                    ? "text-yellow-25"
                                    : "text-richblack-25"
                                }`}
                                >{element.title}</p>
                            </Link>
                        ):(
                            <div className='relative flex-col flex group h-full cursor-pointer '>
                                <p className='cursor-pointer flex gap-1 items-center'>{element.title} <BsChevronDown /></p>
                                <div className='h-4 w-40 absolute top-[100%] bg-transparent z-[5]'></div>
                                <FaCaretUp className='text-4xl absolute top-[80%] text-white bg-transparent z-10 scale-0 transition-all duration-150  group-hover:scale-100 '/>
                                <div className=' absolute flex flex-col w-60 top-[160%] left-[-30%] z-10 scale-0 transition-all duration-150 group-hover:scale-100 origin-top rounded-lg bg-richblack-5 p-2 text-richblack-900'>
                                    {uparrow && uparrow.length>0?
                                    (uparrow?.map((cat,ind)=>{
                                        return <Link key={ind} to={`/catalog/${cat.name.split(' ').join('-')}`} className='px-4 py-2 hover:bg-richblack-50 rounded-lg bg-transparent'>{cat.name}</Link>
                                    })):(<div className='px-4 py-2 hover:bg-richblack-50 rounded-lg bg-transparent'>No Catalog Found</div>)
                                }</div>
                            </div>
                        )
                    
                        }</li>
                )
                    
                )
            }
        </ul>
        
        <div className="items-center gap-x-4 flex max-sm:gap-x-2">
            {
                user && token!==null && user?.accounttype!==Account_type.instructor && (
                    <Link to='/dashboard/cart' className='relative'>
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                            {totalitems>0 && (
                                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                {totalitems}
                              </span>
                            )}
                    </Link>
                )
            }
            {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border max-md:hidden border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100  max-sm:px-[6px] max-sm:py-[5px]">
                Log in
              </button>
            </Link>
            )}
            {token === null && (
                <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 max-md:hidden bg-richblack-800 px-[12px] py-[8px] text-richblack-100 max-sm:px-[6px] max-sm:py-[5px]">
                    Sign up
                </button>
                </Link>
            )}
            
            {token !== null && <Profiledropdown />}

            <div className="text-2xl text-richblack-100 md:hidden" onClick={()=>setmenu(!menu)}><BsChevronDown></BsChevronDown></div>
           {menu && <></>}
            
        </div>

        </div>

    </div>
  )
}

export default Navbar