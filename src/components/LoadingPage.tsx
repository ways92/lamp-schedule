import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spin 
        indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} 
        tip="Loading..." 
      />
    </div>
  );
};

export default LoadingPage;