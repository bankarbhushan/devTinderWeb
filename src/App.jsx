import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { Provider } from "react-redux";
import appStore from "../src/utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connection from "./components/Connection";
import Request from "./components/Request";
import Subscription from "./components/Subscription";
import PayementSuccess from "./components/PayementSuccess";
import Chat from "./components/Chat";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/connections" element={<Connection />}></Route>
              <Route path="/request" element={<Request />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/subscriptions" element={<Subscription />}></Route>
              <Route path="/chat/:touser" element={<Chat />}></Route>
              <Route
                path="/paymentsucess"
                element={<PayementSuccess />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
