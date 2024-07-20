
import './App.css'
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:1500/api/";
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
  "x-auth-token"
);
function App() {

  return (
    <>
      <div>
        {"Hello world"}
      </div>
    </>
  )
}

export default App
