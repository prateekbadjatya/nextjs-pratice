## More Routing

- Private Folders
  \_folder
- Route Groups
  (dashboard)
- Dynamic Routes

  - [...folder] - Catch-all route segment
  - [[...folder]] Optional catch-all route segment (used by Clerk)

- create test folder app/\_css
- create app/(dashboard)/auth

  - the url is just '/auth'

- create app/(dashboard)/auth/[sign-in]

```ts
const SignInPage = ({ params }: { params: { 'sign-in': string } }) => {
  console.log(params);
  return <div>SignInPage</div>;
};
export default SignInPage;
```

- create app/(dashboard)/auth/[...sign-in]
- create app/(dashboard)/auth/[[...sign-in]]

```ts
const SignInPage = ({ params }: { params: { 'sign-in': string[] } }) => {
  console.log(params);
  console.log(params['sign-in'][1]);
  return <div>SignInPage :{params['sign-in'][1]}</div>;
};
export default SignInPage;
```

## Server Actions

- asynchronous server functions that can be called directly from your components.

- typical setup for server state mutations (create, update, delete)

  - endpoint on the server (api route on Next.js)
  - make request from the front-end
    - setup form, handle submission etc

- Next.js server actions allow you to mutate server state directly from within a React component by defining server-side logic alongside client-side interactions.

Rules :

- must be async
- add 'use server' in function body (only in RSC)
- can use in RCC but only as import

RSC - React Server Component
RCC - React Client Component

```tsx
export default function ServerComponent() {
  async function myAction(formData) {
    'use server';
    // access input values with formData
    // formData.get('name')
    // mutate data (server)
    // revalidate cache
  }

  return <form action={myAction}>...</form>;
}
```

- or setup in a separate file ('use server' at the top)
  - can use in both (RSC and RCC)

utils/actions.js

```tsx
'use server';

export async function myAction() {
  // ...
}
```

```tsx
'use client';

import { myAction } from './actions';

export default function ClientComponent() {
  return (
    <form action={myAction}>
      <button type='submit'>Add to Cart</button>
    </form>
  );
}
```

## Actions Page - Setup

- create Form and UsersList in components

```tsx
import Form from '@/components/Form';
import UsersList from '@/components/UsersList';

function ActionsPage() {
  return (
    <>
      <Form />
      <UsersList />
    </>
  );
}
export default ActionsPage;
```

## Form - Setup

```tsx
const createUser = async () => {
  'use server';
  console.log('creating user....');
};

function Form() {
  return (
    <form action={createUser} className={formStyle}>
      <h2 className='text-2xl capitalize mb-4'>create user</h2>
      <input
        type='text'
        name='firstName'
        required
        className={inputStyle}
        defaultValue='peter'
      />
      <input
        type='text'
        name='lastName'
        required
        className={inputStyle}
        defaultValue='smith'
      />
      <button type='submit' className={btnStyle}>
        submit
      </button>
    </form>
  );
}
export default Form;

const formStyle = 'max-w-lg flex flex-col gap-y-4  shadow rounded p-8';
const inputStyle = 'border shadow rounded py-2 px-3 text-gray-700';
const btnStyle =
  'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize';
```

## Actions File

- create utils/actions.ts
- make "Form" Client Component ('use client')
- import in Form

```ts
'use server';

export const createUser = async () => {
  console.log('creating user....');
};
```

```tsx
'use client';

import { createUser } from '@/utils/actions';
```

## FormData

```ts
export const createUser = async (formData: FormData) => {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const rawData = Object.fromEntries(formData);
  console.log(rawData);
  console.log({ firstName, lastName });
};
```

## Save User

- just as an example
- create "users.json" (root !!!)
- won't work on vercel (deployment)

```ts
'use server';

import { readFile, writeFile } from 'fs/promises';

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export const createUser = async (formData: FormData) => {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const newUser: User = { firstName, lastName, id: Date.now().toString() };
  await saveUser(newUser);
};

export const fetchUsers = async (): Promise<User[]> => {
  const result = await readFile('users.json', { encoding: 'utf8' });
  const users = result ? JSON.parse(result) : [];
  return users;
};

const saveUser = async (user: User) => {
  const users = await fetchUsers();
  users.push(user);
  await writeFile('users.json', JSON.stringify(users));
};
```

## UsersList

```tsx
import { fetchUsers } from '@/utils/actions';
async function UsersList() {
  const users = await fetchUsers();
  return (
    <div className='mt-4'>
      {users.length ? (
        <div>
          {users.map((user) => (
            <h4 key={user.id} className='capitalize text-lg'>
              {user.firstName} {user.lastName}
            </h4>
          ))}
        </div>
      ) : (
        <p>No users found...</p>
      )}
    </div>
  );
}
export default UsersList;
```

## RevalidatePath

```ts
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createUser = async (formData: FormData) => {
  //...
  revalidatePath('/actions');
};
```

- if the data is displayed in a different page

```ts
export const createUser = async (formData: FormData) => {
  //...
  redirect('/');
};
```

- don't "redirect" place inside "try" block

```tsx
try {
  await saveUser(newUser);
  // will trigger error
  redirect('/');
} catch (error) {
  console.error(error);
}
```

## Pending State

- make sure Form is Client Component
- in createUser switch back to revalidatePath(/actions)

[React Docs - useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus)

- useFormStatus()
- The useFormStatus Hook provides status information of the last form submission.

- The useFormStatus Hook must be called from a component that is rendered inside a <form>.
- useFormStatus will only return status information for a parent <form>.
  It will not return status information for any <form> rendered in that same component or children components.

  ```tsx
  import { useFormStatus, useFormState } from 'react-dom';

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <button type='submit' className={btnStyle} disabled={pending}>
        {pending ? 'submitting...' : 'submit'}
      </button>
    );
  };
  ```

## Result

[React Docs - useFormState](https://react.dev/reference/react-dom/hooks/useFormState)

- useFormState()
- a Hook that allows you to update state based on the result of a form action.

```tsx
const [message, formAction] = useFormState(createUser, null);
return (
  <form action={formAction} className={formStyle}>
    {message && <p>{message}</p>}
    ...
  </form>
);
```

```ts
export const createUser = async (prevState: any, formData: FormData) => {
  // current state of the form
  console.log(prevState);

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const newUser: User = { firstName, lastName, id: Date.now().toString() };

  try {
    await saveUser(newUser);
    revalidatePath('/actions');
    // throw Error();
    return 'user created successfully...';
  } catch (error) {
    console.error(error);
    return 'failed to create user...';
  }
};
```

## Delete User

- create components/DeleteButton
- refactor UsersList

```tsx
function DeleteButton({ id }: { id: string }) {
  return (
    <form>
      <button
        type='submit'
        className='bg-red-500 text-white text-xs rounded p-2'
      >
        delete
      </button>
    </form>
  );
}
export default DeleteButton;
```

```tsx
import { fetchUsers } from '@/utils/actions';
import DeleteButton from './DeleteButton';
async function UsersList() {
  const users = await fetchUsers();
  return (
    <div className='mt-4'>
      {users.length ? (
        <div className='max-w-lg'>
          {users.map((user) => (
            <h4
              key={user.id}
              className='capitalize text-lg flex justify-between items-center mb-2'
            >
              {user.firstName} {user.lastName}
              <DeleteButton id={user.id} />
            </h4>
          ))}
        </div>
      ) : (
        <p>No users found...</p>
      )}
    </div>
  );
}
export default UsersList;
```

## Delete Action

```ts
export const deleteUser = async (formData: FormData) => {
  const id = formData.get('id') as string;
  const users = await fetchUsers();
  const updatedUsers = users.filter((user: User) => user.id !== id);
  await writeFile('users.json', JSON.stringify(updatedUsers));
  revalidatePath('/actions');
};
```

```tsx
import { deleteUser } from '@/utils/actions';

function DeleteButton({ id }: { id: string }) {
  return (
    <form action={deleteUser}>
      <input type='hidden' name='id' value={id} />
      <button
        type='submit'
        className='bg-red-500 text-white text-xs rounded p-2'
      >
        delete
      </button>
    </form>
  );
}
export default DeleteButton;
```

```tsx
import { deleteUser, removeUser } from '@/utils/actions';

function DeleteButton({ id }: { id: string }) {
  const removeUserWithId = removeUser.bind(null, id);
  return (
    <form action={removeUserWithId}>
      <input type='hidden' name='name' value='shakeAndBake' />
      <button
        type='submit'
        className='bg-red-500 text-white text-xs rounded p-2'
      >
        delete
      </button>
    </form>
  );
}
export default DeleteButton;
```

## Bind Option

- An alternative to passing arguments as hidden input fields in the form (e.g. `<input type="hidden" name="userId" value={userId} />`) is to use the bind option. With this approach, the value is not part of the rendered HTML and will not be encoded.

- .bind works in both Server and Client Components. It also supports progressive enhancement.

```ts
export const removeUser = async (id: string, formData: FormData) => {
  const name = formData.get('name') as string;
  console.log(name);

  const users = await fetchUsers();
  const updatedUsers = users.filter((user) => user.id !== id);
  await writeFile('users.json', JSON.stringify(updatedUsers));
  revalidatePath('/actions');
};
```

## Route Handlers

- install Thunder Client

Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs.

- in app create folder "api"
- in there create folder "users" with route.ts file

The following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS. If an unsupported method is called, Next.js will return a 405 Method Not Allowed response.

In addition to supporting native Request and Response. Next.js extends them with NextRequest and NextResponse to provide convenient helpers for advanced use cases.

app/api/users/route.ts

```ts
// the following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS. If an unsupported method is called, Next.js will return a 405 Method Not Allowed response.

import { NextRequest, NextResponse } from 'next/server';
import { fetchUsers, saveUser } from '@/utils/actions';

export const GET = async () => {
  const users = await fetchUsers();
  return Response.json({ users });
};

export const POST = async (request: Request) => {
  const user = await request.json();
  const newUser = { ...user, id: Date.now().toString() };
  await saveUser(newUser);
  return Response.json({ msg: 'user created' });
};
```

```ts
import { fetchUsers, saveUser } from '@/utils/actions';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  console.log(id);

  const users = await fetchUsers();
  return Response.json({ users });
};
```

```ts
import { fetchUsers, saveUser } from '@/utils/actions';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  console.log(request.url);
  console.log(request.nextUrl.searchParams.get('id'));

  const users = await fetchUsers();
  return NextResponse.redirect(new URL('/', request.url));
};
```

The URL constructor takes two arguments: url and base. If the url is a relative URL, then base is required. If url is an absolute URL, then base is ignored.

Here, '/' is the url and request.url is the base.

This means it's creating a new URL object that represents the root of the URL contained in request.url.

For example, if request.url is 'http://example.com/path/to/resource', the new URL object would represent 'http://example.com/'.

## Middleware

[Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)

Middleware in Next.js is a piece of code that allows you to perform actions before a request is completed and modify the response accordingly.

- create middleware.ts in the root
- by default will be invoked for every route in your project

```ts
export function middleware(request) {
  return Response.json({ msg: 'hello there' });
}

export const config = {
  matcher: '/about',
};
```

```ts
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/about/:path*', '/tours/:path*'],
};
```

## Local Build

- cleanup middleware
- fix css in UsersList.tsx
- remove all users from 'users.json'
- 'npm run build' followed by 'npm start'

## Caching

- [Vercel Video](https://www.youtube.com/watch?v=VBlSe8tvg4U)
- [Docs](https://nextjs.org/docs/app/building-your-application/caching)