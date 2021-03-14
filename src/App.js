import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home/Home";
import Invoice from "./Component/Invoice/Invoice";
import Login from "./Component/Login/Login";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import TestForm from "./Component/TestForm/TestForm";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    if ("user" in localStorage) {
      const user_data = JSON.parse(localStorage["user"]);
      setLoggedInUser(user_data);
    }
  }, []);
  console.log(loggedInUser);

  return (
    <UserContext.Provider
      value={{
        value1: [productInfo, setProductInfo],
        value2: [loggedInUser, setLoggedInUser],
      }}
    >
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              {loggedInUser.email ? <Home /> : <Login />}
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/textform">
              <TestForm />
            </Route>
            <Route path="/invoice">
              <Invoice />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
