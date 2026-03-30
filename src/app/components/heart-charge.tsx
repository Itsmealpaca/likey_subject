import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import { getPostById } from "../data/posts";

const currentHearts = 0;

const chargeOptions = [
  { hearts: 10, originalPrice: 2500, salePrice: 1800 },
  { hearts: 50, originalPrice: 7500, salePrice: 5500 },
  { hearts: 100, originalPrice: 16000, salePrice: 11000 },
  { hearts: 500, originalPrice: 79000, salePrice: 55000 },
  { hearts: 1000, originalPrice: 159000, salePrice: 110000 },
  { hearts: 3000, originalPrice: 450000, salePrice: 330000 },
  { hearts: 5000, originalPrice: 750000, salePrice: 550000 },
  { hearts: 8000, originalPrice: 1190000, salePrice: 880000 },
];

export function HeartCharge() {
  const { id } = useParams();
  const post = getPostById(Number(id));
  const needed = Math.max((post.heartPrice ?? 0) - currentHearts, 0);
  const defaultOption =
    chargeOptions.find((option) => option.hearts >= needed) ?? chargeOptions[0];
  const [selectedHearts, setSelectedHearts] = useState(defaultOption.hearts);

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
          <h1 className="text-2xl font-bold text-gray-950">하트 충전</h1>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-[24px] bg-rose-50 p-4">
              <p className="text-sm text-rose-700">상품 선택함. 현재</p>
              <p className="mt-2 text-2xl font-bold text-rose-700">{needed.toLocaleString()}</p>
              <p className="mt-1 text-sm text-rose-700">부족함.</p>
            </div>
            <div className="rounded-[24px] bg-gray-50 p-4">
              <p className="text-sm text-gray-500">나의 하트</p>
              <p className="mt-2 text-2xl font-bold text-gray-950">{currentHearts.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {chargeOptions.map((option) => {
              const selected = selectedHearts === option.hearts;

              return (
                <button
                  key={option.hearts}
                  type="button"
                  onClick={() => setSelectedHearts(option.hearts)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition ${
                    selected
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm font-semibold text-gray-950">
                    {option.hearts.toLocaleString()} 하트
                  </span>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 line-through">
                      ₩{option.originalPrice.toLocaleString()}
                    </p>
                    <p className="text-sm font-semibold text-gray-950">
                      ₩{option.salePrice.toLocaleString()}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 rounded-[24px] bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-950">구매 전 안내를 확인해주세요.</p>
          <div className="mt-4 space-y-2 text-[13px] leading-5 text-gray-600">
            <p>하트의 유효기간은 마지막 사용일로부터 5년까지입니다.</p>
            <p>기타 수수료 10%가 포함된 금액입니다.</p>
            <p>PayPal로 결제 시 미국 달러를 이용하며 환손실 및 환전 수수료 등을 감안한 추가 수수료가 부과됩니다.</p>
            <p>PayPal을 이용하여 1만원 미만 결제 시 추가 수수료가 부과됩니다.</p>
            <p>결제 관련 문의는 LIKEY 고객센터를 이용해주세요.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
