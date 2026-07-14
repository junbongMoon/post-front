import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import PostCard from '../components/PostCard';
import api from '../api/axios';
import SearchBar from '../components/SearchBar';
import Pagenation from '../components/Pagenation';

const BoardListPage = () => {
    const [loading, setLoading] = useState(false); // 데이터를 로딩중(통신중)인지 아닌지
    const [error, setError] = useState(null); // 에러 메세지를 출력 할지 말지
    const [posts, setPosts] = useState([]); // 게시글 데이터
    const [page, setPage] = useState(1); // 현재 페이지 번호
    const [search, setSearch] = useState(''); // backend를 호출 했던 검색어
    const [tempSearch, setTempSearch] = useState(''); // 아직 입력중인 검색어(backend 호출x)
    const [pageInfo, setPageInfo] = useState(null); // 전체 페이지 수

    const navigate = useNavigate(); // 페이지 이동을 할 수 있도록 하는 react-router-dom의 훅

    const fetchPosts = useCallback(async () => {
        // page 혹은 search가 바뀔 때만 새 함수 생성,
        // 그 외에는 이전에 만들어졌던 함수 재사용

        // useEffect의 의존성 배열에 함수가 들어간다. => 그 함수를 useCallback!

        setLoading(true); // 로딩 시작
        setError(null); // 이전 에러 초기화
        try {
            const response = await api.get('/posts', {
                params: {
                    page,
                    per_page: 10,
                    ...(search && { search }), // search가 있을 때만 파라미터 추가
                },
            });

            console.log(response.data.page_info);

            setPosts(response.data.posts);
            setPageInfo(response.data.page_info);

            console.log(response.data.page_info);
        } catch (err) {
            setError('게시글을 불러는데 실패했습니다..');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    // page(페이지 번호), search(검색어)가 바뀔 때마다 호출 되도록
    // 최초에 컴포넌트가 렌더링 될 때 page 스테이트 값이 1로 초기화 되면서
    // 아래의 fetchPosts()가 호출 된다.
    useEffect(() => {
        fetchPosts();
    }, [page, search]);

    const handelSearch = () => {
        setSearch(tempSearch);
        setPage(1);
    };

    const handelSearchKeyDown = (e) => {
        if (e.key === 'Enter') handelSearch();
    };

    return (
        <div className="board-list-page">
            <div className="page-header">
                <h1>게시판</h1>
                <button>글쓰기</button>
            </div>

            <SearchBar
                value={tempSearch}
                onChange={(e) => setTempSearch(e.target.value)}
                onSearch={handelSearch}
                onKeyDown={handelSearchKeyDown}
            />

            {/* 로딩중 표시 */}
            {loading && <div className="loading"> 불러오는중 </div>}
            {/* 에러 표시 */}
            {error && <div className="error-msg"> {error} </div>}

            {/* 게시글 목록 */}
            {!loading && !error && posts && (
                <>
                    {posts.length === 0 ? (
                        <div className="empty">게시글이 없습니다.</div>
                    ) : (
                        <div className="post-list">
                            {/* posts 배열을 map으로 순회 → 각각 PostCard 컴포넌트로 표시 */}
                            {posts.map((post) => (
                                <PostCard
                                    key={post.id} // key: React가 목록 항목을 구분할 때 사용 (필수!)
                                    post={post}
                                    onClick={() => navigate(`/posts/${post.id}`)}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
            {/* 페이지네이션 */}
            {pageInfo && (
                <Pagenation pageInfo={pageInfo} onPageChange={(newPage) => setPage(newPage)} />
            )}
        </div>
    );
};

export default BoardListPage;
