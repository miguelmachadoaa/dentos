import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useToken from '../../components/App/useToken';
import Login from '../../components/Login/Login';


export default function Dashboard() {

  const { token, setToken, logout } = useToken();

  const [posts, setPosts] = useState([]);

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


  if (!token) {
    return <Login setToken={setToken} />;
  }

 

  return(
    <div>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-2 mx-auto">
        <div class="flex flex-col text-center w-full mb-2">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Listado de Noticias del Cliente</h1>
      
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
