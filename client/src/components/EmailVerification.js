import { useNavigate, useParams } from "react-router-dom";
import verifyEmail from "../requests/verifyEmail";
import { useEffect } from "react";

const EmailVerification = () => {
  const {accessToken} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getResult = async () => {
      const result = await verifyEmail({accessToken: accessToken});
      if (result.error!=undefined) {
        alert(result.error);
        navigate("/signUp")
      } else {
        alert(result);
        navigate("/");
      };
    };
    getResult();
  }); 
};

export default EmailVerification;
