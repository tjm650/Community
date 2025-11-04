function responseMessageList(set, get, data) {
    set((state) => ({
      messagesList: [...get().messagesList, ...data.messages],
      messagesNext: data.next,
      messagesUsername: data.connect.username,
    }));
  }
  
  function responseMessageSend(set, get, data) {
    const username = data.connect.username;
  
    // Move the friendlist to the start of the list
    // Update the preview textand update the time stamp
  
    const ConnectList = [...get().ConnectList];
    const ConnectIndex = ConnectList.findIndex(
      (item) => item.connect.username === username
    );
    if (ConnectIndex >= 0) {
      const item = ConnectList[ConnectIndex];
      item.preview = data.message.description;
      item.updated = data.message.created;
      item.preview_red = data.message.red;
      item.image ? item.image = data.message.image : null;
      ConnectList.splice(ConnectIndex, 1);
      ConnectList.unshift(item);
      set((state) => ({
        ConnectList: ConnectList,
      })); 
    }
  
    // If the message data does not belong to this friend then
    // don't update the message list, as a refresh messagelist will be loaded
    // the next time the user opens the correct chat window
  
    if (username !== get().messagesUsername) {
      return;
    }
  
    // Load messages here
    const messagesList = [data.message, ...get().messagesList];
    set((state) => ({
      messagesList: messagesList,
      // MessagesTyping: null,
    }));
  }
  
  function responseMessageType(set, get, data) {
    if (data.username !== get().messagesUsername) return;
    set((state) => ({
      MessagesTyping: new Date(),
    }));
  }
  



export const Messages = {
    responseMessageList,
    responseMessageSend,
    responseMessageType,
  };