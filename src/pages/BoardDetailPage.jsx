import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const BoardDetailPage = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 게시글 번호를 URL파라미터를 가져오는 훅
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchPost = async () => {
        setLoading(true);
        setError(null);

        try {
            // GET /posts/{id} 호출
            const response = await api.get(`/posts/${id}`);
            setPost(response.data);
        } catch (err) {
            if (err.response?.status === 404) {
                setError('게시글을 찾을 수 없습니다.');
            } else {
                setError('게시글을 불러오는데 실패했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    if (loading) return <div className="loading">불러오는 중...</div>;
    if (error) return <div className="error-msg">{error}</div>;
    if (!post) return null;

    return (
        <div className="board-detail-page">
            {/* 뒤로 가기 버튼 */}
            <button onClick={() => navigate(-1)} className="back-btn">
                ← 목록으로
            </button>

            <article className="post-detail">
                <h1 className="post-title">{post.title}</h1>

                <div className="post-meta">
                    <span>👤 {post.author}</span>
                    <span>👁 조회수 {post.view_count}</span>
                    <span>📅 {formatDate(post.created_at)}</span>
                </div>

                <hr />

                {/* 게시글 본문: 줄바꿈을 위해 white-space: pre-wrap CSS 필요 */}
                <div className="post-content">{post.content}</div>
            </article>

            {/* 수정/삭제 버튼 (나중에 JWT 연동 후 본인 글만 표시) */}
            <div className="post-actions">
                <button onClick={() => navigate('/')}>목록</button>
            </div>
        </div>
    );
};

export default BoardDetailPage;
