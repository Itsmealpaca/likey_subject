import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Image, Video, X, Upload, Lock, Globe, Users } from "lucide-react";

export function CreatePost() {
  const [content, setContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<"public" | "membership" | "paid">("public");
  const [membershipTier, setMembershipTier] = useState("basic");
  const [individualPrice, setIndividualPrice] = useState("");
  const [enablePurchase, setEnablePurchase] = useState(false);

  const handleFileSelect = () => {
    // Mock file selection
    const mockFiles = [
      "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop",
    ];
    setSelectedFiles([...selectedFiles, mockFiles[selectedFiles.length % 2]]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>취소</span>
          </Link>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
            게시하기
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Text Input */}
          <div className="p-6 border-b">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="무슨 일이 일어나고 있나요?"
              className="w-full h-48 resize-none outline-none text-lg"
            />
          </div>

          {/* Media Preview */}
          {selectedFiles.length > 0 && (
            <div className="p-6 border-b">
              <div className="grid grid-cols-2 gap-4">
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
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Media Buttons */}
          <div className="p-6 border-b">
            <p className="text-sm font-medium text-gray-700 mb-3">미디어 추가</p>
            <div className="flex gap-3">
              <button
                onClick={handleFileSelect}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <Image className="w-5 h-5 text-gray-600" />
                <span>사진</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Video className="w-5 h-5 text-gray-600" />
                <span>영상</span>
              </button>
            </div>
          </div>

          {/* Visibility Settings */}
          <div className="p-6 border-b">
            <h3 className="font-semibold mb-4">공개 범위</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border-2 border-blue-500 bg-blue-50 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={(e) => setVisibility(e.target.value as any)}
                  className="w-4 h-4"
                />
                <Globe className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">전체 공개</p>
                  <p className="text-sm text-gray-600">누구나 볼 수 있습니다</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="visibility"
                  value="membership"
                  checked={visibility === "membership"}
                  onChange={(e) => setVisibility(e.target.value as any)}
                  className="w-4 h-4"
                />
                <Users className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="font-medium">멤버십 전용</p>
                  <p className="text-sm text-gray-600">구독자만 볼 수 있습니다</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="visibility"
                  value="paid"
                  checked={visibility === "paid"}
                  onChange={(e) => setVisibility(e.target.value as any)}
                  className="w-4 h-4"
                />
                <Lock className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="font-medium">유료 판매</p>
                  <p className="text-sm text-gray-600">개별 구매 가능</p>
                </div>
              </label>
            </div>
          </div>

          {/* Membership Tier Selection */}
          {visibility === "membership" && (
            <div className="p-6 border-b bg-gray-50">
              <h3 className="font-semibold mb-4">멤버십 Tier 선택</h3>
              <select
                value={membershipTier}
                onChange={(e) => setMembershipTier(e.target.value)}
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
            </div>
          )}

          {/* Individual Purchase Settings */}
          {visibility === "paid" && (
            <div className="p-6 bg-gray-50">
              <h3 className="font-semibold mb-4">개별 구매 설정</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  판매 가격 (하트)
                </label>
                <input
                  type="number"
                  value={individualPrice}
                  onChange={(e) => setIndividualPrice(e.target.value)}
                  placeholder="100"
                  className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <label className="flex items-center gap-3 p-4 bg-white border rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={enablePurchase}
                  onChange={(e) => setEnablePurchase(e.target.checked)}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-medium">개별 구매 활성화</p>
                  <p className="text-sm text-gray-600">
                    멤버십이 없는 사용자도 개별 구매 가능
                  </p>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Preview Button */}
        <div className="mt-6 text-center">
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            미리보기
          </button>
        </div>
      </main>
    </div>
  );
}