
export interface IStorageData {
  jwt: string;
}

export default function useAsyncStorage() {
  const key = process.env.REACT_APP_ASYNCSTORAGE_OBJECT_KEY as string;

  const getItem = async (): Promise<IStorageData | null> => {
    try {
      const jsonValue = localStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const setItem = async (data: IStorageData): Promise<boolean> => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const removeItem = async (): Promise<boolean> => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
}
