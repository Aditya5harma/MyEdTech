import React from 'react';
import MyButton from '../../common/MyButton';

const HPBsection = (props) => {
    const heading=props.heading
    const highlighted=props.highlighted
    const content=props.content
    const Primary=props.primary
    const Secondary=props.secondary

    return (
        <div className='p-[2rem] max-w-[50%]'>
            <div className='text-white font-bold font-inter text-[1.5rem]'>{heading}<span className=' bg-gradient-to-r from-blue-200 to-yellow-100 text-transparent bg-clip-text font-bold text-[1.5rem]'>{highlighted}</span></div>
            <p className='text-richblack-100 font-inter text-[0.8rem]'>{content}</p>
            <div className='flex items-center gap-7 my-7'>
                <MyButton text={Primary} link={"/signup"} active={true}></MyButton>
                <MyButton text={Secondary} link = {"/login"} active={false}></MyButton>
            </div>
        </div>
    );
};

export default HPBsection;