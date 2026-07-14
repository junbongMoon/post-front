import { useState } from 'react';

const Pagination = ({ pageInfo, onPageChange }) => {
  // page : 현재 페이지번호
  // totalPages : 전체 페이지 수
  // onPageChange : 페이지 변경시 호출할 함수

  const {
    page_no,
    start_num_of_current_paging_block,
    end_num_of_current_paging_block,
    has_prev_block,
    has_next_block,
    total_page_cnt,
  } = pageInfo;

  const getPageNumbers = Array.from(
    { length: end_num_of_current_paging_block - start_num_of_current_paging_block + 1 },
    (_, i) => start_num_of_current_paging_block + i,
  );

  const pageNums = [];
  for (let i = start_num_of_current_paging_block; i <= end_num_of_current_paging_block; i++) {
    pageNums.push(i);
  }

  const prevBlockPage = start_num_of_current_paging_block - 1;
  const nextBlockPage = end_num_of_current_paging_block + 1;

  return (
    <div className="pagination">
      {/* 이전 페이지 버튼 */}
      <button
        className="page-btn"
        disabled={page_no === 1}
        onClick={() => onPageChange(page_no - 1)}
      >
        ← 이전
      </button>

      {/* 페이지 번호 버튼들 */}
      {pageNums.map((pageNm) => (
        <button
          key={pageNm}
          onClick={() => onPageChange(pageNm)}
          className={`page-btn ${page_no === pageNm ? 'active' : ''}`}
        >
          {pageNm}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        className="page-btn"
        disabled={total_page_cnt === page_no}
        onClick={() => onPageChange(page_no + 1)}
      >
        다음 →
      </button>

      {/* 현재 위치 표시 */}
      <span className="page-info">
        {page_no} / {total_page_cnt} 페이지
      </span>
    </div>
  );
};

export default Pagination;
