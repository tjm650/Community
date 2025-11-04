import FeedSkeleton from "@/components/FeedSkeleton";

const TrendingSkeleton = ({ rows = 4 }) => {
  return <FeedSkeleton rows={rows} compact={true} />;
};

export default TrendingSkeleton;
