function responseBlogList(set, get, data) {
    set((state) => ({
      DailyBlogList: [...get().DailyBlogList, ...data.blogs],
      BlogsUsername: data.blogs.username,
      blogsNext: data.next,
    }));
  }




  // function responseBlogSend(set, get, data) {
//   const username = data.blogs.username;
//   const description = data.blogs.description;

//   // Move the friendlist to the start of the list
//   // Update the preview textand update the time stamp

//   const DailyBlogList = [...get().DailyBlogList];
//   const BlogIndex = DailyBlogList.findIndex((item) => item.id === username);
//   if (BlogIndex >= 0) {
//     const item = DailyBlogList[BlogIndex];
//     DailyBlogList.splice(BlogIndex, 1);
//     DailyBlogList.unshift(item);
//     set((state) => ({
//       DailyBlogList: DailyBlogList,
//     }));
//   }

//   // If the message data does not belong to this friend then
//   // don't update the message list, as a refresh messagelist will be loaded
//   // the next time the user opens the correct chat window

//   // Load messages here
//   const Blogs = [data.blogs, ...get().DailyBlogList];
//   set((state) => ({
//     DailyBlogList: Blogs,
//   }));
// }


export const ABlogger = {
    responseBlogList,
  };