function responseAppSearch(set, get, data) {
  set((state) => ({
    appSearchUserList: [...get().appSearchUserList, ...data.search_users],
    appSearchBlogList: [...get().appSearchBlogList, ...data.search_blogs],
    appSearchPostList: [...get().appSearchPostList, ...data.search_posts],
    appSearchNotif: [...get().appSearchNotif, ...data.search_notifs],

    // appSearchUserList: data.search_users,
    // appSearchBlogList: data.search_blogs,
    // appSearchPostList: data.search_posts,
    appSearchNotif: data.search_notifs,
  }));
}

function responseAppTrending(set, get, data) {
  set((state) => ({
    appTrendingData: data,
  }));
}

export const AppSearches = {
  responseAppSearch,
  responseAppTrending,
};
