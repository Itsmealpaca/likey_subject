import { Link } from "react-router";
import { Lock, Plus, Heart, MessageCircle, MoreHorizontal } from "lucide-react";

// Mock data for posts
const posts = [
  {
    id: 1,
    author: "크리에이터A",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    title: "오늘의 일상 공유",
    content: "안녕하세요! 오늘 정말 특별한 일이 있었어요. 아침부터 날씨가 좋아서 산책을 나갔는데, 길에서 우연히 오랜 친구를 만났습니다. 함께 커피를 마시며...",
    isLocked: false,
    image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&h=800&fit=crop",
    likes: 234,
    comments: 45,
    timestamp: "2시간 전",
    commentsList: [
      {
        id: 1,
        author: "사용자A",
        authorImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
        content: "정말 멋진 하루네요! 😍",
        timestamp: "1시간 전",
      },
      {
        id: 2,
        author: "사용자B",
        authorImage: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop",
        content: "부럽습니다 ㅎㅎ",
        timestamp: "30분 전",
      },
    ],
  },
  {
    id: 2,
    author: "크리에이터B",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    title: "멤버십 전용 콘텐츠",
    content: "멤버십 회원만 볼 수 있는 특별한 콘텐츠를 준비했습니다! 오늘은 특별한 비하인드 스토리를 공유해요 💫",
    isLocked: true,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=800&fit=crop",
    likes: 567,
    comments: 89,
    membershipTier: "Premium",
    timestamp: "5시간 전",
  },
  {
    id: 3,
    author: "크리에이터C",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    title: "개별 구매 가능한 포스트",
    content: "이 포스트는 개별 구매로도 접근할 수 있는 특별한 콘텐츠입니다. 지난 한 달간의 노하우를 모두 담았어요! 🎨",
    isLocked: true,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=800&fit=crop",
    likes: 123,
    comments: 34,
    price: 5000,
    timestamp: "1일 전",
  },
  {
    id: 4,
    author: "크리에이터A",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    title: "일반 공개 포스트",
    content: "누구나 볼 수 있는 포스트입니다. 오늘 하루도 즐겁게 보내세요! ☀️",
    isLocked: false,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop",
    likes: 456,
    comments: 67,
    timestamp: "2일 전",
    commentsList: [
      {
        id: 1,
        author: "사용자C",
        authorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
        content: "좋은 하루 되세요!",
        timestamp: "1일 전",
      },
    ],
  },
];

export function Feed() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">LIKEY</h1>
          <Link
            to="/create"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            작성
          </Link>
        </div>
      </header>

      {/* Feed */}
      <main className="max-w-2xl mx-auto">
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <article key={post.id} className="bg-white">
              {/* Post Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Caption - 미디어 위로 이동 */}
              <div className="px-4 pb-3">
                <div className="text-sm">
                  <span className="font-semibold mr-2">{post.author}</span>
                  <span className="text-gray-800">{post.content}</span>
                </div>
              </div>

              {/* Post Image */}
              <Link to={`/post/${post.id}`} className="block relative">
                <div className="w-full aspect-square bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {post.isLocked && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                      <Lock className="w-16 h-16 text-white mb-4" />
                      <p className="text-white font-semibold text-lg mb-2">잠금된 콘텐츠</p>
                      {post.membershipTier && (
                        <span className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm">
                          {post.membershipTier} 멤버십
                        </span>
                      )}
                      {post.price && (
                        <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm">
                          ♥ {post.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>

              {/* Post Actions */}
              <div className="px-4 pt-3">
                <div className="flex items-center gap-4 mb-3">
                  <button className="flex items-center gap-1 hover:opacity-60 transition">
                    <Heart className="w-6 h-6" />
                    <span className="text-sm">{post.likes.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:opacity-60 transition">
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                </div>
              </div>

              {/* Comments - 잠금되지 않은 경우만 */}
              {!post.isLocked && post.commentsList && post.commentsList.length > 0 && (
                <div className="px-4 pb-4">
                  <div className="space-y-2">
                    {post.commentsList.map((comment) => (
                      <div key={comment.id} className="text-sm">
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
          ))}
        </div>
      </main>
    </div>
  );
}