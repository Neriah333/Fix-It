// app/post/[id]/page.tsx

async function getSinglePost(id: string) {
  // Use your backend's actual URL
  const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
    cache: 'no-store' // This ensures you always get fresh data from Mongoose
  });

  if (!res.ok) {
    // This will trigger the closest error.tsx file
    return null; 
  }

  return res.json();
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  // In Next.js 15, you MUST await params
  const { id } = await params;
  
  // Now getSinglePost will be found!
  const post = await getSinglePost(id);

  if (!post) return <div className="text-white">Post not found</div>;

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.content}</p>
    </div>
  );
}