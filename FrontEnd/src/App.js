import SignIn from "./pages/Sign/SignIn";
import { Route, Switch } from "react-router-dom";
import SignUp from "./pages/Sign/SignUp";
import MainPage from "./pages/Home/MainPage";
import SettingPage from "./pages/SettingPage/settingPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Header from "./components/Header/header";
import MarketerPage from "./pages/Marketer/marketerProfile";
import getMe from "./Store/Thunk/getMe";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const loadingUser = useSelector((state) => state.reducer.loadingUser);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <>
      {loadingUser ? null : (
        <>
          <Header />
          <Switch>
            <Route path="/" exact>
              <MainPage />
            </Route>
            <Route path="/marketer">
              <MainPage />
            </Route>
            <Route path="/login">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/setting">
              <SettingPage />
            </Route>
            <Route path="/profile/marketer">
              <MarketerPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
