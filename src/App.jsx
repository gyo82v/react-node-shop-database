import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import {useState, useEffect } from "react"
import Home from "./pages/Home"
import Stock from "./pages/Stock"
import Layout from "./components/layout/Layout"


function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="stock" element={<Stock />} />
    </Route>
  ))

  return (
    <div className="flex flex-col min-h-screen">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
