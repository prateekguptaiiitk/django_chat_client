import api from "./api/axios";
import {UserContextProvider} from "./UserContext";
import Routes from "./Routes";

function App() {
  api.xsrfCookieName = 'csrftoken';
  api.xsrfHeaderName = 'X-CSRFToken';
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  )
}

export default App
