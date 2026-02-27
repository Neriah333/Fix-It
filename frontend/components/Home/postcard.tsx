import { MessageSquare, ArrowBigUp, ArrowBigDown, Share2, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

interface PostProps {
  id: string;
  community: string;
  author: string;
  title: string;
  content?: string;
  image?: string;
}

export default function PostCard({ id, community, author, title, content, image }: PostProps) {
  return (
    <div className="bg-[#1A282D] border border-[#2D3739] hover:border-[#444E50] rounded-xl mb-3 transition-colors cursor-pointer group">
      <Link href={`/post/${id}`}>
        <div className="p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-orange-600" />
              <span className="text-xs font-bold text-white hover:underline">r/{community}</span>
              <span className="text-xs text-gray-500">• 2h ago</span>
            </div>
            <button className="bg-[#D7DADC] text-black text-xs font-bold px-4 py-1 rounded-full hover:bg-white">
              Join
            </button>
          </div>

          {/* Title & Content */}
          <h2 className="text-lg font-semibold text-white mb-2 leading-tight">{title}</h2>
          {content && <p className="text-sm text-gray-300 line-clamp-3 mb-3">{content}</p>}

          {/* Optional Image (Like the Kilo Ad) */}
          {image && (
            <div className="rounded-lg overflow-hidden border border-[#2D3739] bg-black mb-3">
              <img src={image} alt="post content" className="w-full h-auto object-cover max-h-[512px]" />
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#2A3C42] rounded-full p-1">
              <button className="p-1 hover:bg-[#344449] rounded-full text-gray-400 hover:text-orange-500">
                <ArrowBigUp className="w-6 h-6" />
              </button>
              <span className="text-xs font-bold text-white px-1">1.2k</span>
              <button className="p-1 hover:bg-[#344449] rounded-full text-gray-400 hover:text-blue-500">
                <ArrowBigDown className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center bg-[#2A3C42] px-3 py-1.5 rounded-full text-gray-300 gap-2 hover:bg-[#344449]">
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs font-bold">45</span>
            </div>

            <div className="flex items-center bg-[#2A3C42] px-3 py-1.5 rounded-full text-gray-300 gap-2 hover:bg-[#344449]">
              <Share2 className="w-4 h-4" />
              <span className="text-xs font-bold">Share</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}