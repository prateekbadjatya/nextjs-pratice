import { NextRequest, NextResponse } from "next/server";
import { fetchUsers, saveUser } from "@/utils/actions";

//end point http://localhost:3000/api/users
// METHOD: GET
// export const GET = async (req: NextRequest) => {
//   const users = await fetchUsers();
//   return Response.json({ users });
// };

//http://localhost:3000/api/users?id=2
// METHOD: GET

// export const GET = async (request: Request) => {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");
//   console.log("id", id);

//   const users = await fetchUsers();
//   return Response.json({ users });
// };

export const GET = async (request: NextRequest) => {
  console.log(request.url);
  console.log(request.nextUrl.searchParams.get("id"));

  const users = await fetchUsers();
  return NextResponse.redirect(new URL("/", request.url));
};


/*

The URL constructor takes two arguments: url and base. If the url is a relative URL, then base is required. If url is an absolute URL, then base is ignored.

Here, '/' is the url and request.url is the base.

This means it's creating a new URL object that represents the root of the URL contained in request.url.

For example, if request.url is 'http://example.com/path/to/resource', the new URL object would represent 'http://example.com/'.



*/



//-----------------------------------------------------------------------------------

//  http://localhost:3000/api/users
// METHOD: POST

export const POST = async (request: Request) => {
  const user = await request.json();
  const newUser = { ...user, id: Date.now().toString() };
  await saveUser(newUser);
  return Response.json({ msg: "user created" });
};
