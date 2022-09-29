import React, { useState } from 'react';

import useToken from '../../components/App/useToken';

import Login from '../../components/Login/Login';

async function registerUser(credentials) {
   return fetch('http://localhost:8000/api/registro', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(credentials)
   })
     .then(data => data.json())
  }

export default function Registro() {

  const { token, setToken, logout } = useToken();

  const [email, setEmail] = useState();

  const [password, setPassword] = useState();

  const [dob, setDob] = useState();

  const handleSubmit = async e => {

    e.preventDefault();

    const token = await registerUser({
      email,
      password,
      dob,
    });

    setToken(token);
  }


  return(

    <section class="bg-gray-50 ">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                      Crear Cuenta
                  </h1>
                  <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                      <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>

                          <input onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="" />

                      </div>

                      <div>
                          <label for="dob" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>

                          <input onChange={e => setDob(e.target.value)} type="date" name="dob" id="dob" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="2022/09/29" required="" />
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>

                          <input onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                      </div>
                      

                     
                      <button type="submit" class="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Crear Cuenta</button>

                      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                          Si Tienes una cuenta ? <a href="/login" class="font-medium text-primary-600 hover:underline ">Acceder</a>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
    
  );
}
