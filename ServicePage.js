import React from 'react';

const ServicePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Proofreading Services</h1>

      <div className="flex flex-col md:flex-row items-center">
        <div className="md:ml-8">
          <h2 className="text-2xl font-semibold">Service Details</h2>
          <p className="mt-4 text-gray-700">We provide high-quality proofreading services for your projects...</p>
          <button className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg">Order Now - $20</button>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
