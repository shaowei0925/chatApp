import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./store/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
