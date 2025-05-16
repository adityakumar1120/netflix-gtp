import React from 'react'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './Login'

export default function Body() {
    const appRouter  = createBrowserRouter([
        {
            path : '/',
            element : <Login/>
        },
        {
            path : '/browse',
            element : <Browse/>
        },
    ])
  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}
