function PostCard({ post }) {
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    return (
        <div
            className="post-card"
            role="button" // 접근성: 이 div가 버튼 역할임을 알림
            tabIndex={0} // 접근성: 키보드 Tab으로 포커스 가능
        >
            <h3 className="post-title">{post.title}</h3>

            <div className="post-meta">
                <span className="author">👤 {post.author}</span>
                <span className="view-count">👁 {post.view_count}</span>
                <span className="created-at">📅 {formatDate(post.created_at)}</span>
            </div>
        </div>
    );
}

export default PostCard;
