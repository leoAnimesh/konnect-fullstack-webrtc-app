import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Header } from "./components";
import {
  Authenticate,
  Activate,
  Mail,
  Otp,
  PhoneNo,
  UserInfo,
  Home,
  Rooms,
} from "./Pages";
import Eror404 from "./Pages/PageNotFound/Eror404";

const isAuth = false;
const Activated = false;
const user = isAuth && Activated ? true : false;

const ProtectedRoute = ({ children, isAllowed, redirectTo }) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};

const App = () => {
  return (
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
          <Route index element={<UserInfo />} />
        </Route>
        <Route
          path="/rooms"
          element={
            <ProtectedRoute isAllowed={user} redirectTo="/authenticate/">
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
