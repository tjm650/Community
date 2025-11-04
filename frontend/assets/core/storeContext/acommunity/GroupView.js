function responseGroupConnectNew(set, get, grpconnect) {
  const GroupConnectList = [grpconnect, ...get().GroupConnectList];
  set((state) => ({
    GroupConnectList: GroupConnectList,
  }));
}

function responseGroupMessageList(set, get, data) {
  set((state) => ({
    chatsList: [...get().chatsList, ...data.grp_messages],
    ChatsMembers: [...get().ChatsMembers, ...data.grpconnect],
    // chatsUsername: data.grpconnect.username,
  }));
}

function responseGroupConnectList(set, get, GroupConnectList) {
  set((state) => ({
    GroupConnectList: GroupConnectList,
  }));
}

function responseGroupMessageSend(set, get, data) {
  const username = data.grpconnect.username;

  // Move the friendlist to the start of the list
  // Update the preview textand update the time stamp

  const GroupConnectList = [...get().GroupConnectList];
  const ConnectIndex = ConnectList.findIndex(
    (item) => item.grpconnect.username === username
  );
  if (ConnectIndex >= 0) {
    const item = GroupConnectList[ConnectIndex];
    item.preview = data.grpmessage.text;
    item.updated = data.grpmessage.created;
    GroupConnectList.splice(ConnectIndex, 1);
    GroupConnectList.unshift(item);
    set((state) => ({
      GroupConnectList: GroupConnectList,
    }));
  }

  // If the message data does not belong to this friend then
  // don't update the message list, as a refresh messagelist will be loaded
  // the next time the user opens the correct chat window

  if (username !== get().chatsUsername) {
    return;
  }

  // Load messages here
  const chatsList = [data.grpmessage, ...get().chatsList];
  set((state) => ({
    chatsList: chatsList,
    MessagesTyping: null,
  }));
}




export const groupView = {
    responseGroupConnectNew,
    responseGroupMessageList,
    responseGroupConnectList,
    responseGroupMessageSend,
  };