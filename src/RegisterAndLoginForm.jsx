import { useContext, useState } from "react";
import api from "./api/axios";
import { UserContext } from "./UserContext.jsx";

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("login");
  const [errMessage, setErrMessage] = useState("");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    let response = null;
    if (isLoginOrRegister == "register") {
      try {
        response = await api.post("register/", { username, email, password });
      } catch (err) {
        console.log(err.response.data);
        return;
      }
    } else {
      try {
        response = await api.post("login/", { username, password });
      } catch (err) {
        setErrMessage(err.response?.data?.detail || "Invalid user credentials");
        return;
      }
    }

    setLoggedInUsername(username);
    setId(response.data.id);
  }
  return (
    <div className="bg-blue-50 flex flex-col items-center">
      {errMessage && (
        <div
          className="alert alert-danger alert-dismissible fade show mt-2 py-1"
          role="alert"
        >
          {errMessage}
          <button
            type="button"
            className="btn-close py-2"
            aria-label="Close"
            onClick={() => setErrMessage("")}
          ></button>
        </div>
      )}

      <div className="bg-blue-50 h-screen flex items-center">
        <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            type="text"
            placeholder="username"
            className="block w-full rounded-sm p-2 mb-2 border"
          />
          {isLoginOrRegister == "register" ? (
            <input
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              type="email"
              placeholder="email"
              className="block w-full rounded-sm p-2 mb-2 border"
            />
          ) : null}
          <input
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            type="password"
            placeholder="password"
            className="block w-full rounded-sm p-2 mb-2 border"
          />
          <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
            {isLoginOrRegister === "register" ? "Register" : "Login"}
          </button>
          <div className="text-center mt-2">
            {isLoginOrRegister === "register" && (
              <div>
                Already a member?
                <button
                  className="ml-1"
                  onClick={() => setIsLoginOrRegister("login")}
                >
                  Login here
                </button>
              </div>
            )}
            {isLoginOrRegister === "login" && (
              <div>
                Don't have an account?
                <button
                  className="ml-1"
                  onClick={() => setIsLoginOrRegister("register")}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
