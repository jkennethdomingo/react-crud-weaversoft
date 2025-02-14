import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const storedTheme = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(storedTheme);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      localStorage.setItem("darkMode", !prevMode);
      return !prevMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: darkMode ? "#8aa2b6" : "#1f2937" }, // Muted blue-gray for better contrast
          secondary: { main: darkMode ? "#f5a3b8" : "#dc2626" }, // Softer red in dark mode
          background: {
            default: darkMode ? "#18181b" : "#fafafa", // Dark gray instead of pure black, softer white
            paper: darkMode ? "#1f1f23" : "#ffffff", // Card-like surface
          },
          text: {
            primary: darkMode ? "#e4e4e7" : "#1e1e1e", // Off-white text in dark mode
            secondary: darkMode ? "#a1a1aa" : "#6b7280", // Softer gray for less important text
          },
        },
        typography: {
          fontFamily: "'Poppins', sans-serif",
        },
      }),
    [darkMode]
  );
  

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use ThemeContext
export const useThemeContext = () => useContext(ThemeContext);
