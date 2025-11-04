import FeedSkeleton from "@/components/FeedSkeleton";

const InternshipSkeleton = ({ rows = 4 }) => {
  return <FeedSkeleton rows={rows} compact={true} />;
};

export default InternshipSkeleton;
