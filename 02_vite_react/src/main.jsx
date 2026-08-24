import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

function MyApp() {
  return (
    <>
      <h1>custom app !</h1>
    </>
  );
}

const ReactElement = {
  type: "a",
  props: {
    href: "https://google.com",
    tsrget: "_blank",
  },
  children: "click me to visit google",
};



createRoot(document.getElementById("root")).render(ReactElement);
