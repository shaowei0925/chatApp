import { useState, useRef, useEffect } from "react";
import { useAuth } from "../store/authContext";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const [samePassword, setSamePassword] = useState(true);

  const alertClass = samePassword ? "" : "border-red-500 ring-1 ring-red-500";

  const changeHandler = () => {
    if (passwordRef.current.value === confirmRef.current.value) {
      setSamePassword(true);
    } else {
      setSamePassword(false);
    }
  };

  const submitHandler = (e) => {
    if (samePassword) {
      const data = {
        display: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
      };
      signup(data);
      navigate("/");
      console.log(data);
    } else {
      console.log("Password doesn't match");
    }
    e.preventDefault();
  };

  return (
    <div className="bg-white flex flex-col w-[500px] py-12 items-center justify-center gap-6 rounded-3xl mt-8">
      <h1 className="font-bold text-[2rem] text-[#141E30]">
        Create an account
      </h1>
      <form
        className="w-3/4 flex flex-col justify-center items-center"
        onSubmit={submitHandler}
      >
        <div className="flex justify-between items-center px-8 relative w-full mb-6 border border-[#243B55] rounded-full py-2 group hover:ring-1 hover:ring-[#243B55]">
          <input
            name="display"
            type="text"
            className="font-medium w-full block mt-2 py-2 text-sm text-[#243B55] bg-transparent appearance-none focus:outline-none peer"
            placeholder=" "
            required
          />
          <label className="absolute text-md text-[#243B55] duration-200 transform -translate-y-3 scale-75 top-4 peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:font-normal peer-placeholder-shown:translate-y-0">
            Display name
          </label>
        </div>
        <div className="flex justify-between items-center px-8 relative w-full mb-6 border border-[#243B55] rounded-full py-2 group hover:ring-1 hover:ring-[#243B55]">
          <input
            name="email"
            type="email"
            className="font-medium w-full block mt-2 py-2 text-sm text-[#243B55] bg-transparent appearance-none focus:outline-none peer"
            placeholder=" "
            required
          />
          <label className="absolute text-md text-[#243B55] duration-200 transform -translate-y-3 scale-75 top-4 peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:font-normal peer-placeholder-shown:translate-y-0">
            Email
          </label>
        </div>
        <div className="flex justify-between items-center px-8 relative w-full mb-6 border border-[#243B55] rounded-full py-2 group hover:ring-1 hover:ring-[#243B55]">
          <input
            name="password"
            type="password"
            className="font-medium w-full block mt-2 py-2 text-sm text-[#243B55] bg-transparent appearance-none focus:outline-none peer"
            placeholder=" "
            required
            ref={passwordRef}
            onChange={changeHandler}
          />
          <label className="absolute text-md text-[#243B55] duration-200 transform -translate-y-3 scale-75 top-4 peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:font-normal peer-placeholder-shown:translate-y-0">
            Password
          </label>
        </div>
        <div
          className={`flex justify-between items-center px-8 relative w-full mb-6 border border-[#243B55] rounded-full py-2 group hover:ring-1 hover:ring-[#243B55] ${alertClass}`}
        >
          <input
            type="password"
            className="font-medium w-full block mt-2 py-2 text-sm text-[#243B55] bg-transparent appearance-none focus:outline-none peer"
            placeholder=" "
            required
            ref={confirmRef}
            onChange={changeHandler}
          />
          <label className="absolute text-md text-[#243B55] duration-200 transform -translate-y-3 scale-75 top-4 peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:font-normal peer-placeholder-shown:translate-y-0">
            Confirm password
          </label>
        </div>

        <button className="w-full my-4 font-mono font-medium text-lg  py-3 bg-gradient-to-r from-[#141E30] to-[#243B55] text-white rounded-full hover:ring-[#243B55] hover:ring-2 hover:bg-gradient-to-t flex justify-center gap-3 items-center">
          <p>TikTalk Now</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Register;
