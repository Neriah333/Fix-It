// app/page.tsx
import PostCard from '@/components/Home/postcard';

async function getAllPosts() {
  const res = await fetch('http://localhost:5000/api/posts', {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-[800px] mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Recent Posts</h1>

      {posts.length === 0 && <p className="text-gray-400">No posts yet</p>}

      <div className="space-y-4">
        {posts.map((post: any) => (
          <PostCard
            key={post._id}
            id={post._id}
            title={post.title}
            content={post.content}
            reactions={post.reactions}
            comments={post.comments}
            author={post.author}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
}