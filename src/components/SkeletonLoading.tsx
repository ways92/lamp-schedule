import { Skeleton } from 'antd';

const SkeletonLoading = () => {
  return (
    <div className="p-2 max-w-5xl mx-auto pt-4">
      {/* Title Skeleton */}
      <div className="mb-4">
        <Skeleton.Input active size="large" className="w-48" />
      </div>

      {/* DatePicker and Button Skeleton */}
      <div className="mb-4">
        <Skeleton.Input active block className="h-10" />
        <div className="mt-2">
          <Skeleton.Button active size="large" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="mt-5">
        <Skeleton.Input active block className="h-12 mb-4" />
        {[...Array(3)].map((_, index) => (
          <div key={index} className="mb-4">
            <Skeleton.Input active block className="h-16" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoading;