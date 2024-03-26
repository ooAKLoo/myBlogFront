import React, { useState, useEffect } from 'react';

const AddWareModal = ({ apiPath }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [cnName, setCnName] = useState('');
  const [enName, setEnName] = useState('');
  const [cnSlogan, setCnSlogan] = useState(''); // 中文Slogan状态
  const [enSlogan, setEnSlogan] = useState(''); // 英文Slogan状态
  const [releaseDate, setReleaseDate] = useState(''); // 发布日期状态
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile);
    }
    formData.append('cnName', cnName);
    formData.append('enName', enName);
    formData.append('cnSlogan', cnSlogan); // 添加中文Slogan到FormData
    formData.append('enSlogan', enSlogan); // 添加英文Slogan到FormData
    formData.append('date', releaseDate); // 添加发布日期到FormData

    const API_URL = `${process.env.REACT_APP_API_URL}${ apiPath }`;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('软硬件信息添加成功');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('提交失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  return (
    <div className="modal-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input type="file" onChange={handleImageChange} />
        {imagePreviewUrl && (
          <img src={imagePreviewUrl} alt="Preview" className="mt-4 w-32 h-32 object-cover" />
        )}
        <input type="text" value={cnName} onChange={(e) => setCnName(e.target.value)} placeholder="中文名称" className="mt-4 border-2" />
        <input type="text" value={enName} onChange={(e) => setEnName(e.target.value)} placeholder="English Name" className="mt-2 border-2" />
        <input type="text" value={cnSlogan} onChange={(e) => setCnSlogan(e.target.value)} placeholder="中文Slogan" className="mt-2 border-2" />
        <input type="text" value={enSlogan} onChange={(e) => setEnSlogan(e.target.value)} placeholder="English Slogan" className="mt-2 border-2" />
        <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} className="mt-2 border-2" />
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded" disabled={isSubmitting}>
          {isSubmitting ? "提交中..." : "提交"}
        </button>
      </form>
    </div>
  );
};

export default AddWareModal;
