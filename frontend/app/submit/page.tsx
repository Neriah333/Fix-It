"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SubmitPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          
         },
        
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        router.push('/'); // Redirect to home to see the new PostCard
      } else {
        console.error("Server responded with an error");
      }
    } catch (error) {
      console.error("Failed to send post:", error);
  }
  };

  return (
    <div className="max-w-2xl mx-auto pt-10 px-4">
      <h1 className="text-white text-xl font-bold mb-4 border-b border-[#2D3739] pb-2">Create a post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#1A282D] p-4 rounded-md border border-[#2D3739]">
        <input 
          className="bg-[#0B1416] text-white p-2 rounded border border-[#2D3739] outline-none focus:border-white"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea 
          className="bg-[#0B1416] text-white p-2 rounded border border-[#2D3739] outline-none focus:border-white min-h-[150px]"
          placeholder="Text (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="px-4 py-2 text-white font-bold hover:bg-[#2D3739] rounded-full"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-4 py-2 bg-[#D7DADC] text-black font-bold rounded-full hover:bg-white transition"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}