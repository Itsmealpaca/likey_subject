import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Lock, Heart, MessageCircle, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Mock comments data
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

// Custom arrow components
function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition shadow-lg"
    >
      <ChevronRight className="w-6 h-6 text-gray-800" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition shadow-lg"
    >
      <ChevronLeft className="w-6 h-6 text-gray-800" />
    </button>
  );
}

export function PostDetail() {
  const { id } = useParams();
  const postId = Number(id);
  const [comment, setComment] = useState("");

  // Mock data - in real app, this would be fetched based on id
  const isLocked = postId === 2 || postId === 3;
  const hasMembership = postId === 2;
  const canPurchase = postId === 3;

  const postData = {
    1: {
      author: "크리에이터A",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      content: "안녕하세요! 오늘 정말 특별한 일이 있었어요. 아침부터 날씨가 좋아서 산책을 나갔는데, 길에서 우연히 오랜 친구를 만났습니다.\n\n함께 커피를 마시며 이야기를 나누다 보니 시간 가는 줄 몰랐네요. 이런 작은 행복들이 모여 우리의 삶을 풍요롭게 만드는 것 같아요.",
      images: [
        "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=800&fit=crop",
      ],
      likes: 234,
      timestamp: "2시간 전",
    },
    2: {
      author: "크리에이터B",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      timestamp: "5시간 전",
    },
    3: {
      author: "크리에이터C",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      timestamp: "1일 전",
    },
    4: {
      author: "크리에이터A",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      content: "누구나 볼 수 있는 포스트입니다. 오늘 하루도 즐겁게 보내세요! ☀️\n\n매일매일 감사한 마음으로 살아가려고 노력하고 있어요. 여러분도 오늘 하루 행복하시길 바랍니다!",
      images: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&h=800&fit=crop",
      ],
      likes: 456,
      timestamp: "2일 전",
    },
  }[postId] || postData[1];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>돌아가기</span>
          </Link>
        </div>
      </header>

      {/* Post Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Author Info */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={postData.authorImage}
                    alt={postData.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{postData.author}</p>
                  <p className="text-sm text-gray-500">{postData.timestamp}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          {isLocked ? (
            <div className="p-12">
              <div className="max-w-md mx-auto text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">잠금된 콘텐츠</h2>
                <p className="text-gray-600 mb-8">
                  이 포스트를 보려면 권한이 필요합니다.
                </p>

                <div className="space-y-3">
                  {hasMembership && (
                    <Link
                      to="/membership"
                      className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
                    >
                      멤버십 가입하기
                    </Link>
                  )}
                  {canPurchase && (
                    <Link
                      to={`/purchase/${id}`}
                      className="block w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
                    >
                      개별 구매하기 (₩5,000)
                    </Link>
                  )}
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">미리보기</h3>
                  <p className="text-sm text-gray-600">
                    이 포스트는 특별한 콘텐츠를 담고 있습니다. 잠금을 해제하면 전체 내용을 확인할 수 있습니다...
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Unlocked Content */}
              <div className="p-6 border-b">
                {/* Image Slider */}
                {postData.images && postData.images.length > 0 && (
                  <div className="mb-6 -mx-6">
                    <Slider {...sliderSettings}>
                      {postData.images.map((image, index) => (
                        <div key={index}>
                          <div className="aspect-square bg-gray-100">
                            <img
                              src={image}
                              alt={`Slide ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 mb-4">
                  <button className="flex items-center gap-1 hover:opacity-60 transition">
                    <Heart className="w-6 h-6" />
                    <span className="text-sm">{postData.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:opacity-60 transition">
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-sm">{mockComments.length}</span>
                  </button>
                </div>

                {/* Content */}
                <div className="whitespace-pre-wrap text-gray-800">
                  <span className="font-semibold mr-2">{postData.author}</span>
                  {postData.content}
                </div>
              </div>

              {/* Comments Section */}
              <div className="p-6">
                <h3 className="font-semibold mb-4">댓글 {mockComments.length}개</h3>
                
                <div className="space-y-4 mb-6">
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
                        <div className="bg-gray-50 rounded-lg px-4 py-2">
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

                {/* Comment Input */}
                <div className="flex gap-3 pt-4 border-t">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"></div>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="댓글을 입력하세요..."
                      className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      disabled={!comment.trim()}
                      className={`px-6 py-2 rounded-full font-semibold transition ${
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
    </div>
  );
}
