import { collection, addDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { db } from "../firebaseConfig";
import { useAuth } from "../store/authContext";
const Chatbox = () => {
  const { user } = useAuth();
  const messageRef = useRef();
  const [animation, setAnimation] = useState("");
  const sendMessage = async (e) => {
    const message = messageRef.current.value;
    messageRef.current.value = "";

    setAnimation("animate-ping");
    setTimeout(() => {
      setAnimation("");
    }, [400]);

    const docRef = await addDoc(collection(db, "text"), {
      uid: user.uid,
      message: message,
      time: new Date().toLocaleString(),
    });
    e.preventDefault();
  };

  return (
    <div className="absolute bottom-0 w-full h-[6%] bg-slate-700 flex items-center px-8 text-white justify-between">
      <input
        type="text"
        className="bg-transparent focus:outline-0 w-[90%] focus"
        placeholder={"Type something here"}
        ref={messageRef}
      />
      <button className={`w-[5%] ${animation}`} onClick={sendMessage}>
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
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Chatbox;
