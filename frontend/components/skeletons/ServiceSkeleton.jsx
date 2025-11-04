import FeedSkeleton from "@/components/skeletons/FeedSkeleton";

const ServiceSkeleton = ({ rows = 3 }) => {
  return <FeedSkeleton rows={rows} compact={false} />;
};

export default ServiceSkeleton;
