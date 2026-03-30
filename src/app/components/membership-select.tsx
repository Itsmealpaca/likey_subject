import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ChevronRight, X } from "lucide-react";
import { getPostById } from "../data/posts";

const membershipTiers = [
  {
    id: "bronze",
    name: "Bronze",
    price: 10000,
    badge: "인기",
    summary: [
      "ෆ 일상 photo",
      "ෆ 맛보기 photo",
      "✿ 채팅 free 10, 이후부터 5❤️",
    ],
    details: [
      "크리에이터와 1:1 유료 채팅",
      "플랜 전용 포스트 보기",
      "연속 구독 시작일 기준 30일 전 포스트 부터 열람 가능",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: 100000,
    summary: [
      "ෆ 일상 photo",
      "ෆ 더 은밀한 photo",
      "✿ 채팅 free",
    ],
    details: [
      "크리에이터와 1:1 무료 채팅",
      "플랜 전용 포스트 보기",
      "연속 구독 시작일 기준 30일 전 포스트 부터 열람 가능",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: 300000,
    summary: [
      "ෆ 일상 photo + video",
      "ෆ 더 은밀한 photo + video",
      "ෆ 인스타 비하인드 미공개 컨텐츠",
      "ෆ 착용 의상 부분 구매 가능(문의)",
      "ෆ 구독시 미공개 영상 선물",
      "ෆ 3개월 이상 구독시 다이아 업그레이드 쿠폰 지급!",
      "ෆ 가끔씩 메일로 화보 원본 선물",
      "✿ 채팅 free",
    ],
    details: [
      "크리에이터와 1:1 무료 채팅",
      "플랜 전용 포스트 보기",
      "모든 기간의 포스트 열람 가능",
    ],
    metrics: [
      ["사진∙동영상∙음성", "65개", "즉시 공개"],
      ["스토어 상품", "6개", "이용 가능"],
      ["1:1 채팅", "가능", ""],
    ],
  },
  {
    id: "diamonds",
    name: "Diamonds",
    price: 500000,
    summary: [
      "ෆ 일상 photo + video",
      "ෆ 더 은밀한 photo + video",
      "ෆ 인스타 비하인드 미공개 컨텐츠",
      "ෆ 넘 야해서 화보집에서는 뺀 미공개 고화질 화보사진 + 4k영상",
      "ෆ 착용 의상 전체 구매 가능(문의)",
      "ෆ 실물 택배 선물 (화보집,폴라로이드,입엇던 옷등 매달 달라져요!)(*외국도 가능🌏)",
      "ෆ 1:1 맞춤 감사 영상선물",
      "ෆ 매달 다이아 전용 무료 스토어 컨텐츠 제공(다운받을수 있는 사진,영상들)❣️",
      "ෆ 메일로 받으실분은 메일전달 가능!",
      "✿ 채팅 free",
    ],
    details: [
      "크리에이터와 1:1 무료 채팅",
      "플랜 전용 포스트 보기",
      "모든 기간의 포스트 열람 가능",
    ],
    metrics: [
      ["사진∙동영상∙음성", "무제한", "즉시 공개"],
      ["스토어 상품", "다이아 전용", "이용 가능"],
      ["1:1 채팅", "가능", ""],
    ],
  },
];

function PlanChangeCard({
  tier,
  selected,
  onSelect,
}: {
  tier: (typeof membershipTiers)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const maxVisible = 3;
  const hasOverflow = tier.summary.length > maxVisible;
  const visibleSummary = expanded ? tier.summary : tier.summary.slice(0, maxVisible);

  return (
    <article
      className={`rounded-3xl border bg-white p-5 ${
        selected ? "border-gray-900" : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-950">{tier.name}</h2>
          <p className="mt-2 text-2xl font-bold text-gray-950">
            ₩{tier.price.toLocaleString()}
            <span className="ml-1 text-sm font-medium text-gray-500">/월</span>
          </p>
        </div>
        {tier.badge && (
          <span className="rounded-full bg-gray-900 px-2.5 py-1 text-[11px] font-semibold text-white">
            {tier.badge}
          </span>
        )}
      </div>

      <div className="mt-5 space-y-2 text-[13px] leading-5 text-gray-800">
        {visibleSummary.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>

      {(hasOverflow || tier.details.length > 0) && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-4 text-sm font-medium text-gray-500 underline underline-offset-2"
        >
          {expanded ? "접기" : "자세히 보기"}
        </button>
      )}

      {expanded && (
        <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-[13px] leading-5 text-gray-600">
          {hasOverflow &&
            tier.summary.slice(maxVisible).map((item) => <p key={item}>{item}</p>)}
          {tier.details.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={onSelect}
        className={`mt-5 w-full rounded-2xl px-4 py-3 text-sm font-semibold transition ${
          selected
            ? "bg-gray-900 text-white hover:bg-black"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        구독하기
      </button>
    </article>
  );
}

function PlanChangeModal({
  selectedTierId,
  onClose,
  onSelect,
}: {
  selectedTierId: string;
  onClose: () => void;
  onSelect: (tierId: string) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[430px] rounded-[28px] bg-gray-50 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <p className="text-lg font-semibold text-gray-950">플랜 변경</p>
            <p className="mt-1 text-sm text-gray-500">원하는 멤버십 플랜을 선택하세요.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition hover:bg-white hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[72vh] overflow-y-auto px-4 py-4">
          <div className="grid gap-4">
            {membershipTiers.map((tier) => (
              <PlanChangeCard
                key={tier.id}
                tier={tier}
                selected={tier.id === selectedTierId}
                onSelect={() => {
                  onSelect(tier.id);
                  onClose();
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MembershipSelect() {
  const { id } = useParams();
  const post = id ? getPostById(Number(id)) : null;
  const minimumPrice = post?.monthlyPrice ?? 0;
  const defaultTier =
    membershipTiers.find((tier) => tier.price >= minimumPrice) ??
    membershipTiers.find((tier) => tier.id === "gold") ??
    membershipTiers[0];

  const [selectedTierId, setSelectedTierId] = useState(defaultTier.id);
  const [showPlanChange, setShowPlanChange] = useState(false);
  const [agreements, setAgreements] = useState({
    purchase: false,
    finance: false,
    autoPay: false,
    privacy: false,
  });

  const selectedTier =
    membershipTiers.find((tier) => tier.id === selectedTierId) ?? defaultTier;

  const paymentFee = useMemo(() => Math.round(selectedTier.price * 0.1), [selectedTier.price]);
  const totalPrice = selectedTier.price + paymentFee;
  const allAgreed = Object.values(agreements).every(Boolean);

  const toggleAgreement = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      <main className="max-w-[430px] mx-auto px-4 py-6">
        <div className="rounded-[28px] bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-950">주문 정보</h1>

          <section className="mt-6 rounded-[24px] border border-gray-200 p-4">
            <p className="text-sm text-gray-500">선택한 멤버십</p>
            <h2 className="mt-3 text-xl font-semibold text-gray-950">{selectedTier.name}</h2>
            <p className="mt-2 text-2xl font-bold text-gray-950">
              ₩{selectedTier.price.toLocaleString()}
              <span className="ml-1 text-sm font-medium text-gray-500">/월</span>
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-[13px]">
              {(selectedTier.metrics ?? defaultTier.metrics ?? []).map(([label, value, sub]) => (
                <div
                  key={`${label}-${value}`}
                  className={`rounded-2xl bg-gray-50 px-3 py-3 ${label === "1:1 채팅" ? "col-span-2" : ""}`}
                >
                  <p className="text-gray-500">{label}</p>
                  <p className="mt-1 text-lg font-semibold text-gray-950">{value}</p>
                  {sub ? <p className="mt-1 text-gray-500">{sub}</p> : null}
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-4 text-sm">
              <button type="button" className="font-medium text-gray-700 underline underline-offset-2">
                혜택 보기
              </button>
              <button
                type="button"
                onClick={() => setShowPlanChange(true)}
                className="font-medium text-gray-700 underline underline-offset-2"
              >
                플랜 변경하기
              </button>
            </div>
          </section>

          <section className="mt-5 rounded-[24px] border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-950">결제수단</p>
            <div className="mt-3 rounded-2xl bg-gray-50 px-4 py-4 text-sm leading-6 text-gray-600">
              <p>결제 수단을 사용하려면</p>
              <p>본인인증이 필요합니다.</p>
            </div>
          </section>

          <section className="mt-5 rounded-[24px] border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-950">결제상세</p>
            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between text-gray-950">
                <span>총 주문가격</span>
                <span className="font-semibold">₩{selectedTier.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>플랜 가격(월 정기결제)</span>
                <span>₩{selectedTier.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Payment fee & tax</span>
                <span>₩{paymentFee.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-gray-950">
                <span>오늘 결제금액</span>
                <span className="font-semibold">₩{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-gray-950">
                <span>2026-04-30 결제예정</span>
                <span className="font-semibold">₩{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </section>

          <section className="mt-5 rounded-[24px] border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-950">멤버십 취소/환불 규정</p>
            <div className="mt-4 space-y-2 text-[13px] leading-5 text-gray-600">
              <p>이 멤버십 플랜은 2026-04-30에 자동 갱신됩니다.</p>
              <p>언제든지 플랜을 변경 또는 취소할 수 있습니다.</p>
              <p>가입일로부터 7일 이내에 플랜 업그레이드 시 차액결제 후 바로 업그레이드된 플랜으로 구독합니다.</p>
              <p>등록한 카드로 결제되며, 구매와 동시에 포스트 열람이 가능한 멤버십 특성 상, 구매 후 취소/환불이 불가능합니다.</p>
              <p>카드 등록 후 월 정기 구독료는 등록하신 카드로 자동 결제됩니다.</p>
            </div>
          </section>

          <section className="mt-5 rounded-[24px] border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-950">결제 진행 필수 동의</p>
            <div className="mt-4 space-y-4 text-[13px] leading-5 text-gray-700">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreements.purchase}
                  onChange={() => toggleAgreement("purchase")}
                  className="mt-0.5 h-4 w-4"
                />
                <span>구매할 상품의 결제 조건을 확인하였으며, 구매에 동의합니다 (필수)</span>
              </label>
              <div className="flex items-start justify-between gap-3">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreements.finance}
                    onChange={() => toggleAgreement("finance")}
                    className="mt-0.5 h-4 w-4"
                  />
                  <span>전자금융거래 이용약관 동의 (필수)</span>
                </label>
                <button type="button" className="shrink-0 text-sm text-gray-500 underline underline-offset-2">
                  약관 보기
                </button>
              </div>
              <div className="flex items-start justify-between gap-3">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreements.autoPay}
                    onChange={() => toggleAgreement("autoPay")}
                    className="mt-0.5 h-4 w-4"
                  />
                  <span>자동결제 서비스 이용약관 동의 (필수)</span>
                </label>
                <button type="button" className="shrink-0 text-sm text-gray-500 underline underline-offset-2">
                  약관 보기
                </button>
              </div>
              <div className="flex items-start justify-between gap-3">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreements.privacy}
                    onChange={() => toggleAgreement("privacy")}
                    className="mt-0.5 h-4 w-4"
                  />
                  <span>개인정보 제공 및 위탁 안내 동의 (필수)</span>
                </label>
                <button type="button" className="shrink-0 text-sm text-gray-500 underline underline-offset-2">
                  약관 보기
                </button>
              </div>
            </div>
          </section>

          <button
            type="button"
            disabled={!allAgreed}
            className={`mt-6 w-full rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              allAgreed
                ? "bg-gray-900 text-white hover:bg-black"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            결제하고 포스트 열기
          </button>
        </div>
      </main>

      {showPlanChange && (
        <PlanChangeModal
          selectedTierId={selectedTierId}
          onClose={() => setShowPlanChange(false)}
          onSelect={setSelectedTierId}
        />
      )}
    </div>
  );
}
