import React, { useEffect } from "react";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./Login";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

export default function Body() {
    const dispatch = useDispatch()
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/time",
      element: <Browse />,
    },
  ]);

  return (
    <div className="h-full">
      <RouterProvider router={appRouter} />
    </div>
  );
}
