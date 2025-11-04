function responseDirectory(set, get, data) {
    set((state) => ({
      directoryList: [...get().directoryList, ...data.directory_list],
    }));
  }
  function responseImage(set, get, data) {
    set((state) => ({
      image: data.image,
    }));
  }
  
  function responseOccupation(set, get, data) {
    set((state) => ({
      user: data,
    }));
  }



export const CommAPI = {
    responseDirectory,
    responseImage,
    responseOccupation,
  };