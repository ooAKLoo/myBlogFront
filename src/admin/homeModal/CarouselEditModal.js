import React, { useState, useEffect } from 'react';

const CarouselEditModal = () => {
  const [mode, setMode] = useState('add'); // 'add' 或 'edit'
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [jsonData, setJsonData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // 更新handleDelete函数以处理删除逻辑
  function handleDelete(index) {
    const newData = [...jsonData];
    newData.splice(index, 1);
    setJsonData(newData);
  }
  
  // 更新值变化的逻辑
  const handleValueChange = (index, key, newValue) => {
    const newData = [...jsonData];
    newData[index][key] = newValue;
    setJsonData(newData);
  };

  useEffect(() => {
    if (mode === 'edit') {
      const fetchData = async () => {
        setIsSubmitting(true);
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_HOME_CAROUSEL_QUERY}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setJsonData(data);
        } catch (error) {
          console.error('Failed to fetch data:', error);
        } finally {
          setIsSubmitting(false);
        }
      };

      fetchData();
    }
  }, [mode]);

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
  
    if (mode === 'add' && imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);
  
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_HOME_CAROUSEL_ADD}`, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) throw new Error('Failed to submit new carousel image');
        // Refresh data or show success message...
        alert("Carousel image added successfully!");
      } catch (error) {
        console.error('Error submitting new carousel image:', error);
      }
    } else if (mode === 'edit') {
      // 编辑模式下的提交逻辑
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_HOME_CAROUSEL_EDIT}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        });
        if (!response.ok) throw new Error('Failed to update carousel data');
        // Refresh data or show success message...
        alert("Carousel data updated successfully!");
      } catch (error) {
        console.error('Error updating carousel data:', error);
      }
    }
  
    setIsSubmitting(false);
  };
  


  return (
    <div className="modal-center flex flex-col items-center p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between w-full mb-4">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" onClick={() => setMode('add')}>添加</button>
        <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700" onClick={() => setMode('edit')}>编辑</button>
      </div>
      
      {mode === 'add' && (
        <div className="flex flex-col items-center w-full mb-4">
          <input type="file" className="mb-2" onChange={handleImageChange} />
          {imagePreviewUrl && (
            <img src={imagePreviewUrl} alt="Preview" className="w-32 h-32 object-cover mb-4" />
          )}
        </div>
      )}

      {mode === 'edit' && jsonData.map((item, index) => (
        <div key={index} className="flex justify-between items-center w-full mb-2">
          <div className="flex-1">
            {Object.entries(item).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="font-semibold">{`${key}:`}</span>
                <input 
                className="ml-2 flex-1"
                value={value} 
                onChange={(e) => handleValueChange(index, key, e.target.value)}
              />
              </div>
            ))}
          </div>
          <button className="ml-4  text-white p-1 rounded-full hover:bg-slate-200" onClick={() => handleDelete(index)}>❌</button>
        </div>
      ))}

      <div className="w-full flex justify-center mt-4">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? '提交中...' : '提交'}
        </button>
      </div>
    </div>
  );
};

export default CarouselEditModal;