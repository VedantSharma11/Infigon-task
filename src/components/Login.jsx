import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPageContainer = styled.div`
  width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  text-align: center;

  h2 {
    color: #007bff;
    margin-top:0;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  label{
    text-align:start;
  }
`;

const LoginInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  
  &:focus {
    border-color: #007bff;
  }
`;

const LoginButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dev.api.infigon.app/auth/signin-with-phone-and-password', {
        phoneNumber,
        password,
      });

      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        toast.success('You are authenticated');
        navigate('/profile');
      } else{
        console.error('Authentication failed:', response.data.error);
      }
    } catch (error) {
      toast.error('Authentication Failed');
      console.error('Error during login:', error);
    }
  };

  return (
    <LoginPageContainer>
    <h2>LOGIN</h2>
    <LoginForm>
      <label>Phone Number:</label>
      <LoginInput
        type="text"
        id="phoneNumber"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <label>Password:</label>
      <LoginInput
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoginButton onClick={handleLoginClick}>Login</LoginButton>
    </LoginForm>
  </LoginPageContainer>
  );
};

export default Login;
