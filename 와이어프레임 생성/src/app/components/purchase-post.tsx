import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Lock, CreditCard, Check } from "lucide-react";

export function PurchasePost() {
  const { id } = useParams();
  const [agreed, setAgreed] = useState(false);

  const postInfo = {
    title: "개별 구매 가능한 포스트",
    author: "크리에이터C",
    price: 5000,
    preview: "이 포스트는 개별 구매로도 접근할 수 있는 특별한 콘텐츠입니다...",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            to={`/post/${id}`}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>돌아가기</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">개별 구매</h1>

            {/* Post Preview */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex gap-4">
                <div className="relative w-32 h-32 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={postInfo.thumbnail}
                    alt={postInfo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{postInfo.author}</p>
                  <h2 className="text-lg font-semibold mb-2">{postInfo.title}</h2>
                  <p className="text-gray-700 text-sm line-clamp-2">
                    {postInfo.preview}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Info */}
            <div className="border-t border-b py-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700">포스트 가격</span>
                <span className="text-2xl font-bold">
                  ₩{postInfo.price.toLocaleString()}
                </span>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 이 포스트는 구매 후 영구적으로 볼 수 있습니다.
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">결제 방법</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 border-blue-500 bg-blue-50 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="w-4 h-4"
                  />
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">신용카드</span>
                </label>
                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="w-4 h-4" />
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span>카카오페이</span>
                </label>
                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="w-4 h-4" />
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span>네이버페이</span>
                </label>
              </div>
            </div>

            {/* Agreement */}
            <div className="mb-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 mt-0.5"
                />
                <span className="text-sm text-gray-700">
                  구매 조건 및 환불 정책에 동의합니다.{" "}
                  <a href="#" className="text-blue-600 underline">
                    자세히 보기
                  </a>
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Link
                to={`/post/${id}`}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-center"
              >
                취소
              </Link>
              <button
                disabled={!agreed}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                  agreed
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                ₩{postInfo.price.toLocaleString()} 결제하기
              </button>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-4">구매 시 혜택</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                영구적으로 콘텐츠에 접근할 수 있습니다
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                댓글 작성 및 좋아요가 가능합니다
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">
                크리에이터를 직접 후원할 수 있습니다
              </span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
