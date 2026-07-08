function SearchBar({ value, onChange, onKeyDown, onSearch }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={value} // 제어 컴포넌트: React가 input 값을 관리
                onChange={onChange} // 입력 시 부모의 tempSearch 업데이트
                onKeyDown={onKeyDown} // 엔터 키 감지
                placeholder="게시글 제목으로 검색..."
                className="search-input"
            />
            <button onClick={onSearch} className="search-btn">
                🔍 검색
            </button>
        </div>
    );
}

export default SearchBar;
