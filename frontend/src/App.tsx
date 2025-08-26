import './App.css';
import { Routes, Route } from 'react-router-dom';
import { UploadPage } from "@/pages/UploadPage/UploadPage.tsx";
import { PreviewPage } from '@/pages/PreviewPage/PreviewPage.tsx';

function App() {

    return (
        <Routes>
            <Route path='/' element={<UploadPage />} />
            <Route path='/preview' element={<PreviewPage />}/>
        </Routes>
    )
}

export default App
