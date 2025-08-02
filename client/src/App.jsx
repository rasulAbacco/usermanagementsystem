// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenShoes from './pages/MenShoes';
import WomenShoes from './pages/WomenShoes';
import KidsShoes from './pages/KidsShoes';
import Navbar from './components/Navbar';
import NikeLandingPage from './pages/NikeLandingPage';
import UserForm from './pages/UserForm';
import Users from "./pages/UserList";
import EditUser from '../src/components/EditUser'; // adjust path

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users" element={<UserForm />} />

        <Route path="/users/:id" element={<EditUser />} />

        {/* <Route path="/men" element={<MenShoes />} />
        <Route path="/women" element={<WomenShoes />} />
        <Route path="/kids" element={<KidsShoes />} /> */}
      </Routes>
    </>
  );
}

export default App;