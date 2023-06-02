import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navigator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return <div>
    <Home />
  </div>;
};

export default Navigator;
