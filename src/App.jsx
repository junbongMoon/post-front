// ============================================================
// 파일 위치: src/App.jsx
// 역할: 최상위 컴포넌트. URL에 따라 어떤 페이지를 보여줄지 결정합니다.
//       Django의 urls.py와 같은 역할입니다.
//       react-router-dom 라이브러리를 사용하여 기능 구현
// ============================================================

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import BoardListPage from './pages/BoardListPage';
import BoardDetailPage from './pages/BoardDetailPage';

function App() {
    return (
        <>
            {/* URL 변경을 감지하는 최상위 컨테이너 */}
            <BrowserRouter>
                {/* 모든 페이지에서 항상 보이는 네비게이션바 */}
                <Navbar />

                {/* 현재 URL에 맞는 Route 하나만 렌더링 되도록 */}
                <Routes>
                    <Route path="/" element={<BoardListPage />} />
                    <Route path="/posts/:id" element={<BoardDetailPage />} />
                    <Route />
                    <Route />
                    <Route />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
