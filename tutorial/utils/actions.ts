"use server";

import { readFile, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//- don't "redirect" place inside "try" block

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export const createUser = async (prevState: any, formData: FormData) => {
  // console.log('creating user....', formData);
  "use server";
  console.log("prevState", prevState);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const rawData = Object.fromEntries(formData);
  // console.log(rawData);
  const newUser: User = { firstName, lastName, id: Date.now().toString() };

  try {
    await saveUser(newUser);
    revalidatePath("/actions");

    // some logic
    return "user created successfully...";
  } catch (error) {
    console.log(error);
    return "failed to create user...";
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  const result = await readFile("users.json", { encoding: "utf8" });
  const users = result ? JSON.parse(result) : [];
  return users;
};

const saveUser = async (user: User) => {
  const users = await fetchUsers();
  users.push(user);
  await writeFile("users.json", JSON.stringify(users));
};

export const deleteUser = async (prevState: any, formData: FormData) => {
  const id = formData.get("id") as string;
  const users = await fetchUsers();
  const updatedUsers = users.filter((user: User) => user.id !== id);
  try {
    await writeFile("users.json", JSON.stringify(updatedUsers));
    revalidatePath("/actions");
    return "User deleted successfully...";
  } catch (error) {
    return "Something went wrong...";
  }
};

export const removeUser = async (id: string, formData: FormData) => {
  const name = formData.get("name") as string;
  console.log('id', id);

  const users = await fetchUsers();
  const updatedUsers = users.filter((user) => user.id !== id);
  await writeFile("users.json", JSON.stringify(updatedUsers));
  revalidatePath("/actions");
};
