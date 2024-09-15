import React from 'react';

const Modal = ({ isOpen, content, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">{content.title}</h2>
        <p>{content.description}</p>
        <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Close</button>
      </div>
    </div>
  );
};

export default Modal;
