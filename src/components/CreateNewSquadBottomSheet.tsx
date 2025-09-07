import React, { useState } from "react";
import { X } from "lucide-react";

interface CreateNewSquadBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSquad: (squadData: { name: string; description: string }) => void;
}

export const CreateNewSquadBottomSheet: React.FC<
  CreateNewSquadBottomSheetProps
> = ({ isOpen, onClose, onCreateSquad }) => {
  const [squadName, setSquadName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (squadName.trim() && description.trim()) {
      onCreateSquad({
        name: squadName.trim(),
        description: description.trim(),
      });
      setSquadName("");
      setDescription("");
      onClose();
    }
  };

  const handleClose = () => {
    setSquadName("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#00000090]" onClick={handleClose} />

      {/* Bottom Sheet */}
      <div className="relative w-full bg-white rounded-t-3xl max-h-[70vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold font-display text-black">
            Create New Squad
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Squad Name */}
          <div>
            <label className="block text-sm font-medium font-display text-gray-700 mb-2">
              Squad Name
            </label>
            <input
              type="text"
              value={squadName}
              onChange={(e) => setSquadName(e.target.value)}
              placeholder="Enter squad name..."
              className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium font-display text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your squad's mission..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors resize-none"
              required
            />
          </div>

          {/* Create Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gray-500 text-white font-medium font-display rounded-xl hover:bg-gray-600 transition-colors"
          >
            Create Squad
          </button>
        </form>
      </div>
    </div>
  );
};
