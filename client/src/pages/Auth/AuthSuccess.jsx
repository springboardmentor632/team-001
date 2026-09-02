import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const token = params.get("token");
    const user = params.get("user");

    if (token) {
      localStorage.setItem("token", token);

      if (user) {
        localStorage.setItem(
          "user",
          decodeURIComponent(user)
        );
      }

      navigate("/dashboard", {
        replace: true,
      });
    } else {
      navigate("/login", {
        replace: true,
      });
    }
  }, []);

  return <h2>Logging In...</h2>;
}

export default AuthSuccess;