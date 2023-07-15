import React from 'react';
import { Link } from 'react-router-dom';

const MyButton = (props) => {
    const text = props.text
    const active = props.active
    const path = props.link

    return (
        <div>
            {
                active && <Link to={path}
                    className="relative  items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-blue-300 rounded-full hover:bg-white group">
                        <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">{text}</span>
                    
                </Link>
                    
            
            }

            {
                !active && <Link to ={path}
                    className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group">
                        <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-richblack-800">{text}</span>
                        <span className="absolute inset-0 border-2 border-white rounded-full"></span>
                    
                </Link>
            }
        </div>

    );
};

export default MyButton;