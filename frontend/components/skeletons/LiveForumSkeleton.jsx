import FeedSkeleton from "@/components/FeedSkeleton";

// Live forum / event skeleton: compact header + small media area
const LiveForumSkeleton = ({ rows = 2 }) => {
  return <FeedSkeleton rows={rows} compact={false} />;
};

export default LiveForumSkeleton;
