import React, { useState } from 'react';

const AdminDashboard = () => {
  const [contentType, setContentType] = useState('ebooks');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Admin Dashboard</h1>

      {/* Section Tabs */}
      <div className="flex justify-around my-6">
        <button 
          className={`text-xl ${contentType === 'ebooks' ? 'text-blue-500' : 'text-gray-600'}`} 
          onClick={() => setContentType('ebooks')}>
          Ebooks
        </button>
        <button 
          className={`text-xl ${contentType === 'services' ? 'text-blue-500' : 'text-gray-600'}`} 
          onClick={() => setContentType('services')}>
          Services
        </button>
        <button 
          className={`text-xl ${contentType === 'articles' ? 'text-blue-500' : 'text-gray-600'}`} 
          onClick={() => setContentType('articles')}>
          Blog Articles
        </button>
        <button 
          className={`text-xl ${contentType === 'wallpapers' ? 'text-blue-500' : 'text-gray-600'}`} 
          onClick={() => setContentType('wallpapers')}>
          Wallpapers
        </button>
      </div>

      {/* Upload Forms */}
      {contentType === 'ebooks' && <EbookUpload />}
      {contentType === 'services' && <ServiceUpload />}
      {contentType === 'articles' && <BlogUpload />}
      {contentType === 'wallpapers' && <WallpaperUpload />}
    </div>
  );
};

// Separate Components for Uploads (Add forms for each)
const EbookUpload = () => (
  <div>
    <h2 className="text-2xl font-semibold">Upload Ebook</h2>
    <form className="mt-4">
      <label className="block text-lg mb-2">Title</label>
      <input type="text" className="w-full p-2 border" placeholder="Enter ebook title" />
      <label className="block text-lg mt-4 mb-2">Description</label>
      <textarea className="w-full p-2 border" rows="4" placeholder="Ebook description"></textarea>
      <label className="block text-lg mt-4 mb-2">Upload File</label>
      <input type="file" className="w-full p-2" />
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Upload Ebook</button>
    </form>
  </div>
);

const ServiceUpload = () => (
  <div>
    <h2 className="text-2xl font-semibold">Upload Service</h2>
    <form className="mt-4">
      <label className="block text-lg mb-2">Service Title</label>
      <input type="text" className="w-full p-2 border" placeholder="Enter service title" />
      <label className="block text-lg mt-4 mb-2">Description</label>
      <textarea className="w-full p-2 border" rows="4" placeholder="Service description"></textarea>
      <label className="block text-lg mt-4 mb-2">Service Price ($)</label>
      <input type="number" className="w-full p-2 border" placeholder="Enter service price" />
      <button type="submit" className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg">Upload Service</button>
    </form>
  </div>
);

const BlogUpload = () => (
  <div>
    <h2 className="text-2xl font-semibold">Upload Blog Article</h2>
    <form className="mt-4">
      <label className="block text-lg mb-2">Article Title</label>
      <input type="text" className="w-full p-2 border" placeholder="Enter article title" />
      <label className="block text-lg mt-4 mb-2">Content</label>
      <textarea className="w-full p-2 border" rows="8" placeholder="Article content"></textarea>
      <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">Upload Article</button>
    </form>
  </div>
);

const WallpaperUpload = () => (
  <div>
    <h2 className="text-2xl font-semibold">Upload Wallpaper</h2>
    <form className="mt-4">
      <label className="block text-lg mb-2">Title</label>
      <input type="text" className="w-full p-2 border" placeholder="Enter wallpaper title" />
      <label className="block text-lg mt-4 mb-2">Upload Image</label>
      <input type="file" className="w-full p-2" />
      <button type="submit" className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg">Upload Wallpaper</button>
    </form>
  </div>
);

export default AdminDashboard;
