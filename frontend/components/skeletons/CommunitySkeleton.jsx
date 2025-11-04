import FeedSkeleton from "@/components/FeedSkeleton";

// Community list skeleton (no media, compact rows)
const CommunitySkeleton = ({ rows = 5 }) => {
  return <FeedSkeleton rows={rows} compact={true} />;
};

export default CommunitySkeleton;
