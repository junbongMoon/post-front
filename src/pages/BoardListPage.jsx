import { useState } from 'react';
import PostCard from '../components/PostCard';

const BoardListPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);

    return (
        <div className="board-list-page">
            <div className="page-header">
                <h1>게시판</h1>
                <button>글쓰기</button>
            </div>

            {/* 로딩중 표시 */}
            {loading && <div className="loading"> 불러오는중 </div>}
            {/* 에러 표시 */}
            {error && <div className="error-msg"> {error} </div>}

            {/* 게시글 목록 */}
            {!loading && !error && (
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
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default BoardListPage;
