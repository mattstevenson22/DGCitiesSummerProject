import {useEffect, useState, useRef} from "react";
import LoginPopup from "./LoginPopup";

export default function Title() {

  const [loginPopup, setLoginPopup] = useState(false);

  return (
    <>
      <ul>
        <li className="title"> Greenwich Complaints Portal </li>
        <li className="loginButton"> <button className="btn" onClick={()=>{setLoginPopup(true)}}>Log in</button></li>
      </ul>

      <LoginPopup trigger={loginPopup} setTrigger={setLoginPopup} />

    </>
  );
}
