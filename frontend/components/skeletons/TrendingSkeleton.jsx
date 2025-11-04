import FeedSkeleton from "@/components/skeletons/FeedSkeleton";

const TrendingSkeleton = ({ rows = 4 }) => {
  return <FeedSkeleton rows={rows} compact={true} />;
};

export default TrendingSkeleton;
