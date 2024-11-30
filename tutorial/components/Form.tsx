"use client";
import { createUser } from "@/utils/actions";
import React from "react";
import { useFormState } from "react-dom";
import SubmitButton from "./submitButton";

const formStyle = "max-w-lg flex flex-col gap-y-4  shadow rounded p-8";
const inputStyle = "border shadow rounded py-2 px-3 text-gray-700";

// - useFormState()
// - a Hook that allows you to update state based on the result of a form action.

function Form() {
  //whatever we return from createUser is come in message
  //second argument null is initialValue in createUser irt will be first argument
  const [message, formAction] = useFormState(createUser, null);

  console.log("message", message);
  return (
    <form action={formAction} className={formStyle}>
      {message && <p>{message}</p>}
      <h2 className="text-2xl capitalize mb-4">create user</h2>
      <input
        type="text"
        name="firstName"
        required
        className={inputStyle}
        defaultValue="Prateek"
      />
      <input
        type="text"
        name="lastName"
        required
        className={inputStyle}
        defaultValue="Badjatya"
      />
      <SubmitButton />
    </form>
  );
}
export default Form;
