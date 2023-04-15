import React from 'react'
import { createRoot } from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import GetContacts from './Components/dashboard/GetContacts';
import RegisterPage from './Components/auth/RegisterPage';
import LoginPage from './Components/auth/LoginPage';
import CreateContact from './Components/scripts/CreateContact';
import GetContactById from './Components/scripts/GetContactById';
import DeleteContact from './Components/scripts/DeleteContacts';
import EditContact from './Components/scripts/EditContact';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<GetContacts />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/createContact' element={<CreateContact />} />
            <Route path='/getContact/:contactId' element={<GetContactById/>} />
            <Route path='/editContact/:contactId' element={<EditContact/>} />
            <Route path='/deleteContact/:contactId' element={<DeleteContact />} />
        </Routes>
    </BrowserRouter>
)