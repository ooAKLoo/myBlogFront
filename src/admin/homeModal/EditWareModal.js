import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../modifier/LoadingSpinner ';
// const editSoftwareUrl = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_HOME_SOFTWARE_EDIT.replace('{software_id}', actualSoftwareId)}`;
// const deleteHardwareUrl = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_HOME_HARDWARE_DELETE.replace('{hardware_id}', actualHardwareId)}`;


const EditWareModal = ({ apiPath,queryApiPath }) => {
  const [softwareList, setSoftwareList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSoftwareList = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${queryApiPath}`);
        if (response.ok) {
          const data = await response.json();
          // Add an `id` to each item for key prop usage
          const editableData = data.map((item, index) => ({ ...item, id: index }));
          setSoftwareList(editableData);
        } else {
          throw new Error('Failed to fetch software list');
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSoftwareList();
  }, []);

  const handleEdit = (id, key, value) => {
    const updatedList = softwareList.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: value };
      }
      return item;
    });
    setSoftwareList(updatedList);
  };

  const handleDelete = (id) => {
    // Update the local state to remove the item
    const updatedList = softwareList.filter(item => item.id !== id);
    setSoftwareList(updatedList);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true); // 开始提交, 显示处理中状态
    // 准备JSON数据，从softwareList状态中移除id字段
    const dataWithoutIds = softwareList.map(({ id, ...rest }) => rest);
    const data = JSON.stringify(dataWithoutIds);
    console.log("data=", data);

    // Implement your submission logic here, e.g., PUT or POST request to your backend
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${ apiPath }`, {
        method: 'PUT', // Assuming your backend uses PUT for edits/updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
      if (!response.ok) throw new Error('Failed to submit software list updates');
      // You might want to refresh the list or show a success message here
    } catch (error) {
      console.error(error.message);
      // Optionally, handle user notification here
    } finally {
      setIsSubmitting(false); // 完成提交, 隐藏处理中状态
    }
  };


  return (
    <div className="overflow-auto h-full">
      {softwareList.map((software) => (
        <div key={software.id} className="p-4 border-b space-y-2">
          {/* URL in its own row */}
          <div className="flex items-center justify-between">
            <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
              URL:
            </label>
            <input
              type="text"
              value={software.url}
              onChange={(e) => handleEdit(software.id, 'url', e.target.value)}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
            />
          </div>
          {/* Other attributes in another row */}
          <div className="flex flex-wrap items-center justify-between">
            {Object.entries(software).map(([key, value]) => {
              if (key !== 'id' && key !== 'url') { // Exclude `id` and `url` from the editable fields
                return (
                  <div key={key} className="flex-1 min-w-0 mr-2 last:mr-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2 capitalize truncate">
                      {key}:
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleEdit(software.id, key, e.target.value)}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
          <button
            onClick={() => handleDelete(software.id)}
            className=" right-2 top-2 text-red-500 hover:text-red-700"
          >
            ✖
          </button>
        </div>

      ))}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner />
          </>
        ) :
          'Submit Changes'
        }
      </button>
    </div>
  );
};

export default EditWareModal;
