import React from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useToken from '../../components/App/useToken';
import Login from '../../components/Login/Login';


async function registerPost(datos) {
   return fetch('http://localhost:8000/api/blogs/'+datos.token, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(datos)
   })
     .then(data => data.json())
  }

export default function AddBlog() {

  const navigate = useNavigate();

  const { token, setToken, logout } = useToken();

  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState([]);
  const [descripcion, setDescripcion] = useState([]);
  const [mensaje, setMensaje] = useState([]);

   useEffect(() => {

    console.log(token);

      fetch('http://localhost:8000/api/blogs/'+token)
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data.data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);


   const handledDashboard = async e => {
    
    navigate('/dashboard');

  }

  const handleSubmit  = async e => {

    e.preventDefault();

    const data = await registerPost({
      titulo,
      descripcion,
      token,
    });

    if(data.token){

      console.log(data.token)

      handledDashboard();

    }else{

      setMensaje(data.mensaje)

    }


  }

  if (!token) {
    return <Login setToken={setToken} />;
  }
 

  return(
    <div>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-2 mx-auto">
        <div class="flex flex-col text-center w-full mb-2">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Agregar Post</h1>

          <Link onClick={handledDashboard} to="/addblog">
          <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Volver al Listado
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </Link>
      
        </div>
      </div>
    </section>


   <section class="bg-gray-50 ">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
              <div class="py-6 px-2 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                      Crear Post
                  </h1>
                  <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                      <div>
                          <label for="Titulo" class="block mb-2 text-sm font-medium text-gray-900 ">Titulo</label>

                          <input onChange={e => setTitulo(e.target.value)} type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Titulo" required="" />

                      </div>

                      <div>
                          <label for="dob" class="block mb-2 text-sm font-medium text-gray-900 ">Descripción</label>

                          <textarea rows="4" onChange={e => setDescripcion(e.target.value)} type="date" name="dob" id="dob" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Contenido" required="" ></textarea>
                      </div>
                     
                      <button type="submit" class="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Crear Post</button>
                      
                  </form>
              </div>
          </div>
      </div>
    </section>







   


    </div>

  );
}
