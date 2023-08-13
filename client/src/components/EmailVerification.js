import { useNavigate, useParams } from "react-router-dom";
import verifyEmail from "../requests/verifyEmail";
import { useEffect } from "react";
import { toast } from 'react-toastify';

const EmailVerification = () => {
  const {accessToken} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getResult = async () => {
      const result = await verifyEmail({accessToken: accessToken});
      if (result.error!=undefined) {
        toast.error(result.error, {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        navigate("/signUp")
      } else {
        toast.success(result, {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        navigate("/");
      };
    };
    getResult();
  }); 
};

export default EmailVerification;
