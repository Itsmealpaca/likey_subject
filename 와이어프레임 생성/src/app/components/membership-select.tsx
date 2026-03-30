import { Link } from "react-router";
import { ArrowLeft, Check, Star, Zap, Crown } from "lucide-react";

const membershipTiers = [
  {
    id: "basic",
    name: "Basic",
    icon: Star,
    price: 5000,
    period: "월",
    benefits: [
      "월 5개 포스트 접근",
      "기본 콘텐츠 열람",
      "댓글 작성",
      "좋아요 기능",
    ],
    color: "from-gray-400 to-gray-500",
  },
  {
    id: "premium",
    name: "Premium",
    icon: Zap,
    price: 15000,
    period: "월",
    popular: true,
    benefits: [
      "무제한 포스트 접근",
      "프리미엄 콘텐츠 열람",
      "우선 댓글 표시",
      "이모티콘 사용",
      "월 1회 라이브 참여",
    ],
    color: "from-blue-500 to-purple-500",
  },
  {
    id: "vip",
    name: "VIP",
    icon: Crown,
    price: 30000,
    period: "월",
    benefits: [
      "모든 Premium 혜택",
      "VIP 전용 콘텐츠",
      "크리에이터와 1:1 채팅",
      "월 4회 라이브 참여",
      "한정판 굿즈 할인",
      "VIP 배지 표시",
    ],
    color: "from-amber-400 to-orange-500",
  },
];

export function MembershipSelect() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>돌아가기</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">멤버십 선택</h1>
          <p className="text-xl text-gray-600">
            크리에이터를 후원하고 특별한 콘텐츠를 만나보세요
          </p>
        </div>

        {/* Membership Tiers */}
        <div className="grid md:grid-cols-3 gap-8">
          {membershipTiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                  tier.popular ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    인기
                  </div>
                )}

                {/* Header */}
                <div className={`bg-gradient-to-br ${tier.color} p-8 text-white`}>
                  <Icon className="w-12 h-12 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">
                      ₩{tier.price.toLocaleString()}
                    </span>
                    <span className="text-lg opacity-90">/{tier.period}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                      tier.popular
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    구독하기
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">자주 묻는 질문</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                멤버십은 언제든지 취소할 수 있나요?
              </h4>
              <p className="text-gray-600">
                네, 언제든지 취소 가능합니다. 취소 시 다음 결제일까지 혜택이 유지됩니다.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                멤버십 등급을 변경할 수 있나요?
              </h4>
              <p className="text-gray-600">
                네, 언제든지 업그레이드 또는 다운그레이드가 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
