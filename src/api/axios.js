// ============================================================
// 파일 위치: src/api/axios.js
// 역할: axios 인스턴스를 생성하고, 모든 요청에 공통 설정을 적용합니다.
//       토큰 자동 주입(JWT), baseURL 설정 등을 여기서 한 번만 정의합니다.
// ============================================================

import axios from 'axios';

// axios 인스턴스(객체) 생성
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
    // import.meta.env: Vite에서의 환경변수 접근 방법
});

// axios 객체로 요청 인터셉터(interceptor) : 모든 요청이 실제로 보내지기 전에 실행
// JWT 토큰을 매 요청마다 자동으로 붙여준다.
// api.interceptors.request.use((config) => {});

// axios 요청에 대한 응답 인터셉터 : 모든 응답이 도착한 후 실행
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.this.status === 401) {
            // 토큰이 만료 되었거나 유효하지 않은 경우
            localStorage.removeItem('access_token'); // 로컬 스토리지에 있는 토큰 지우기
            if (window.location.pathname !== '/login') {
                // 현재 페이지가 로그인 페이지가 아닌 경우
                window.location.href = '/login'; // 로그인 페이지로 강제 이동
            }
        }
        return Promise.reject(error);
    },
);

export default api;
