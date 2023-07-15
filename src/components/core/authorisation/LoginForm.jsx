import React, { useState } from 'react';
import '../../../App.css'
import { useDispatch } from 'react-redux';
import { loginApiCall } from '../../../slices/authorisation';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const[logindata,setlogindata] = useState({
                                                email: "",
                                                password: ""
                                            });

    const datachangeHandler = (e) => {
        const updateddata = {
                                ...logindata,
                                [e.target.name]: e.target.value,
                            };
        setlogindata(updateddata)

    }

    const submitHandler = async(e) => {
        e.preventDefault()
        try {
            await dispatch(loginApiCall(logindata,dispatch)).unwrap();
        
            navigate("/dashboard/my-profile") 
            const toastid = toast.loading("Log In successful")
            setTimeout(() => {
                toast.dismiss(toastid)
            }, 2000);
        } catch (error) {
            console.log(error)
            const toastid = toast.error("Login Failed")
            setTimeout(() => {
                toast.dismiss(toastid)
            }, 2000);
            
             alert(error)
        }   
    }

    return (
        <div>
            <div className='input:checked ~ .radio   '>
                <div className="flex justify-center items-center border-[2px] border-richblack-300 rounded-xl shadow-lg m-5 bg-richblack-800 w-fit mx-auto my-8">
                    <div className="bg-richblack-800 rounded-xl">
                        <div className="inline-flex rounded-xl">
                            <input type="radio" name="room_type" id="roomPrivate"  hidden/>
                            <label htmlFor="roomPrivate" className="radio text-center self-center py-2 px-5 rounded-xl cursor-pointer hover:opacity-75 font-semibold text-richblack-25">Student</label>
                        </div>
                        <div className="inline-flex rounded-xl">
                            <input type="radio" name="room_type" id="roomPublic" hidden/>
                            <label htmlFor="roomPublic" className="radio text-center self-center py-2 px-4 rounded-xl cursor-pointer hover:opacity-75 font-semibold text-richblack-25">Instructor</label>
                        </div>
                    </div>
                </div>
            </div>
            <form  onSubmit = {submitHandler} className='flex flex-col justify-center '>
                <div className='flex flex-col my-2'>
                <label htmlFor="emailid" className=' text-sm text-richblack-25 font-inter font-semibold'>Email Address :</label>
                    <input
                        className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white w-[20rem] m-1'
                        onChange={datachangeHandler}
                        id='emailid'
                        type='email'
                        name='email'
                        value={logindata.email}
                        placeholder='xyz@gmail.com'
                        required
                        
                    />
                </div>

                <div className='flex flex-col mt-2'>
                <label htmlFor="password" className=' text-sm text-richblack-25 font-inter font-semibold'>Password :</label>
                    <input
                        className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white w-[20rem] mx-1 mt-1'
                        onChange={datachangeHandler}
                        id='password'
                        type='password'
                        name='password'
                        value={logindata.password}
                        placeholder='xdmdfnds345'
                        required
                        
                    />
                </div>
                <Link to='/forgot-password'>
                    <p className=" ml-auto max-w-max text-xs text-blue-100">forgot password</p>
                </Link>

                <button
                    type='submit'
                    className='border-1px border-blue-500 rounded-md px-4 py-2 bg-blue-200 text-white w-[20rem] m-1 my-[5rem] mx-auto'
                >
                    Log In
                </button>
            </form>
        </div>
        
            
        
    );
};

export default LoginForm;