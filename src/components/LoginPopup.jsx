import { useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import api from "../api/complaints";

export default function LoginPopup(props) {
  
  const { setAuth } = useContext(AuthContext);

  const [user, setUser] = useState("");

  const [pwd, setPwd] = useState("");

  const [success, setSuccess] = useState(false);


  // actual handle submit

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await api.post(
  //       "/auth",
  //       JSON.stringify({ username: user, password: pwd }),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       }
  //     );
  //     // get response data back using response.data
  //     const accessToken = response.data.accessToken;
  //     setAuth({ user, pwd, accessToken });
  //     setUser("");
  //     setPwd("");
  //     setSuccess(true);
  //   } catch (err) {
  //     // see tutorial
  //   }
  // };

  // testing handle submit
  const handleSubmit = async (e) => {
      e.preventDefault();
      setUser("");
      setPwd("");
      setSuccess(true);
    };

  return props.trigger ? (
    <div className="login-box">
      {success ? (
        <>
          <p> success </p>
          <button className="login-close-btn" onClick={() => props.setTrigger(false)}>
            Close
          </button>
        </>
      ) : (
        <>
          <p className="PopupTitleText"> Please log in: </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="login-regular-text">Username:</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password" className="login-regular-text">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button className="login-btn"> Log In </button>
          </form>
          <button className="login-close-btn" onClick={() => props.setTrigger(false)}>
            Close
          </button>
        </>
      )}
    </div>
  ) : (
    ""
  );
}
