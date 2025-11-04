function responsePostList(set, get, data) {
    set((state) => ({
      PostList: [...get().PostList, ...data.posts],
      PostsNext: data.next,
    }));
  }


  function responsePostCommentList(set, get, data) {
    set((state) => ({
      PostCommentsList: [...get().PostCommentsList, ...data.comments],
      PostsCommentsNext: data.next,
    }));
  }




  function responsePostSend(set, get, data) {
    const username = data.posts.username;
    const description = data.posts.description;
  
    // Move the friendlist to the start of the list
    // Update the preview textand update the time stamp
  
    const PostList = [...get().PostList];
    const PostIndex = PostList.findIndex((item) => item.username === username);
    if (PostIndex >= 0) {
      const item = PostList[PostIndex];
      PostList.splice(PostIndex, 1);
      PostList.unshift(item);
      set((state) => ({
        PostList: PostList,
      }));
    }
  
    // If the message data does not belong to this friend then
    // don't update the message list, as a refresh messagelist will be loaded
    // the next time the user opens the correct chat window
  
    // Load messages here
    const getPosts = [data.posts, ...get().PostList];
    set((state) => ({
      PostList: getPosts,
    }));
  }

// function responsePostCommentSend(set, get, data) {
//   set((state) => ({
//     comments: {
//       ...state.comments,
//       [data.post_id]: {
//         PostCommentsList: [
//           data.comment,
//           ...(state.comments[data.post_id]?.list || []),
//         ],
//         PostsNext: state.comments[data.post_id]?.hasMore || false,
//       },
//     },
//   }));
// }


export const UserPosts = {
    responsePostList,
    responsePostCommentList,
    responsePostSend
  };