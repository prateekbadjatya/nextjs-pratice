import React from "react";
import { useFormStatus } from "react-dom";

const btnStyle =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={btnStyle} disabled={pending}>
      {pending ? "submitting..." : "submit"}
    </button>
  );
};

export default SubmitButton;


/*
- useFormStatus()

- The useFormStatus Hook provides status information of the last form submission.

- Important ----> The useFormStatus Hook must be called from a component that is rendered inside a <form>.

- useFormStatus will only return status information for a parent <form>.
  It will not return status information for any <form> rendered in that same component or children components.


  [React Docs - useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus)
*/