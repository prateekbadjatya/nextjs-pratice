"use client";
import { deleteUser, removeUser } from "@/utils/actions";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

// ## Bind Option

// - An alternative to passing arguments as hidden input fields in the form (e.g. `<input type="hidden" name="userId" value={userId} />`) is to use the bind option. With this approach, the value is not part of the rendered HTML and will not be encoded.

// - .bind works in both Server and Client Components. It also supports progressive enhancement.
function DeleteButton({ id }: { id: string }) {
  const { pending } = useFormStatus();

  const removeUserWithId = removeUser.bind(null, id);
  return (
    <form action={removeUserWithId}>
      <button
        disabled={pending}
        type="submit"
        className="bg-red-500 text-white text-xs rounded p-2"
      >
        {pending ? "deleting..." : "delete"}
      </button>
    </form>
  );
}
export default DeleteButton;

// function DeleteButton({ id }: { id: string }) {
//   const { pending } = useFormStatus();
//   const [message, formAction] = useFormState(deleteUser, null);

//   return (
//     <form action={formAction}>
//       <input type="hidden" name="id" value={id} />
//       <button
//         disabled={pending}
//         type="submit"
//         className="bg-red-500 text-white text-xs rounded p-2"
//       >
//         {pending ? "deleting..." : "delete"}
//       </button>
//     </form>
//   );
// }
// export default DeleteButton;
