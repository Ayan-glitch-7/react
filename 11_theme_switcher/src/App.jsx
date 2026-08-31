import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./contexts/Theme";
import ThemeBtn from "./components/ThemeBtn";
import Card from "./components/Card";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div className="min-h-screen bg-gray-100 py-8 dark:bg-gray-900">
        <div className="w-full">
          <div className="mx-auto mb-4 flex w-full max-w-sm justify-end">
            <ThemeBtn />
          </div>

          <div className="mx-auto w-full max-w-sm">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
