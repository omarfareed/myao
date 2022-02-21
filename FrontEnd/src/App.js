import SignIn from "./pages/Sign/SignIn";
import SignUp from "./pages/Sign/SignUp";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import MainPage from "./pages/Home/MainPage";
import SettingPage from "./pages/SettingPage/settingPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Header from "./components/Header/header";
import getMe from "./Store/Thunk/getMe";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import SearchPage from "./pages/SearchPage/SearchPage";
// import FriendRequestPage from "./pages/FriendRequests/FriendRequestPage";
// import FavPosts from "./pages/favPosts/favPosts";
// import ReportedSurf from "./pages/ReportedSurf/ReportedSurf";
// import ReportedPost from "./pages/ReportedSurf/ReportedPosts";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const loadingUser = useSelector((state) => state.reducer.loadingUser);
  const { isAuth, user } = useSelector((state) => state.reducer);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  useEffect(() => {
    const locationPath = location.pathname;
    if (loadingUser) return;
    if (locationPath.match(/login|signup/)) {
      if (isAuth) history.push("/");
      return;
    } else if (!isAuth) {
      history.push("/login");
      return;
    }
    // if (!loadingUser)
    //   if (
    //     isAuth &&
    //     (locationPath.includes("/login") || locationPath.includes("/signup"))
    //   ) {
    //     if (user.role === "admin") history.push("/admin/users");
    //     else history.push("/");
    //   } else if (
    //     !isAuth &&
    //     !locationPath.includes("/login") &&
    //     !locationPath.includes("/signup")
    //   )
    //     history.push("/login");
    //   else {
    //     if (user.role === "user" && locationPath.includes("admin"))
    //       history.push("/");
    //   }
    // if (user.role === "admin" && locationPath === "/")
    //   history.push("/admin/users");
  }, [history, isAuth, loadingUser, location.pathname, user.role]);
  return (
    <>
      {loadingUser ? null : (
        <>
          {isAuth && <Header />}
          <Switch>
            <Route path="/" exact>
              <MainPage />
            </Route>
            <Route path="/login">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/profile/:id">
              <ProfilePage />
            </Route>
            <Route path="/setting">
              <SettingPage />
            </Route>
            {/*
            <Route path="/search/:search">
              <SearchPage />
            </Route>
            <Route path="/fav">
              <FavPosts />
            </Route>
            <Route path="/requests">
              <FriendRequestPage />
            </Route>
            <Route path="/admin/users">
              <ReportedSurf />
            </Route>
            <Route path="/admin/posts">
              <ReportedPost />
            </Route> */}
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
