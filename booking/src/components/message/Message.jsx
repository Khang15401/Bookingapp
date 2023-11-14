import useFetch from "../../hooks/useFetch";
import useFetch1 from "../../hooks/useFetch1";

import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own, friend }) {
  const { data, loading, error } = useFetch("/users/" + friend);
  // console.log(data);
  const getCurrentUser = JSON.parse(localStorage.getItem("user"));
  const imgUser = (getCurrentUser.img);
  // const { data1, loading1, error1 } = useFetch1("/conversations/" + friend);
  // console.log(data1.members);

  return (
    <div className={own ? "message own " : "message"}>
      <div className="messageTop">
        <img
          
          className="messageImg"
          src={own ? imgUser : data.img}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
