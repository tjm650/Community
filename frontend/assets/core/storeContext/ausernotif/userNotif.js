function responseUserNotificationPostLike(set, get, data) {
  set((state) => ({
    userPostLikeNotifList: data,
  }));
}

function responseUserNotificationPostComment(set, get, data) {
  set((state) => ({
    userPostCommentNotifList: data,
  }));
}

function responseUserNotif(set, get, data) {
  set((state) => ({
    usernotifList: data,
  })); 
}   

function responseUserNotifUnread(set, get, data) {    
  set((state) => ({
    usernotifListUnread: data,   
  }));
}  

export const UserNotifs = {
  responseUserNotifUnread,
  responseUserNotif,
  responseUserNotificationPostLike,
  responseUserNotificationPostComment,
};
