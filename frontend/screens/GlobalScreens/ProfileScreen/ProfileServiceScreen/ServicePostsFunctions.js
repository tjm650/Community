const getServicePosts = (
  directory_status1,
  notifList,
  DailyBlogList,
  serviceName
) => {
  if (directory_status1 === "Bloger") {
    let posts = DailyBlogList.filter(
      (name) => name.service.username === serviceName
      //   console.log("item.service.username --------->", name.service.username)
    )

    return { posts, val: true };
  } else if (directory_status1 === "Service" || "Community" || "Organization") {
    let posts = notifList.filter(
      (item) =>
        item.service.username === serviceName
    );
    return { posts, val: true };
  }

  return { posts, val: true }; // Default return for other cases
};

const getServiceView = (directory_status1) => {
  if (directory_status1 === "Bloger") {
    return { dsB: true, dsS: false };
  } else if (
    directory_status1 === "Service" ||
    directory_status1 === "Community" ||
    directory_status1 === "Organization"
  ) {
    return { dsB: false, dsS: true };
  }
  return { dsB: false, dsS: false };
};

const onEndReached = (
  setloading,
  notifNext,
  notificationList,
  blogsNext,
  BlogList,
  directory_status1
) => {
  if (directory_status1 === "Bloger") {
    // if (blogsNext) {
    //   BlogList(blogsNext);
    //   setloading(true);
    // }
    null
  } else if (directory_status1 === "Service" || "Community" || "Organization") {
    if (notifNext) {
      notificationList(notifNext);
      setloading(true);
    }
  }
};

export const ServiceNotifications = {
  onEndReached,
  getServicePosts,
  getServiceView,
};
