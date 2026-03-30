import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Lock, CreditCard, Check, Heart } from "lucide-react";
import { getPostById, getPrimaryMediaSrc } from "../data/posts";

export function PurchasePost() {
  const { id } = useParams();
  const [agreed, setAgreed] = useState(false);
  const post = getPostById(Number(id));
  const heartBalance = 4000;
  const postInfo = {
    title: post.title,
    author: post.author,
    price: post.heartPrice ?? 0,
    preview: post.preview,
    thumbnail: getPrimaryMediaSrc(post),
  };
  const hasEnoughHearts = heartBalance >= postInfo.price;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-[430px] mx-auto px-4 py-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>돌아가기</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[430px] mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-6">개별 구매 주문</h1>

            {/* Post Preview */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex gap-4">
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
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
                  <h2 className="text-base font-semibold mb-1.5">{postInfo.title}</h2>
                  <p className="text-gray-700 text-[13px] leading-5 line-clamp-2">
                    {postInfo.preview}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Info */}
            <div className="border-t border-b py-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700">포스트 가격</span>
                <span className="text-xl font-bold">
                  {postInfo.price.toLocaleString()}하트
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700">보유 하트</span>
                <span className="text-base font-semibold text-gray-900">
                  {heartBalance.toLocaleString()}하트
                </span>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 이 포스트는 구매 후 영구적으로 볼 수 있습니다.
                </p>
              </div>
              {!hasEnoughHearts && (
                <div className="mt-3 rounded-lg bg-rose-50 p-3.5">
                  <p className="text-sm text-rose-700">
                    보유 하트가 부족합니다. {(postInfo.price - heartBalance).toLocaleString()}하트를 더 충전해야 결제를 진행할 수 있어요.
                  </p>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h3 className="font-semibold text-sm mb-3">결제 방법</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3.5 border-2 border-blue-500 bg-blue-50 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="w-4 h-4"
                  />
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">신용카드</span>
                </label>
                <label className="flex items-center gap-3 p-3.5 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="w-4 h-4" />
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span>카카오페이</span>
                </label>
                <label className="flex items-center gap-3 p-3.5 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="w-4 h-4" />
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span>네이버페이</span>
                </label>
              </div>
            </div>

            {/* Agreement */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 mt-0.5"
                />
                <span className="text-[13px] leading-5 text-gray-700">
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
                to="/"
                className="flex-1 py-3 px-4 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-center"
              >
                취소
              </Link>
              {hasEnoughHearts ? (
                <button
                  disabled={!agreed}
                  className={`flex-1 py-3 px-4 text-sm rounded-lg font-semibold transition ${
                    agreed
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {postInfo.price.toLocaleString()}하트 결제하기
                </button>
              ) : (
                <Link
                  to={`/hearts/charge/${post.id}`}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-3 px-4 text-sm font-semibold transition ${
                    agreed
                      ? "bg-rose-600 text-white hover:bg-rose-700"
                      : "bg-gray-300 text-gray-500 pointer-events-none"
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  하트 충전하기
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-sm mb-3">구매 시 혜택</h3>
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
