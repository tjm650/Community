const getClientPosts = (PostList, clientName) => {
  let posts = PostList.filter(
    (name) => name.sender.username === clientName
  );

  return { posts, val: true }; // Default return for other cases
};

const getClientView = (directory_status1) => {
  if (directory_status1 === "Staff") {
    return { dsB: true, dsS: false };
  } else if (directory_status1 === "Student") {
    return { dsB: false, dsS: true };
  }
  return { dsB: false, dsS: false };
};

const onEndReached = (setloading, PostsNext, postsList) => {
  if (PostsNext) {
    postsList(PostsNext);
    setloading(true);
  }
};

export const ClientUserPosts = {
  onEndReached,
  getClientPosts,
  getClientView,
};
