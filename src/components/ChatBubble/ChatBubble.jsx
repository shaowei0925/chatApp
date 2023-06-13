import User from "./User";
import Text from "./Text";

const ChatBubble = (props) => {
  const reverse = props.reversed ? "flex-row-reverse items-end" : "items-start";
  return (
    <div className={`flex w-full mb-4 ${reverse}`}>
      <div className={`flex items-end w-full ${reverse}`}>
        <div>
          <User dp={props.dp} />
        </div>
        <div className={`flex flex-col w-3/5 ${reverse}`}>
          {props.convo.map((doc, index) => {
            return <Text key={index} message={doc.message} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
