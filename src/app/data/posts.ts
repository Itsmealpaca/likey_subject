export type Comment = {
  id: number;
  author: string;
  authorImage: string;
  content: string;
  timestamp: string;
  likes?: number;
};

export type MediaItem = {
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  duration?: string;
};

export type AccessType =
  | "public"
  | "membership"
  | "purchase"
  | "membership_or_purchase";

export type Post = {
  id: number;
  author: string;
  authorImage: string;
  title: string;
  content: string;
  preview: string;
  accessType: AccessType;
  media: MediaItem[];
  likes: number;
  comments: number;
  timestamp: string;
  monthlyPrice?: number;
  heartPrice?: number;
  commentsList?: Comment[];
};

export const posts: Post[] = [
  {
    id: 1,
    author: "크리에이터A",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    title: "오늘의 일상 공유",
    content:
      "안녕하세요! 오늘 정말 특별한 일이 있었어요. 아침부터 날씨가 좋아서 산책을 나갔는데, 길에서 우연히 오랜 친구를 만났습니다. 함께 커피를 마시며...",
    preview:
      "함께 커피를 마시며 이야기를 나누다 보니 시간 가는 줄 몰랐네요. 이런 작은 행복들이 모여 우리의 삶을 풍요롭게 만드는 것 같아요.",
    accessType: "public",
    media: [
      {
        type: "video",
        src: "video-preview-1",
        thumbnail:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&h=700&fit=crop",
        duration: "03:24",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=1000&h=700&fit=crop",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=700&fit=crop",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1000&h=700&fit=crop",
      },
    ],
    likes: 234,
    comments: 45,
    timestamp: "2시간 전",
    commentsList: [
      {
        id: 1,
        author: "사용자A",
        authorImage:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
        content: "정말 멋진 하루네요! 😍",
        timestamp: "1시간 전",
      },
      {
        id: 2,
        author: "사용자B",
        authorImage:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop",
        content: "부럽습니다 ㅎㅎ",
        timestamp: "30분 전",
      },
    ],
  },
  {
    id: 2,
    author: "크리에이터B",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    title: "멤버십 전용 콘텐츠",
    content:
      "멤버십 회원만 볼 수 있는 특별한 콘텐츠를 준비했습니다! 오늘은 특별한 비하인드 스토리를 공유해요 💫",
    preview:
      "오늘 공개하는 비하인드 기록과 작업 노트는 멤버십 구독자만 볼 수 있어요. 구독 후 전체 스토리와 추가 이미지를 확인할 수 있습니다.",
    accessType: "membership",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000&h=700&fit=crop",
      },
    ],
    likes: 567,
    comments: 89,
    monthlyPrice: 4900,
    timestamp: "5시간 전",
  },
  {
    id: 3,
    author: "크리에이터C",
    authorImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    title: "개별 구매 가능한 포스트",
    content:
      "이 포스트는 개별 구매로도 접근할 수 있는 특별한 콘텐츠입니다. 지난 한 달간의 노하우를 모두 담았어요! 🎨",
    preview:
      "지난 한 달간 쌓은 제작 과정, 시행착오, 최종 결과물을 하나의 포스트에 정리했습니다. 구매 후 바로 전체 내용을 열 수 있어요.",
    accessType: "purchase",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&h=700&fit=crop",
      },
    ],
    likes: 123,
    comments: 34,
    heartPrice: 5000,
    timestamp: "1일 전",
  },
  {
    id: 4,
    author: "크리에이터D",
    authorImage:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop",
    title: "구독 또는 단건 구매로 열리는 심화 포스트",
    content:
      "멤버십으로 보거나, 이 포스트만 따로 구매해서 볼 수 있는 심화 콘텐츠입니다. 더 자세한 분석과 템플릿을 담았어요.",
    preview:
      "정리된 템플릿, 실제 적용 사례, 체크리스트까지 함께 담긴 심화 포스트입니다. 구독하거나 이 포스트만 개별 구매해서 볼 수 있습니다.",
    accessType: "membership_or_purchase",
    media: [
      {
        type: "video",
        src: "video-preview-2",
        thumbnail:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&h=700&fit=crop",
        duration: "01:42",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&h=700&fit=crop",
      },
    ],
    likes: 312,
    comments: 41,
    monthlyPrice: 6900,
    heartPrice: 3500,
    timestamp: "2일 전",
  },
  {
    id: 5,
    author: "크리에이터A",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    title: "일반 공개 포스트",
    content:
      "누구나 볼 수 있는 포스트입니다. 오늘 하루도 즐겁게 보내세요! ☀️",
    preview:
      "매일매일 감사한 마음으로 살아가려고 노력하고 있어요. 여러분도 오늘 하루 행복하시길 바랍니다!",
    accessType: "public",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=700&fit=crop",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=1000&h=700&fit=crop",
      },
    ],
    likes: 456,
    comments: 67,
    timestamp: "3일 전",
    commentsList: [
      {
        id: 1,
        author: "사용자C",
        authorImage:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
        content: "좋은 하루 되세요!",
        timestamp: "1일 전",
      },
    ],
  },
];

export function getPostById(postId: number) {
  return posts.find((post) => post.id === postId) ?? posts[0];
}

export function isLockedPost(post: Post) {
  return post.accessType !== "public";
}

export function getPrimaryMediaSrc(post: Post) {
  const media = post.media[0];
  if (!media) return "";
  return media.type === "video" ? media.thumbnail ?? "" : media.src;
}
