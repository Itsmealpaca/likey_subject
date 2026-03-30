import { useEffect, useState } from "react";
import { Check, Heart, Sparkles, X } from "lucide-react";
import { Link } from "react-router";
import type { Post } from "../data/posts";

type Props = {
  post: Post | null;
  onClose: () => void;
};

function formatHearts(value?: number) {
  return value?.toLocaleString() ?? "0";
}

export function LockDecisionModal({ post, onClose }: Props) {
  const [selectedOption, setSelectedOption] = useState<"membership" | "purchase">("membership");
  const heartBalance = 4000;

  useEffect(() => {
    if (!post) return;
    setSelectedOption(post.accessType === "purchase" ? "purchase" : "membership");
  }, [post]);

  if (!post) {
    return null;
  }

  const isPurchase = post.accessType === "purchase";
  const isMembershipOrPurchase = post.accessType === "membership_or_purchase";

  if (!isPurchase && !isMembershipOrPurchase) {
    return null;
  }

  const purchaseTarget =
    heartBalance >= (post.heartPrice ?? 0)
      ? `/purchase/${post.id}`
      : `/hearts/charge/${post.id}`;
  const confirmTo =
    selectedOption === "membership" ? `/membership/${post.id}` : purchaseTarget;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[430px] rounded-[28px] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <p className="text-lg font-semibold text-gray-950">
              {isPurchase ? "이 포스트만 구매" : "포스트 열기"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {isPurchase ? "개별 구매해서 열기" : "멤버십 구독해서 열기"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isPurchase ? (
          <div className="px-5 py-5">
            <button
              type="button"
              onClick={() => setSelectedOption("purchase")}
              className="w-full rounded-3xl border border-gray-900 bg-gray-50 p-4 text-left"
            >
              <div className="flex items-center gap-2 text-gray-900">
                <Heart className="h-4 w-4" />
                <p className="text-sm font-semibold">이 포스트만 구매하기</p>
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-950">
                {formatHearts(post.heartPrice)}하트
              </p>
              <div className="mt-4 space-y-2 text-[13px] leading-5 text-gray-600">
                <p>구매 후 이 포스트의 잠금된 미디어와 댓글 영역을 확인할 수 있습니다.</p>
                <p>멤버십 가입 여부와 무관하게 이 포스트 단건 권한이 부여됩니다.</p>
              </div>
            </button>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-2xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                취소
              </button>
              <Link
                to={confirmTo}
                onClick={onClose}
                className="flex-1 rounded-2xl bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-black"
              >
                구매하기
              </Link>
            </div>
          </div>
        ) : (
          <div className="px-5 py-5">
            <button
              type="button"
              onClick={() => setSelectedOption("membership")}
              className={`w-full rounded-3xl border p-4 text-left transition ${
                selectedOption === "membership"
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2 text-gray-900">
                <Sparkles className="h-4 w-4" />
                <p className="text-sm font-semibold">Gold</p>
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-950">₩300,000/월</p>

              <div className="mt-5 grid grid-cols-2 gap-3 text-[13px]">
                <div className="rounded-2xl bg-white px-3 py-3">
                  <p className="text-gray-500">사진∙동영상∙음성</p>
                  <p className="mt-1 text-lg font-semibold text-gray-950">65개</p>
                  <p className="mt-1 text-gray-500">즉시 공개</p>
                </div>
                <div className="rounded-2xl bg-white px-3 py-3">
                  <p className="text-gray-500">스토어 상품</p>
                  <p className="mt-1 text-lg font-semibold text-gray-950">6개</p>
                  <p className="mt-1 text-gray-500">이용 가능</p>
                </div>
                <div className="col-span-2 rounded-2xl bg-white px-3 py-3">
                  <p className="text-gray-500">1:1 채팅</p>
                  <p className="mt-1 text-lg font-semibold text-gray-950">가능</p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedOption("purchase")}
              className={`mt-4 w-full rounded-2xl border px-4 py-3 text-left transition ${
                selectedOption === "purchase"
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-gray-700" />
                  <span className="text-sm font-medium text-gray-900">이 포스트만 구매하기</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">999</span>
              </div>
            </button>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-2xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                취소
              </button>
              <Link
                to={confirmTo}
                onClick={onClose}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-black"
              >
                <Check className="h-4 w-4" />
                포스트 열기
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
