import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Slider from "react-slick";
import type { Post } from "../data/posts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(event);
      }}
      className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow-lg transition hover:bg-white"
    >
      <ChevronRight className="h-5 w-5 text-gray-800" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(event);
      }}
      className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow-lg transition hover:bg-white"
    >
      <ChevronLeft className="h-5 w-5 text-gray-800" />
    </button>
  );
}

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

type Props = {
  post: Post;
  locked?: boolean;
};

export function PostMediaCarousel({ post, locked = false }: Props) {
  const mediaHeight = "aspect-[4/3]";
  const imageCount = post.media.filter((media) => media.type === "image").length;
  const firstMedia = post.media[0];
  const firstMediaLabel =
    firstMedia?.type === "video"
      ? firstMedia.duration ?? "00:00"
      : `사진 ${imageCount}장`;

  if (locked) {
    return (
      <div className="overflow-hidden rounded-[24px] bg-gray-200">
        <div className={`relative ${mediaHeight} bg-gray-300`}>
          <div className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
            {firstMediaLabel}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] bg-gray-100">
      <Slider {...sliderSettings}>
        {post.media.map((media, index) => (
          <div key={`${post.id}-${index}`}>
            <div className={`relative ${mediaHeight} bg-gray-100`}>
              <div className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
                {media.type === "video" ? media.duration ?? "00:00" : `사진 ${imageCount}장`}
              </div>
              {media.type === "image" ? (
                <img
                  src={media.src}
                  alt={`${post.title} 미디어 ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="relative h-full w-full">
                  <img
                    src={media.thumbnail}
                    alt={`${post.title} 동영상 미리보기 ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white">
                    동영상 미리보기
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/92 shadow-xl">
                      <Play className="ml-1 h-7 w-7 fill-gray-900 text-gray-900" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
