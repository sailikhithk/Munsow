import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const Login = React.lazy(() => import("../src/components/LoginPage"));

const App = () => {
  return (
    <>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/" name="Login Page" element={<Login />} />
          
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
