import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Plus, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { PostLockOverlay } from "./post-lock-overlay";
import { isLockedPost, posts, type Post } from "../data/posts";
import { PostMediaCarousel } from "./post-media-carousel";
import { PostAccessBadge } from "./post-access-badge";
import { LockDecisionModal } from "./lock-decision-modal";

export function Feed() {
  const navigate = useNavigate();
  const [activeDecisionPost, setActiveDecisionPost] = useState<Post | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-[430px] mx-auto px-4 py-2.5 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">LIKEY</h1>
          <Link
            to="/create"
            className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            작성
          </Link>
        </div>
      </header>

      <main className="max-w-[430px] mx-auto">
        <div className="divide-y divide-gray-200">
          {posts.map((post) => {
            const locked = isLockedPost(post);

            return (
              <article key={post.id} className="bg-white">
                <div className="flex items-center justify-between p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm leading-none">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div
                  className="px-4 pb-2.5 cursor-pointer"
                  onClick={() => navigate(`/post/${post.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigate(`/post/${post.id}`);
                    }
                  }}
                >
                  <div className="text-[13px] leading-5">
                    <span className="font-semibold mr-2">{post.author}</span>
                    <span className="text-gray-800">{post.content}</span>
                  </div>
                </div>

                <div className="px-4">
                  <div className="relative">
                    <PostMediaCarousel post={post} locked={locked} />
                    {!locked && (
                      <div className="absolute left-3 top-3 z-10">
                        <PostAccessBadge post={post} />
                      </div>
                    )}
                    {locked && (
                      <PostLockOverlay
                        post={post}
                        onDecision={(selectedPost) => setActiveDecisionPost(selectedPost)}
                      />
                    )}
                  </div>
                </div>

                <div className="px-4 pt-2.5">
                  <div className="flex items-center gap-4 mb-2.5">
                    <button className="flex items-center gap-1 hover:opacity-60 transition">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">{post.likes.toLocaleString()}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:opacity-60 transition">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>
                </div>

                {!locked && post.commentsList && post.commentsList.length > 0 && (
                  <div className="px-4 pb-3.5">
                    <div className="space-y-2">
                      {post.commentsList.map((comment) => (
                        <div
                          key={comment.id}
                          className="text-sm cursor-pointer"
                          onClick={() => navigate(`/post/${post.id}`)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              navigate(`/post/${post.id}`);
                            }
                          }}
                        >
                          <span className="font-semibold mr-2">{comment.author}</span>
                          <span className="text-gray-800">{comment.content}</span>
                        </div>
                      ))}
                      {post.comments > post.commentsList.length && (
                        <Link
                          to={`/post/${post.id}`}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          댓글 {post.comments}개 모두 보기
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </main>
      <LockDecisionModal
        post={activeDecisionPost}
        onClose={() => setActiveDecisionPost(null)}
      />
    </div>
  );
}
