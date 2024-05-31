import {useEffect, useState, useRef} from "react";

export default function Title() {

  //var to store whether login popup is shown or not
  const [loginPopup, setLoginPopup] = useState(false);

  const [user, setUser] = useState('');

  const [pwd, setPwd] = useState('');

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user,pwd);
    setUser('');
    setPwd('');
    setSuccess(true);
  }


  // login popup itself
  function LoginPopup(props) {

    return (props.trigger) ? (
        <div className="login-box">

          {success ? (
            <>
            <p> success </p>
            <button className="btn" onClick={() => props.setTrigger(false)}>Close</button>
            </>
          ) : (
          <>
          <p className="PopupTitleText"> Please log in: </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required 
            />

            <label htmlFor="password">Password:</label>
            <input 
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required 
            />
            <button> Log In </button>
          </form>
          <button className="btn" onClick={() => props.setTrigger(false)}>Close</button>
          </>
          )}
        </div>
    ) : "";
  }

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
