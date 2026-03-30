import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { getPostById, isLockedPost, type Post } from "../data/posts";
import { PostLockOverlay } from "./post-lock-overlay";
import { PostMediaCarousel } from "./post-media-carousel";
import { PostAccessBadge } from "./post-access-badge";
import { LockDecisionModal } from "./lock-decision-modal";

const mockComments = [
  {
    id: 1,
    author: "사용자A",
    authorImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
    content: "정말 멋진 포스트네요! 😍",
    timestamp: "1시간 전",
    likes: 12,
  },
  {
    id: 2,
    author: "사용자B",
    authorImage: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop",
    content: "저도 이런 경험 해보고 싶어요",
    timestamp: "3시간 전",
    likes: 8,
  },
  {
    id: 3,
    author: "사용자C",
    authorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
    content: "좋은 정보 감사합니다! 많은 도움이 되었어요",
    timestamp: "5시간 전",
    likes: 5,
  },
  {
    id: 4,
    author: "사용자D",
    authorImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
    content: "다음 포스트도 기대할게요!",
    timestamp: "1일 전",
    likes: 3,
  },
];

export function PostDetail() {
  const { id } = useParams();
  const postId = Number(id);
  const [comment, setComment] = useState("");
  const [activeDecisionPost, setActiveDecisionPost] = useState<Post | null>(null);
  const postData = getPostById(postId);
  const isLocked = isLockedPost(postData);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-[430px] mx-auto px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            <span>돌아가기</span>
          </Link>
        </div>
      </header>

      <main className="max-w-[430px] mx-auto px-4 py-5">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={postData.authorImage}
                    alt={postData.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">{postData.author}</p>
                  <p className="text-xs text-gray-500">{postData.timestamp}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {isLocked ? (
            <div className="p-4">
              <div className="relative overflow-hidden rounded-[28px]">
                <PostMediaCarousel post={postData} locked />
                <PostLockOverlay
                  post={postData}
                  onDecision={(selectedPost) => setActiveDecisionPost(selectedPost)}
                />
              </div>

              <div className="flex items-center gap-4 mt-3">
                <button className="flex items-center gap-1 hover:opacity-60 transition">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{postData.likes.toLocaleString()}</span>
                </button>
                <button className="flex items-center gap-1 hover:opacity-60 transition">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{postData.comments}</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 border-b">
                <div className="mb-4 relative">
                  <PostMediaCarousel post={postData} />
                  <div className="absolute left-3 top-3 z-10">
                    <PostAccessBadge post={postData} />
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <button className="flex items-center gap-1 hover:opacity-60 transition">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">{postData.likes.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:opacity-60 transition">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{postData.comments}</span>
                  </button>
                </div>

                <div className="whitespace-pre-wrap text-[13px] leading-6 text-gray-800">
                  <span className="font-semibold mr-2">{postData.author}</span>
                  {postData.content}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-sm mb-3">댓글 {mockComments.length}개</h3>

                <div className="space-y-3 mb-5">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <img
                          src={comment.authorImage}
                          alt={comment.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg px-3 py-2">
                          <p className="font-semibold text-sm mb-1">{comment.author}</p>
                          <p className="text-sm text-gray-800">{comment.content}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-1 px-2">
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          <button className="text-xs text-gray-600 hover:text-gray-900">
                            좋아요 {comment.likes}
                          </button>
                          <button className="text-xs text-gray-600 hover:text-gray-900">
                            답글 달기
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2.5 pt-3 border-t">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"></div>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="댓글을 입력하세요..."
                      className="flex-1 px-3 py-2 text-sm border rounded-full outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      disabled={!comment.trim()}
                      className={`px-4 py-2 text-sm rounded-full font-semibold transition ${
                        comment.trim()
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      게시
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <LockDecisionModal
        post={activeDecisionPost}
        onClose={() => setActiveDecisionPost(null)}
      />
    </div>
  );
}
