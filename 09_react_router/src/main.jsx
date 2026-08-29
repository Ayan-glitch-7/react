import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/home/Home.jsx";
import AboutUs from "./components/aboutUs/AboutUs.jsx";
import ContactUs from "./components/contactUs/ContactUs.jsx";
import User from "./components/user/User.jsx";
import Github, { githubInfoLoader } from "./components/github/Github.jsx";

/* 1st method: */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "a",
        element: <AboutUs />,
      },
      {
        path: "c",
        element: <ContactUs />,
      },
      {
        path: "u/:userid",
        element: <User />,
      },
      {
        path: "g",
        element: <Github />,
        loader: githubInfoLoader,
      },
    ],
  },
]);

/* 2nd method: */
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route path="" element={<Home />}></Route>
//       <Route path="a" element={<AboutUs />}></Route>
//       <Route path="c" element={<ContactUs />}></Route>
//     </Route>,
//   ),
// );

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
