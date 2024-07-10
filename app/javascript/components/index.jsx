import React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from "../components/Home";
import { User } from "../components/User";
import { Games } from "../components/Games";
import { Game } from "../components/Game";
import { Session } from "../components/Session";
import { Login } from "../components/Login";
import { Error } from "../components/Error";
import { Players } from "../components/Players";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Games />
      },
      {
        path: "user",
        element: <User />
      },
      {
        path: "players",
        element: <Players />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "games/:game_id",
        element: <Game />,
        children: [
          {
            path: "sessions/:session_id",
            element: <Session />
          },
        ]
      }   
    ]
  }
])

ReactDOM.createRoot(document.body.appendChild(document.createElement("root"))).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);