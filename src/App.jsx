import Login from "./components/Login";
import Register from "./components/Register";
import { useAuth } from "./store/authContext";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ResetPassword, { Backdrop } from "./components/ResetPassword";
import ConversationPage from "./components/ConversationPage";

function App() {
  const { user } = useAuth();
  const [backdrop, setBackdrop] = useState(false);

  const toggleBackdrop = () => {
    setBackdrop(!backdrop);
  };

  return (
    <div className="flex justify-center">
      {backdrop && <Backdrop toggleBackdrop={toggleBackdrop} />}
      {backdrop && <ResetPassword onSubmit={toggleBackdrop} />}
      <Routes>
        <Route
          path="/"
          element={
            user ? <ConversationPage /> : <Login onReset={toggleBackdrop} />
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
