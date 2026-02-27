export default function Comment({ author, text, createdAt }: any) {
  return (
    <div className="flex gap-3 my-4 group">
      {/* The "Thread Line" on the left */}
      <div className="flex flex-col items-center">
        <div className="w-7 h-7 rounded-full bg-gray-600 mb-1" /> {/* User Avatar */}
        <div className="w-[2px] grow bg-[#2D3739] group-hover:bg-gray-500 transition-colors" />
      </div>

      <div className="flex-1">
        {/* Comment Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-white">u/{author?.username}</span>
          <span className="text-[10px] text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Comment Body */}
        <p className="text-sm text-gray-200 leading-relaxed">{text}</p>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-2 text-gray-400 font-bold text-xs">
          <button className="hover:bg-[#2A3C42] p-1 rounded">Reply</button>
          <button className="hover:bg-[#2A3C42] p-1 rounded">Share</button>
        </div>
      </div>
    </div>
  );
}