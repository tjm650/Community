import FeedSkeleton from "@/components/skeletons/FeedSkeleton";

// Community list skeleton (no media, compact rows)
const CommunitySkeleton = ({ rows = 5 }) => {
  return <FeedSkeleton rows={rows} compact={true} />;
};

export default CommunitySkeleton;
