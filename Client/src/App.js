import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import { UnauthorizedUser } from "./Pages/UnauthorizedUser/UnauthorizedUser.page";
import { UserNavigator } from "./components/UserNavigator/UserNavigator.comp";

function App() {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <>
        <UnauthorizedUser />
      </>
    );
  } else {
    return (
      <div className="App">
        <UserNavigator />
      </div>
    );
  }
}
export default App;
