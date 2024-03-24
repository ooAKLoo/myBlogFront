import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import AddBlogModalContent from './blogModal/AddBlogModalContent ';
import DeleteBlogModalContent from './blogModal/DeleteBlogModalContent ';
import EditBlogModalContent from './blogModal/EditBlogModalContent ';

const AdminPage = () => {
  const { user } = useAuth();
  // 使用一个对象来控制模态框的显示和类型
  const [modalInfo, setModalInfo] = useState({ isOpen: false, type: '', section: '' });

  // 为每个部分定义不同的操作
  const sectionOperations = {
    Home: ["S_Add", "Edit","H_Add"],
    Blog: ["Add", "Delete", "Edit"],
    About: ["Edit", "Query"],
  };

  // 打开模态框的函数
  const openModal = (type, section) => {
    setModalInfo({ isOpen: true, type, section });
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center">管理员页面</h2>
        <p className="text-xl text-gray-600 mt-4 text-center">欢迎, {user.username}!</p>
        <div className="space-y-10 mt-10">
          {Object.entries(sectionOperations).map(([title, operations]) => (
            <Section 
              key={title} 
              title={title} 
              operations={operations} 
              openModal={openModal} // 传递openModal函数到每个Section
            />
          ))}
        </div>
      </div>
      {modalInfo.isOpen && <Modal modalInfo={modalInfo} onClose={() => setModalInfo({ ...modalInfo, isOpen: false })} />}
    </div>
  );
};

const Section = ({ title, operations, openModal }) => (
  <div>
    <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
    <div className="mt-4 flex justify-between space-x-4">
      {operations.map(action => (
        <Card 
          key={action} 
          action={action} 
          icon={getIconForAction(action)} 
          onClick={() => openModal(action, title)}
        />
      ))}
    </div>
  </div>
);

const getIconForAction = (action) => {
  const icons = {
    Add: "➕",
    S_Add: "➕",
    H_Add: "➕",
    Delete: "🗑️",
    Edit: "✏️",
    Query: "🔍",
  };
  return icons[action];
};

const Card = ({ action, icon, onClick }) => (
  <div className="flex-1 p-4 bg-white rounded-lg shadow cursor-pointer" onClick={onClick}>
    <div className="flex items-center justify-center h-20 w-20 mx-auto bg-blue-500 text-white text-3xl rounded-full">
      {icon}
    </div>
    <p className="mt-2 text-center font-semibold">{action}</p>
  </div>
);

// 简单的模态框组件
const Modal = ({ modalInfo, onClose }) => {
  // 阻止模态框内部点击事件冒泡
  const stopPropagation = (e) => {
    e.stopPropagation();
  };


  // 根据modalInfo的不同渲染不同的内容
  const renderContent = () => {
    const { section, type } = modalInfo;
    if (section === 'Blog' && type === 'Add') {
      return (
        <>
          <AddBlogModalContent  />
          {/* 博客增加的表单或其他内容 */}
        </>
      );
    }else if (section === 'Blog' && type === 'Delete') {
      return (
        <>
          <DeleteBlogModalContent />
          {/* 博客删除的表单或其他内容 */}
        </>
      );
    } else if (section === 'Blog' && type === 'Edit') {
      return (
        <>
          <EditBlogModalContent />
          {/* 博客删除的表单或其他内容 */}
        </>
      );
    }else if (section === 'Home' && type === 'Delete') {
      return (
        <>
          <h2 className="text-xl font-bold">删除主页内容</h2>
          {/* 主页删除的确认或其他内容 */}
        </>
      );
    }
    // 可以继续添加其他情况的处理
    // 默认情况
    return <h2 className="text-xl font-bold">操作</h2>;
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      onClick={onClose}
    >
      <div 
          className="bg-white p-8 rounded-lg w-11/12 max-w-4xl h-1/2" 
        onClick={stopPropagation}
      >
        {renderContent()}
      </div>
    </div>
  );
};


export default AdminPage;
