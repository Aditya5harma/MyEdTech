import React from 'react';
import { useForm } from 'react-hook-form';
import {messageSend} from '../../services/operations/contactUsAPI'
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import CountryCodes from '../../data/countrycode.json'

 
const ContactUsform = () => {
    const { register,
            handleSubmit,
            reset,
            setValue,
            formState: { isSubmitSuccessful,errors }} = useForm();

    useEffect(()=>{
        setValue('countryCode', '+91');
    },[setValue])

    const contactformSubmit = async(data) => {
        const sendingtoast = toast.loading("...loading")
        try {
            const response = await messageSend(data)
            console.log(response)
            toast.dismiss(sendingtoast)
            const successtoast = toast.success("Message sent successfully")
            setTimeout(() => {
                toast.dismiss(successtoast)
            }, 2000);  

        } catch (error) {
            console.log(error)
            toast.dismiss(sendingtoast)
            const errortoast = toast.error("Message sending failed")
            setTimeout(() => {
                toast.dismiss(errortoast)
            }, 2000);            
        }

    }

    //resetting form
    useEffect(() => {
        if (isSubmitSuccessful) {
          reset({
            email: "",
            firstName: "",
            lastName: "",
            message: "",
            contactNumber: "",
            countryCode:""
          })
        }
      }, [reset, isSubmitSuccessful])


    return (
        
        <div className='bg-black w-[40rem] mx-auto'>
            <form onSubmit={handleSubmit(contactformSubmit)} className='flex flex-col gap-4 p-10' >
                <div className='flex justify-between gap-1'>
                    <div className='flex flex-col'>
                        <label htmlFor="firstName" className=' text-sm text-richblack-25 font-inter font-semibold'>First Name :</label>              
                            <input
                                className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white  m-1'
                                
                                id='firstName'
                                type='string'
                                name='firstName'
                                
                                placeholder='First Name'
                                {...register('firstName',{
                                    required: {value:true , message:"Please enter your First Name"}
                                })}                                
                            />
                            {errors.firstName && (<span className='text-red-500 font-semibold'>{errors.firstName.message}</span>)}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="lastName" className=' text-sm text-richblack-25 font-inter font-semibold'>Last Name :</label>
                            <input
                                className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white  m-1'
                               
                                id='lastName'
                                type='string'
                                name='lastName'
                                
                                placeholder='Last Name'         
                                {...register("lastName")}                      
                            />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="emailid" className=' text-sm text-richblack-25 font-inter font-semibold'>Email Address :</label>
                        <input
                            className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white  m-1'
                         
                            id='emailid'
                            type='email'
                            name='email'
                            
                            placeholder='xyz@gmail.com'
                            {...register("email",{
                                required: {value:true, message:"Please enter your Email address"}
                            })}                                  
                        />
                        {errors.email && (
                            <span className='text-red-500'>{errors.email.message}</span>
                        )}
                </div>

                <div className='flex flex-col'>
                    <label className="text-sm text-richblack-25 font-inter font-semibold w-full ">Phone Number :</label>

                    <div className='flex  gap-3'>
                            
                        <select
                            className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white w-[5.5rem] m-1'
                            placeholder='+91'
                            name='countryCode'
                            id='countryCode' 
                            {...register("countryCode")}              
                        >
                            {
                                CountryCodes.map((countryCode,index) => (
                                    <option key={index} value={countryCode.code}>
                                        {countryCode.code} -{countryCode.country}                                
                                    </option>
                                ))
                            }
                        </select>
                        <input
                            className='border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white w-full m-1'
                           
                            type='tel'
                            id='contactNumber'
                            name='contactNumber'
                            placeholder='987654321'
                            {...register("contactNumber",{
                                required:{value:true, message:"Enter your phone number"},
                                maxLength:{value:10, message:"Phone No. should have 10 digits"},
                                minLength:{value:10, message:"Phone No. should have 10 digits"}
                            })}
                        />
                        
                    </div>
                    {errors.contactNumber && (<span className='text-red-500'>{errors.contactNumber.message}</span>)}
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="message" className=" text-sm text-richblack-25 font-inter font-semibold">Message :</label>
                        <textarea
                            name="message"
                            id="message"
                            cols="30"
                            rows="7"
                            placeholder="Enter your message here"
                            className="form-style border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white  m-1"
                            {...register("message", { 
                                required:{value:true, message:"Please enter your message"},
                                maxLength:{value:500, message:"Message could have maximum 500 characters"}
                            })}
                        />
                        {errors.message && (<span className='text-red-500'>{errors.message.message}</span>)}

                </div>
                <button
                    type='submit'
                    className='border-1px border-blue-500 rounded-md px-4 py-2 bg-blue-200 text-white  m-1 my-[4rem] mx-auto w-full'
                >
                    Send Message
                </button>

            </form>
            
            
        </div>
    );
};

export default ContactUsform;