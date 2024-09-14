import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Welcome to Blendify365</h1>

      {/* Featured Ebooks Section */}
      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Ebooks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <img src="/ebook-cover.jpg" alt="Ebook" className="h-48 w-full object-cover rounded-lg" />
            <h3 className="text-xl font-semibold mt-4">Ebook Title</h3>
            <p className="mt-2 text-gray-600">Brief description of the ebook...</p>
            <Link to="/ebooks/1" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg">View More</Link>
          </div>
        </div>
      </section>

      {/* Affiliate Products Section */}
      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-4">Top Affiliate Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <img src="/product-image.jpg" alt="Product" className="h-48 w-full object-cover rounded-lg" />
            <h3 className="text-xl font-semibold mt-4">Product Name</h3>
            <p className="mt-2 text-gray-600">Product description goes here...</p>
            <a href="https://affiliatelink.com" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-lg">Buy Now</a>
          </div>
        </div>
      </section>

      {/* Freelancing Services Section */}
      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-4">Freelancing Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mt-4">Proofreading Services</h3>
            <p className="mt-2 text-gray-600">Get high-quality proofreading services...</p>
            <Link to="/services/proofreading" className="mt-4 inline-block bg-purple-500 text-white px-4 py-2 rounded-lg">Order Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
