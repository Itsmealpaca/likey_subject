import { Globe, Heart, Sparkles } from "lucide-react";
import type { Post } from "../data/posts";

type BadgeItem = {
  label: string;
  Icon: typeof Globe;
};

function getBadgeItems(post: Post): BadgeItem[] {
  switch (post.accessType) {
    case "membership":
      return [{ label: "멤버십 전용", Icon: Sparkles }];
    case "purchase":
      return [{ label: "이 포스트만 구매", Icon: Heart }];
    case "membership_or_purchase":
      return [
        { label: "멤버십 전용", Icon: Sparkles },
        { label: "이 포스트만 구매", Icon: Heart },
      ];
    default:
      return [{ label: "전체", Icon: Globe }];
  }
}

type Props = {
  post: Post;
};

export function PostAccessBadge({ post }: Props) {
  const items = getBadgeItems(post);

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(({ label, Icon }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm backdrop-blur"
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </span>
      ))}
    </div>
  );
}
