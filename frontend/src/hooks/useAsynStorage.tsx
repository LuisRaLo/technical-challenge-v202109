import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IStorageData {
  jwt: string;
}

export default function useAsyncStorage() {
  const key = process.env.REACT_APP_ASYNCSTORAGE_OBJECT_KEY as string;

  const getItem = async (): Promise<IStorageData | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) return JSON.parse(value);
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const setItem = async (data: IStorageData): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const removeItem = async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(key);
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
