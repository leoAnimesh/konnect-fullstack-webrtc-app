import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Header } from "./components";
import {
  Authenticate,
  Activate,
  Mail,
  Otp,
  PhoneNo,
  Home,
  Rooms,
  UserName,
  UserPhoto,
} from "./Pages";
import Eror404 from "./Pages/PageNotFound/Eror404";
import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/Loader/Loader";

const ProtectedRoute = ({ children, isAllowed, redirectTo }) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};

const App = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  let Activated = false;
  if (user) {
    Activated = user.activated;
  }
  const { loading } = useLoadingWithRefresh();
  return loading ? (
    <Loader />
  ) : (
    <div className="container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAllowed={!isAuth} redirectTo="/activate/">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authenticate"
          element={
            <ProtectedRoute isAllowed={!isAuth} redirectTo="/activate/">
              <Authenticate />
            </ProtectedRoute>
          }
        >
          <Route index element={<Mail />} />
          <Route path="phone" element={<PhoneNo />} />
          <Route path="otp" element={<Otp />} />
        </Route>
        <Route
          path="/activate"
          element={
            <ProtectedRoute
              isAllowed={isAuth && !Activated}
              redirectTo="/rooms"
            >
              <Activate />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserName />} />
          <Route path="userphoto" element={<UserPhoto />} />
        </Route>
        <Route
          path="/rooms"
          element={
            <ProtectedRoute
              isAllowed={isAuth && Activated}
              redirectTo="/authenticate/"
            >
              <Rooms />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Eror404 />} />
      </Routes>
    </div>
  );
};

export default App;
