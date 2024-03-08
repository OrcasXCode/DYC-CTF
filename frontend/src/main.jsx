import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.jsx'
import './index.css'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from '../Layout.jsx'
import { Success } from './Success.jsx'
import { Register } from './Register.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout></Layout>,
    children:[
      {
        path:"",
        element:<App></App>
      },
      {
        path:"/success-page",
        element:<Success></Success>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
    ]
  }

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
