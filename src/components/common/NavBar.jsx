import React, { useEffect } from 'react';
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, NavLink, matchPath } from 'react-router-dom';
import {NavbarLinks} from '../../data/navbar-links'
import "../../App.css"
import { useState } from 'react';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { useLocation } from 'react-router-dom';
import { BsSearch, BsCart3} from 'react-icons/bs';
import {IoMdArrowDropdown} from 'react-icons/io';
import {AiOutlineMenu} from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from '../core/dashboard/profiledropdown';



const NavBar = () => {



    const [subLinks, setsubLinks]  = useState([]);
    const {token} = useSelector( (state) => state.authorisation );
    //console.log(`token - ${JSON.stringify(token)}`)
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart )
    console.log(`totalitems - ${totalItems}`)

    //console.log(`url are here ${categories.CATEGORIES_API}`)


    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing Sublinks result:" , result);
            setsubLinks(result.data.data);
        }
        catch(error) {
            console.log("Could not fetch the category list");
        }
    }

    useEffect( () => {
        fetchSublinks();
    },[] )
    
    const location = useLocation()

    const matchRoute = (path) => {
         return matchPath({path}, location.pathname) //checking require
    }


    return (
        <div className='bg-black w-screen '>
            <div className='flex items-center w-[95%] max-h-[3rem] gap-[20%] mx-auto'>
                <div className=' ml-8'>
                    <Link to='/'><img src={Logo} alt='logo' width={150} height={30} loading='lazy'></img></Link>
                </div>
                <nav className=''>
                    <ul className='flex gap-x-6 text-richblack-25 h-[3rem]  text-[1.2rem] items-center'>
                        {
                        NavbarLinks.map((item,index) => (<li key={index}>
                            {
                                item.title === "Catalog" ? 
                                (<div className= "text-white h-[3rem] w-[5rem] group ">
                                    <div className='flex items-center'>
                                        <p className=' h-[3rem] mt-[9px]'>{item.title} </p>
                                        <IoMdArrowDropdown className='text-white'></IoMdArrowDropdown>
                                    </div>
                                    <div className="bubble bubble:after opacity-0 transition-all duration-200 group-hover:visible
                                            group-hover:opacity-100 ">     
                                    
                
                                        {subLinks.map((subLink,index) => (<Link to={`${categories.CATEGORYWISE_API}${subLink._id}`} key={index} className=' text-white hover-pointer'>
                                            {subLink.name}
                                        </Link>))}  
                
                                    </div>
                                </div>)//sublink.path should the the path of the ui which gives me all the course stored in db of category. need to make a saperate page and a route which is then link to the path here. 
                                : 
                                (<Link to={item?.path} className={`${matchRoute(item?.path)?('text-yellow-25'):('text-richblack-25')} relative flex items-center justify-center`}>
                                    {item.title}
                                </Link>)
                            }
                        </li>))
                        }
                    </ul>
                </nav>

                <div className='max-h-[3rem] max-w-[25%]'>
                    <div className=' flex items-center gap-x-4 '>

                        <div className='hover-pointer'>
                            <BsSearch className='text-white '></BsSearch>
                        </div>
                                                
                        {
                            //checkfor account type then show cart
                            user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && 
                            (                    
                                <Link to="/dashboard/cart" className='relative'>
                                    <BsCart3 />
                                    {   //add css to adjust the position of itemnumber over cart icon
                                        totalItems > 0 && (
                                            <span className='absolute '> 
                                                {totalItems}
                                            </span>
                                        )
                                    }
                                </Link>
                            )

                        }

                        {token === null && (
                            <NavLink to="/login"   className={({ isActive }) =>
                            isActive ? 'bg-richblack-700 font-bold rounded-[8px] px-[12px] py-[4px]' : 'bg-richblack-800  rounded-[8px] border border-richblack-800 px-[12px] py-[4px]'}>
                                <button className="rounded-[8px]  border-richblack-800 text-richblack-100 ">
                                    Log in
                                </button>
                            </NavLink>
                        )}

                        {token === null && (
                            <NavLink to="/signup"   className={({ isActive }) =>
                            isActive ? 'bg-richblack-700 font-bold rounded-[8px]  px-[12px] py-[4px]' : 'bg-richblack-800  rounded-[8px] border border-richblack-800 px-[12px] py-[4px]'}>
                                <button className="rounded-[8px]  border-richblack-800 text-richblack-100 ">
                                    Sign up
                                </button>
                            </NavLink>
                        )}

                        {token !== null && <ProfileDropdown />}

                        <button className="mr-4 md:hidden">
                            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                        </button>
                    </div>

                </div>




            </div>           
        </div>
   
           
    );
};

export default NavBar;