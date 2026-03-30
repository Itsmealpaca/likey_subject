import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Image, Video, X, Globe, Users, Heart } from "lucide-react";

export function CreatePost() {
  const [content, setContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<"public" | "membership">("public");
  const [membershipTier, setMembershipTier] = useState("basic");
  const [individualPrice, setIndividualPrice] = useState("");
  const [allowPurchase, setAllowPurchase] = useState(false);

  const handleFileSelect = () => {
    const mockFiles = [
      "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop",
    ];
    setSelectedFiles([...selectedFiles, mockFiles[selectedFiles.length % 2]]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const optionClass = (active: boolean) =>
    active
      ? "flex items-center gap-3 p-4 border-2 border-blue-500 bg-blue-50 rounded-lg cursor-pointer"
      : "flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-[430px] mx-auto px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            <span>취소</span>
          </Link>
        </div>
      </header>

      <main className="max-w-[430px] mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-5 border-b">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="무슨 일이 일어나고 있나요?"
              className="w-full h-40 resize-none outline-none text-base leading-6"
            />
          </div>

          {selectedFiles.length > 0 && (
            <div className="p-5 border-b">
              <div className="grid grid-cols-2 gap-3">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={file}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center hover:bg-black transition"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-5 border-b">
            <p className="text-sm font-medium text-gray-700 mb-3">미디어 추가</p>
            <div className="flex gap-3">
              <button
                onClick={handleFileSelect}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
              >
                <Image className="w-4 h-4 text-gray-600" />
                <span>사진</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">
                <Video className="w-4 h-4 text-gray-600" />
                <span>영상</span>
              </button>
            </div>
          </div>

          <div className="p-5 border-b">
            <h3 className="font-semibold text-sm mb-4">공개 범위</h3>
            <div className="space-y-3">
              <label className={optionClass(visibility === "public")}>
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={() => setVisibility("public")}
                  className="w-4 h-4"
                />
                <Globe className={`w-5 h-5 ${visibility === "public" ? "text-blue-600" : "text-gray-600"}`} />
                <div className="flex-1">
                  <p className="font-medium text-sm">전체 공개</p>
                  <p className="text-xs text-gray-600">누구나 볼 수 있습니다</p>
                </div>
              </label>

              <label className={optionClass(visibility === "membership")}>
                <input
                  type="radio"
                  name="visibility"
                  value="membership"
                  checked={visibility === "membership"}
                  onChange={() => setVisibility("membership")}
                  className="w-4 h-4"
                />
                <Users className={`w-5 h-5 ${visibility === "membership" ? "text-blue-600" : "text-gray-600"}`} />
                <div className="flex-1">
                  <p className="font-medium text-sm">멤버십 전용</p>
                  <p className="text-xs text-gray-600">구독자만 볼 수 있습니다</p>
                </div>
              </label>
            </div>
          </div>

          {visibility === "membership" && (
            <div className="p-5 border-b bg-gray-50">
              <h3 className="font-semibold text-sm mb-3">멤버십 Tier 선택</h3>
              <select
                value={membershipTier}
                onChange={(e) => setMembershipTier(e.target.value)}
                className="w-full p-3 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
            </div>
          )}

          {visibility === "membership" && (
            <div className="p-5 bg-gray-50">
              <div className="rounded-[24px] border border-gray-200 bg-white p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowPurchase}
                    onChange={(e) => {
                      setAllowPurchase(e.target.checked);
                      if (!e.target.checked) setIndividualPrice("");
                    }}
                    className="mt-0.5 w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-gray-700" />
                      <p className="font-medium text-sm">개별 구매 허용</p>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">
                      멤버십이 없는 사용자도 이 포스트만 구매할 수 있습니다
                    </p>
                  </div>
                </label>

                {allowPurchase && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      판매 가격 (하트)
                    </label>
                    <input
                      type="number"
                      value={individualPrice}
                      onChange={(e) => setIndividualPrice(e.target.value)}
                      placeholder="100"
                      className="w-full p-3 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <button className="w-full bg-blue-600 text-white px-5 py-3 rounded-xl text-sm hover:bg-blue-700 transition font-semibold">
            게시하기
          </button>
        </div>
      </main>
    </div>
  );
}
