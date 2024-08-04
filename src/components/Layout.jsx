// import React from 'react';
// import Navbar from './Navbar';

// function Layout({ children }) {
//     console.log('ngntd')
//     return (
//     <div>
//       <Navbar />
//       <main>
//         {children}
//       </main>
//     </div>
//   );
// }

// export default Layout;

// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
