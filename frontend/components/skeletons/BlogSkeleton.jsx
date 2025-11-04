import FeedSkeleton from "@/components/FeedSkeleton";

const BlogSkeleton = ({ rows = 3 }) => {
  return <FeedSkeleton rows={rows} compact={false} />;
};

export default BlogSkeleton;
