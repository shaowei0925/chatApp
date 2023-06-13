const Text = (props) => {
  return (
    <div className="bg-gradient-to-t from-[#50C9C3] to-[#96DEDA] w-fit h-fit py-2 px-6 rounded-3xl text-[0.9rem] mt-2">
      {/* {props.message} */}
      <p>{props.message}</p>
    </div>
  );
};

export default Text;
