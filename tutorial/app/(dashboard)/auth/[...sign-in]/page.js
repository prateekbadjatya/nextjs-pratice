import React from "react";

const SignInPage = ({ params }) => {
  console.log(params);
  console.log(params["sign-in"][1]);
  return <div>SignInPage :{params["sign-in"][1]}</div>;
};
export default SignInPage;
