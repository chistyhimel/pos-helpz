import React, { useContext } from "react";
import { UserContext } from "../../App";
import DataInput from "../DataInput/DataInput";

import ProductViewTable from "../ProductViewTable/ProductViewTable";
import "./Home.css";
const Home = () => {
  const { value1, value2 } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = value2;
  console.log(loggedInUser);
  return (
    <div className="homeBody">
      <DataInput />
      <ProductViewTable />
    </div>
  );
};

export default Home;
