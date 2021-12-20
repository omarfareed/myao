import SignIn from "./pages/Sign/SignIn";
import { Route, Switch } from "react-router-dom";
import SignUp from "./pages/Sign/SignUp";
import MainPage from "./pages/Home/MainPage";
import SettingPage from "./pages/SettingPage/settingPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Header from "./components/Header/header";
import MarketerPage from "./pages/Marketer/marketerProfile";
function App() {
  return (
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
  );
}

export default App;
