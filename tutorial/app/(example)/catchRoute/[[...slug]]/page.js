import React from 'react'

/*
  app/
├── (example)/
│   ├── catchRoute/
│   │   └── [[...slug]]
                  └── page.js
│   ├── page.js // now if we remove this example page.js and when we navigate to /auth it will show [[...slug]] page.js content
*/

// http://localhost:3000/catchRoute



const CatchRoute = () => {
  return (
    <div>CatchRoute</div>
  )
}

export default CatchRoute