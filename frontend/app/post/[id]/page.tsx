// app/post/[id]/page.tsx
import Navbar from '@/components/Home/navbar';
import Menubar from '@/components/Home/menu';

export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#0B1416]">
      <div className="flex max-w-[1400px] mx-auto">
        <Menubar />
        
        <main className="flex-1 p-4 flex justify-center">
          <div className="max-w-[800px] w-full bg-[#1A282D] rounded-xl border border-[#2D3739] p-6">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
              <span>Posted by u/username</span>
              <span>• 5 hours ago</span>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Detailed view for post {params.id}
            </h1>
            
            <p className="text-gray-200 mb-6">
              This is where the full text of the post goes. On this page, users can see all 
              the comments and nested replies.
            </p>

            {/* Comment Input Placeholder */}
            <div className="border border-[#2D3739] rounded-md p-4 mb-8">
              <p className="text-gray-500 text-sm">Comment as User...</p>
              <div className="flex justify-end mt-10">
                <button className="bg-[#D7DADC] text-black px-4 py-1 rounded-full font-bold text-sm">
                  Comment
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
               <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-xs font-bold text-white">helpful_user • 2h ago</p>
                    <p className="text-sm text-gray-300">This is a top-level comment reply!</p>
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}