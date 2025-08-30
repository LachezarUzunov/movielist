import './App.css';
import { Routes, Route } from 'react-router-dom';
import { UploadPage } from "@/pages/UploadPage/UploadPage.tsx";
import { PreviewPage } from '@/pages/PreviewPage/PreviewPage.tsx';
import {RegisterPage} from "@/pages/Authentication/RegisterPage.tsx";

function App() {

    return (
        <Routes>
            <Route path='/' element={<UploadPage />} />
            <Route path='/preview' element={<PreviewPage />}/>
            <Route path='/register' element={<RegisterPage />}/>
        </Routes>
    )
}

export default App
