import React from 'react';

const EbookPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Ebook Title</h1>

      <div className="flex flex-col md:flex-row items-center">
        <img src="/ebook-cover.jpg" alt="Ebook" className="h-64 w-64 object-cover rounded-lg mb-4 md:mb-0" />
        <div className="md:ml-8">
          <h2 className="text-2xl font-semibold">Author: John Doe</h2>
          <p className="mt-4 text-gray-700">Description of the ebook goes here...</p>
          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg">Buy Now - $9.99</button>
        </div>
      </div>
    </div>
  );
};

export default EbookPage;
