import { Switch, BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
// import NewOne from "./pages/new"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add" component={AddUser} />
          <Route path="/edit/:id" component={EditUser} />
          {/* <Route path="/new/:id" component={NewOne} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
