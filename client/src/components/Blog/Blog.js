import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from '../../components/Login/Login';

async function buscarPost(datos) {
   return fetch('http://localhost:8000/api/buscar', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(datos)
   })
     .then(data => data.json())
  }

export default function Blog() {

  const [posts, setPosts] = useState([]);
  const [fecha, setFecha] = useState([]);
  const [mensahe, setMensaje] = useState([]);

   useEffect(() => {
      fetch('http://localhost:8000/api/blogs')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

   const handleSubmit  = async e => {

    e.preventDefault();

    const data = await buscarPost({
      fecha,
    });

    if(data){

     setPosts(data.data);

    }else{

      setMensaje('No se encontraron resultados')
    }

  }
 

  return(
    <div>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-2 mx-auto">
        <div class="flex flex-col text-center w-full mb-2">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Listado de Noticias</h1>
      
        </div>
      </div>
    </section>


     <section class="text-gray-600 body-font">
      <div class="container px-5 py-2 mx-auto">
        <div class="flex flex-col text-center w-full mb-2">
          <form onSubmit={handleSubmit}>   
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Buscar</label>
              <div class="relative">
                 
                  <input onChange={e => setFecha(e.target.value)} type="date" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Buscar por fecha" required />
                  
                  <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Buscar</button>

              </div>
          </form>

      
        </div>
      </div>
    </section>

    

    <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-24 mx-auto">
    <div class="-my-8 divide-y-2 divide-gray-100">


     {posts.map((post) => {
         return (
            <div class="py-8 flex flex-wrap md:flex-nowrap" key={post.id}>
              <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span class="font-semibold title-font text-gray-700">{post.created_at}</span>
              </div>
              <div class="md:flex-grow">
                <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">{post.titulo}</h2>
                <p class="leading-relaxed">{post.contenido}</p>
                
              </div>
            </div>
         );
      })}

      
    
    </div>
  </div>
</section>

    </div>

  );
}
