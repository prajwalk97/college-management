
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Router from './Router';
import { createTheme, ThemeProvider } from '@mui/material';
axios.defaults.baseURL = (import.meta.env.VITE_SERVER_URL ?? "http://localhost:1500") + "/api/";
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
  "x-auth-token"
);
const App = () => {
  console.log(import.meta.env.VITE_SERVER_URL);
  const appTheme = createTheme({
    zIndex: {
      drawer: 1200
    }
  })
  return (
    <>
      <ThemeProvider theme={appTheme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
