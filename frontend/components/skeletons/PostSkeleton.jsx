import FeedSkeleton from "@/components/FeedSkeleton";

// Post skeleton matches the main feed post card (avatar, two lines, media)
const PostSkeleton = ({ rows = 3 }) => {
  return <FeedSkeleton rows={rows} compact={false} />;
};

export default PostSkeleton;
