import React from 'react';

import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import Footer from '../features/footer/footer';

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <AppRoutes className="grow" />
      <Footer />
    </div>
  );
};

export default App;
