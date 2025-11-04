

function responseAppNotifList(set, get, data) {
    set((state) => ({
      appNotifList: [...get().appNotifList, ...data.notifs],
      appNotifNext: data.next,
    }));
  }

  export const AppNotif = {
    responseAppNotifList,
  };