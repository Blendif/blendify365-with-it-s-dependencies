import React, { useState } from 'react';

const EbookUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    fetch('http://localhost:5000/upload-ebook', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => setMessage(data.message))
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Upload Ebook</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <label className="block text-lg mb-2">Title</label>
        <input 
          type="text" 
          className="w-full p-2 border" 
          placeholder="Enter ebook title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="block text-lg mt-4 mb-2">Description</label>
        <textarea 
          className="w-full p-2 border" 
          rows="4" 
          placeholder="Ebook description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="block text-lg mt-4 mb-2">Upload File</label>
        <input 
          type="file" 
          className="w-full p-2" 
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
          Upload Ebook
        </button>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </form>
    </div>
  );
};

  const [modalOpen, setModalOpen] = useState(false);
const [selectedEbook, setSelectedEbook] = useState(null);

const handlePreview = (ebook) => {
  setSelectedEbook(ebook);
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};

// In the render section
<Modal isOpen={modalOpen} content={selectedEbook} closeModal={closeModal} />

export default EbookUpload;
