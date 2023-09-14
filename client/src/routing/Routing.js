import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../components/authentication/SignIn";
import SignUp from "../components/authentication/SignUp";
import ForgotPassword from "../components/authentication/ForgotPassword";
import HomePage from "../components/homePage/HomePage";
import EmailVerification from "../components/EmailVerification";
import DemoHomePage from "../components/demo/DemoHomePage";

const Routing = () => {
  return (
      <BrowserRouter>
        <Routes>        
          <Route path="/" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/emailVerification/:accessToken" element={<EmailVerification />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/demoHomePage" element={<DemoHomePage />} />
          <Route path="/*" element={<h1>ERROR 404</h1>} />
        </Routes>
      </BrowserRouter>
  );
}

export default Routing;
