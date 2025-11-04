function responseConnectList(set, get, ConnectList) {
    set((state) => ({
      ConnectList: ConnectList,
    }));
  }
  
  function responseConnectNew(set, get, connect) {
    const ConnectList = [connect, ...get().ConnectList];
    set((state) => ({
      ConnectList: ConnectList,
    }));
  }
  
  function responseRequestAccept(set, get, connection) {
    const user = get().user;
  
    // If I was the one that accepted th request, remove
    // Request from request list
    if (user.username === connection.receiver.username) {
      const requestsList = [...get().requestsList];
      const requestIndex = requestsList.findIndex(
        (request) => request.id === connection.id
      );
      if (requestIndex >= 0) {
        requestsList.splice(requestIndex, 1);
        set((state) => ({
          requestsList: requestsList,
        }));
      }
    }
  
    // if the corresponding user contained within the
    // searchlist for the acceptor or the acceptee, update
    // the state of the searchlist item
    const sl = get().searchlist;
    if (sl === null) {
      return;
    }
    const searchlist = [...sl];
  
    let searchIndex = -1;
    // if this user accepted
    if (useReducer.username === connection.receiver.username) {
      searchIndex = searchlist.findIndex(
        (user) => user.username === connection.sender.username
      );
  
      // If the Other user accepted
    } else {
      searchIndex = searchlist.findIndex(
        (user) => user.username === connection.receiver.username
      );
    }
  
    if (searchIndex >= 0) {
      searchlist[searchIndex].status = "connected";
      set((state) => ({
        searchlist: searchlist,
      }));
    }
  }
  
  
  function responseRequestDelete(set, get, connection) {
    const user = get().user;
  
    // If I was the one that accepted th request, remove
    // Request from request list
    if (user.username === connection.receiver.username) {
      const requestsList = [...get().requestsList];
      const requestIndex = requestsList.findIndex(
        (request) => request.id === connection.id
      );
      if (requestIndex >= 0) {
        requestsList.splice(requestIndex, 1);
        set((state) => ({
          requestsList: requestsList,
        }));
      }
    }
  
    // if the corresponding user contained within the
    // searchlist for the acceptor or the acceptee, update
    // the state of the searchlist item
    const sl = get().searchlist;
    if (sl === null) {
      return;
    }
    const searchlist = [...sl];
  
    let searchIndex = -1;
    // if this user accepted
    if (useReducer.username === connection.receiver.username) {
      searchIndex = searchlist.findIndex(
        (user) => user.username === connection.sender.username
      );
  
      // If the Other user accepted
    } else {
      searchIndex = searchlist.findIndex(
        (user) => user.username === connection.receiver.username
      );
    }
  
    if (searchIndex >= 0) {
      searchlist[searchIndex].status = "pending_me";
      set((state) => ({
        searchlist: searchlist,
      }));
    }
  }
  
  function responseRequestConnect(set, get, connection) {
    const user = get().user;
    //If I was the one who made the connect request
    // Upload the search list row
  
    if (user.username === connection.sender.username) {
      const searchlist = [...get().searchlist];
      const searchIndex = searchlist.findIndex(
        // request
        (request) => request.username === connection.receiver.username
      );
      if (searchIndex >= 0) {
        searchlist[searchIndex].status = "pending-theme";
        set((state) => ({
          searchlist: searchlist,
        }));
      }
    } else {
      // If they were the one who made the connect request
      // request, add request to request list
      const requestsList = [...get().requestsList];
      const requestIndex = requestsList.findIndex(
        (request) => request.sender.username === connection.sender.username
      );
      if (requestIndex === -1) {
        requestsList.unshift(connection);
        set((state) => ({
          requestsList: requestsList,
        }));
      }
    }
  }
  
  function responseRequestList(set, get, requestsList) {
    set((state) => ({
      requestsList: requestsList,
    }));
  }
  
  function responseSearch(set, get, data) {
    set((state) => ({
      searchlist: data,
    }));
  }



export const Follows = {
    responseConnectList,
    responseConnectNew,
    responseRequestAccept,
    responseRequestDelete,
    responseSearch,
    responseRequestConnect,
    responseRequestList

  };