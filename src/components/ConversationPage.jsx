import Header from "./Header";
import ChatBubble from "./ChatBubble/ChatBubble";
import Chatbox from "./Chatbox";
import { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../store/authContext";
const ConversationPage = () => {
  const { user } = useAuth();
  const [convo, setConvo] = useState([]);
  const bottomRef = useRef();
  const sortByDate = (arr) => {
    const sorter = (a, b) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    };
    arr.sort(sorter);
  };

  const groupConvo = (arr) => {
    let big = [];
    let small = [];
    let pre = arr[0].uid;
    arr.forEach((a) => {
      if (a.uid !== pre) {
        big.push(small);
        small = [];
      }
      small.push(a);
      pre = a.uid;
    });
    if (small) {
      big.push(small);
    }

    return big;
  };

  useEffect(() => {
    onSnapshot(query(collection(db, "text")), (snapshot) => {
      let temp = [];
      snapshot.forEach((doc) => {
        temp.push(doc.data());
      });
      sortByDate(temp);
      setConvo(groupConvo(temp));
    });
  }, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [convo]);

  return (
    <div className="relative w-1/2 h-screen bg-gradient-to-t from-[#536976]  to-[#292E49] overflow-x-hidden min-w-[500px]">
      <Header />
      <div className="h-[88%] min-h-max overflow-y-auto py-4 scroll-smooth">
        {convo.map((message, index) => {
          if (message[0].uid == user.uid) {
            if (index === convo.length - 1) {
              return (
                <div key={index} ref={bottomRef}>
                  <ChatBubble
                    dp={"./dp2.jpg"}
                    reversed={true}
                    convo={message}
                  />
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <ChatBubble
                    dp={"./dp2.jpg"}
                    reversed={true}
                    convo={message}
                  />
                </div>
              );
            }
          } else {
            if (index === convo.length - 1) {
              return (
                <div key={index} ref={bottomRef}>
                  <ChatBubble
                    dp={"./dp.jpg"}
                    reversed={false}
                    convo={message}
                  />
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <ChatBubble
                    dp={"./dp.jpg"}
                    reversed={false}
                    convo={message}
                  />
                </div>
              );
            }
          }
        })}
      </div>
      <Chatbox />
    </div>
  );
};

export default ConversationPage;
