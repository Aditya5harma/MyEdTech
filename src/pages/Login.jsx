import React from 'react';
import AuthTamplate from '../components/core/authorisation/AuthTamplate';
import LoginForm from '../components/core/authorisation/LoginForm';

const Login = () => {
    return (
        <div>
            <AuthTamplate form={<LoginForm></LoginForm>}></AuthTamplate> 
        </div>
    );
};

export default Login;