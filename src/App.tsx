import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import useAuthStore from "./store/auth.store";

import AuthSigninPage from "./pages/auth_sign_in.page";
import AuthSignupPage from "./pages/auth_sign_up.page";
import HomePage from "./pages/home.page";
import NoPage from "./pages/no.page";

import "./App.css";

function App() {
  const { isAuthenticated } = useAuthStore();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/" /> : <AuthSigninPage />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <AuthSignupPage />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
