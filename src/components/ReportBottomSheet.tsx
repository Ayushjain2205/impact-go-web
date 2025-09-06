import React, { useRef } from "react";

interface ReportBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoTaken: (photoDataUrl: string) => void;
}

export const ReportBottomSheet: React.FC<ReportBottomSheetProps> = ({
  isOpen,
  onClose,
  onPhotoTaken,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTakePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onPhotoTaken(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

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
        style={{ maxHeight: "70vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
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

        {/* Content */}
        <div className="px-6 py-8 text-center">
          {/* Camera Icon */}
          <div className="w-20 h-20 bg-[var(--color-impact-green)] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>

          {/* Main Text */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Capture the Issue
          </h3>
          <p className="text-gray-600 mb-8">
            Take a photo to report a civic issue
          </p>

          {/* Take Photo Button */}
          <button
            onClick={handleTakePhoto}
            className="w-full bg-[var(--color-impact-green)] text-white py-4 px-6 rounded-2xl font-semibold text-base flex items-center justify-center gap-3 hover:bg-[var(--color-impact-green-dark)] transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span>Take Photo</span>
          </button>

          {/* Hidden file input for camera */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </>
  );
};
