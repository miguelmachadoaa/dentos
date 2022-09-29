import React, { useState } from 'react';

import PropTypes from 'prop-types';

import useToken from '../../components/App/useToken';

import './Login.css';

import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

async function loginUser(credentials) {

   return fetch('http://localhost:8000/api/login', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(credentials)
   })
     .then(data => data.json())
  }



export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState();

  const [password, setPassword] = useState();

  const [mensaje, setMensaje] = useState();

  const { token, setToken, logout } = useToken();


  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });

  const linkDashboard = async e => {
    navigate('/dashboard');
  }

    if(!token.error){

      console.log('token');
      console.log(token);

      setToken(token)

      linkDashboard();

      setMensaje('Login Satisfactorio');

    }else{

      console.log('error');
      console.log(token);

      setMensaje('Credenciales Incorrectas');
      

    }
    
  }


  return(
    <>
    <section class="bg-gray-50 ">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Acceder a tu cuenta
              </h1>
              <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="required" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="required" />
                  </div>
                 
                  <button type="submit" class="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>

                  <p class="text-sm font-light text-gray-500 ">
                      No Tienes un cuenta? <a href="/registro" class="font-medium text-gray-600 hover:underline ">Registrate</a>
                  </p>

                  <p class="text-sm font-light text-red-500 ">{mensaje}</p>
              </form>
          </div>
      </div>
  </div>
</section>


















    </>

  )
}


Login.propTypes = {
  setToken: PropTypes.func.isRequired
}