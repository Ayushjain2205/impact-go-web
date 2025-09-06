import React, { useState, useEffect, useRef } from "react";

interface CategorySelectionBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  photoDataUrl: string;
  onCategorySelect: (category: string) => void;
  onRetakePhoto: () => void;
}

export const CategorySelectionBottomSheet: React.FC<
  CategorySelectionBottomSheetProps
> = ({ isOpen, onClose, photoDataUrl, onCategorySelect, onRetakePhoto }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const selectedCategoryRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to selected category
  useEffect(() => {
    if (
      selectedCategory &&
      selectedCategoryRef.current &&
      scrollContainerRef.current
    ) {
      selectedCategoryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedCategory]);

  if (!isOpen) return null;

  const categories = [
    {
      id: "Potholes",
      name: "Potholes",
      icon: "🚧",
      reward: 50,
    },
    {
      id: "Waste",
      name: "Waste",
      icon: "🗑️",
      reward: 75,
    },
    {
      id: "Lights",
      name: "Lights",
      icon: "💡",
      reward: 40,
    },
    {
      id: "Safety",
      name: "Safety",
      icon: "⚠️",
      reward: 60,
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSubmit = () => {
    if (selectedCategory) {
      onCategorySelect(selectedCategory);
    }
  };

  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#00000090] z-30 transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-40 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Report Issue</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto max-h-96"
        >
          <div className="px-6 py-4">
            {/* Photo Preview */}
            <div className="relative mb-6">
              <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden">
                <img
                  src={photoDataUrl}
                  alt="Captured photo"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Remove/Retake Photo Button */}
              <button
                onClick={onRetakePhoto}
                className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Select Category */}
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Select Category
            </h3>

            {/* Category Options */}
            <div className="space-y-3 pb-4">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.id;
                return (
                  <div
                    key={category.id}
                    ref={isSelected ? selectedCategoryRef : null}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[var(--color-impact-green-light)] border-2 border-[var(--color-impact-green)] shadow-md"
                        : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <span className="font-medium text-gray-900">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCategorySelect(category.id);
                        }}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        Verify
                      </button>
                      <div className="flex items-center gap-1 text-yellow-600">
                        <span className="text-lg">🪙</span>
                        <span className="font-semibold">{category.reward}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Button - Sticky at bottom */}
        {selectedCategory && (
          <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100 shadow-lg">
            <button
              onClick={handleSubmit}
              className="w-full bg-[var(--color-impact-green)] text-white py-4 px-6 rounded-2xl font-semibold text-base flex items-center justify-center gap-3 hover:bg-[var(--color-impact-green-dark)] transition-colors"
            >
              <span className="text-lg">🪙</span>
              <span>Submit & Earn {selectedCategoryData?.reward} IMPACT</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
