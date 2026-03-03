// components/PostCard.tsx
import Link from 'next/link';

export default function PostCard({ title, content, reactions, comments, author, createdAt, id }: any) {
  return (
    <Link href={`/post/${id}`} className="block">
      <div className="bg-[#1A282D] border border-[#2D3739] p-4 rounded-xl mb-3 hover:bg-[#22303A] transition">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-blue-500" />
          <span className="text-xs font-bold text-white">{author?.username || 'anonymous'}</span>
          <span className="text-xs text-gray-500">• {new Date(createdAt).toLocaleDateString()}</span>
        </div>

        <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-300 line-clamp-3 mb-4">{content}</p>

        <div className="flex gap-4">
          <div className="flex items-center bg-[#2A3C42] px-3 py-1 rounded-full text-white text-xs font-bold gap-2">
            <span>🔥 {reactions?.length || 0}</span>
          </div>
          <div className="flex items-center bg-[#2A3C42] px-3 py-1 rounded-full text-white text-xs font-bold gap-2">
            <span>💬 {comments?.length || 0} Comments</span>
          </div>
        </div>
      </div>
    </Link>
  );
}