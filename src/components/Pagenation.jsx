const Pagenation = ({ page, totalPages, onPageChange }) => {
    // page : 현재 페이지 번호
    // totalPages : 전체 페이지 수
    // onPageChange : 페이지 변경 시 호출할 함수
    const getPageNumbers = () => {
        // 표시할 페이지 번호를 배열에 담아 반환 (왜 ? JSX에서 map()을 써서 출력하기 위해)
        const range = 2;
        const start = Math.max(1, page - range);
        const end = Math.min(totalPages, page + range);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        // length : N, (_, i) => i : [0, 1, 2, 3, ...., N-1]
    };
    return (
        <div className="pagination">
            {/* 이전 페이지 버튼 */}
            <button className="page-btn" onClick={() => onPageChange(page - 1)}>
                ← 이전
            </button>

            {/* 페이지 번호 버튼들 */}
            {getPageNumbers().map((pageNm) => (
                <button
                    key={pageNm}
                    onClick={() => onPageChange(pageNm)}
                    className={`page-btn ${page === pageNm ? 'active' : ''}`}
                >
                    {pageNm}
                </button>
            ))}
            {/* 다음 페이지 버튼 */}
            <button className="page-btn" onClick={() => onPageChange(page + 1)}>
                다음 →
            </button>

            {/* 현재 위치 표시 */}
            <span className="page-info">
                {page} / {totalPages} 페이지
            </span>
        </div>
    );
};

export default Pagenation;
