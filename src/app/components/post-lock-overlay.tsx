import { Heart, Sparkles } from "lucide-react";
import { Link } from "react-router";
import type { Post } from "../data/posts";
import { PostAccessBadge } from "./post-access-badge";

type LockOverlayProps = {
  post: Post;
  onDecision?: (post: Post) => void;
};

function formatWon(price?: number) {
  return price ? `${price.toLocaleString()}원` : "";
}

function formatHearts(price?: number) {
  return price ? `${price.toLocaleString()}하트` : "";
}

export function getLockUi(post: Post) {
  switch (post.accessType) {
    case "membership":
      return {
        Icon: Sparkles,
        title: "멤버십 전용 포스트",
        action: `${formatWon(post.monthlyPrice)}/월 구독하기`,
        to: `/membership/${post.id}`,
      };
    case "purchase":
      return {
        Icon: Heart,
        title: "이 포스트만 구매",
        action: `${formatHearts(post.heartPrice)}로 열기`,
        to: `/purchase/${post.id}`,
      };
    case "membership_or_purchase":
      return {
        Icon: Sparkles,
        title: "멤버십 전용 포스트",
        action: `${formatWon(post.monthlyPrice)}/월 구독하기`,
        to: `/membership/${post.id}`,
      };
    default:
      return null;
  }
}

export function PostLockOverlay({ post, onDecision }: LockOverlayProps) {
  const lockUi = getLockUi(post);

  if (!lockUi) {
    return null;
  }

  const { Icon } = lockUi;

  return (
    <>
      <div className="absolute left-3 top-3 z-10">
        <PostAccessBadge post={post} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-black/22 px-6">
        {post.accessType === "purchase" || post.accessType === "membership_or_purchase" ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDecision?.(post);
            }}
            className="w-full max-w-xs rounded-[28px] bg-white/95 px-6 py-5 text-center shadow-2xl transition hover:-translate-y-0.5 hover:bg-white"
          >
            <p className="text-sm font-semibold text-gray-900">{lockUi.title}</p>
            <div className="mt-2 flex items-center justify-center gap-2 text-xl font-bold text-blue-600">
              <Icon className="h-5 w-5" />
              <span>{lockUi.action}</span>
            </div>
          </button>
        ) : (
          <Link
            to={lockUi.to}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-xs rounded-[28px] bg-white/95 px-6 py-5 text-center shadow-2xl transition hover:-translate-y-0.5 hover:bg-white"
          >
            <p className="text-sm font-semibold text-gray-900">{lockUi.title}</p>
            <div className="mt-2 flex items-center justify-center gap-2 text-xl font-bold text-blue-600">
              <Icon className="h-5 w-5" />
              <span>{lockUi.action}</span>
            </div>
          </Link>
        )}
      </div>
    </>
  );
}
