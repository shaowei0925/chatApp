import { Link } from "react-router-dom";
import { useAuth } from "../store/authContext";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const navigate = useNavigate();
  const { loginWithGoogle, login } = useAuth();
  const submitHandler = async (e) => {
    const valid = e.target[0].value;
    const data = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    if (valid) {
      login(data);
    }
    e.preventDefault();
  };

  return (
    <div className="bg-white flex flex-col min-w-[500px] py-12 items-center justify-center gap-6 rounded-3xl mt-8">
      <h1 className="font-bold text-[2rem] text-[#141E30]">
        Welcome to TikTalk!
      </h1>
      <form
        className="w-3/4 flex flex-col justify-center items-center"
        onSubmit={submitHandler}
      >
        <div className="flex justify-between items-center px-8 relative w-full mb-6 border border-[#243B55] rounded-full py-2 group hover:ring-1 hover:ring-[#243B55]">
          <input
            name="email"
            type="email"
            className="font-medium w-full block mt-2 py-2 text-sm text-[#243B55] bg-transparent appearance-none focus:outline-none peer"
            placeholder=" "
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
          />
          <label className="absolute text-md text-[#243B55] duration-200 transform -translate-y-3 scale-75 top-4 peer-focus:scale-75 peer-focus:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:font-normal peer-placeholder-shown:translate-y-0">
            Password
          </label>
        </div>
        <div className="justify-left w-full">
          <button
            className="underline hover:text-yellow-500"
            onClick={() => {
              props.onReset();
            }}
          >
            Forgot your password?
          </button>
        </div>

        <button className="w-full my-4 font-mono font-medium text-lg  py-3 bg-gradient-to-r from-[#141E30] to-[#243B55] text-white rounded-full hover:ring-[#243B55] hover:ring-2 hover:bg-gradient-to-t hover:text-yellow-200">
          Sign In
        </button>
        <div className="flex gap-3">
          <p>Don't have an account? </p>
          <Link to="/register" className="underline hover:text-yellow-500">
            Sign up now
          </Link>
        </div>
      </form>
      <button
        className="flex items-center justify-center gap-8 mt-2 border-2 border-[#243B55] w-3/4 rounded-full py-2 hover:ring-1 hover:ring[#243B55]"
        onClick={loginWithGoogle}
      >
        <img src="./google.png" alt="google" className="w-10 h-10" />
        <p className="font-medium">Sign in with Google</p>
      </button>
    </div>
  );
};

export default Login;
