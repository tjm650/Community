import FeedSkeleton from "@/components/FeedSkeleton";

// Notification post skeleton (similar to PostSkeleton but used in notification views)
const NotifPostSkeleton = ({ rows = 3 }) => {
  return <FeedSkeleton rows={rows} compact={false} />;
};

export default NotifPostSkeleton;
