import FeedSkeleton from "@/components/FeedSkeleton";

// Comments skeleton (compact, avatar + single line repeated)
const CommentSkeleton = ({ rows = 6 }) => {
  return <FeedSkeleton rows={rows} compact={true} />;
};

export default CommentSkeleton;
