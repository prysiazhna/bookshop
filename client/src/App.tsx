import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/Main";
import Layout from './Layout';
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";

// const isAuthenticated = () => {
//     return localStorage.getItem('authToken') !== null;
// };
//
// const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
//     return isAuthenticated() ? <>{element}</> : <Navigate to="/signin" />;
// };
function App() {
  return (
      <Router>
          <Layout>
              <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/admin/*" element={<AdminPanel />} />
                  <Route path="/user/profile" element={<Profile />} />
              </Routes>
          </Layout>
      </Router>
  );
}

export default App;
