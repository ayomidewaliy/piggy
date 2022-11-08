import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItem = (key: string, value: string) =>
  AsyncStorage.setItem(key, value);

export const getItem = async (key: string) => await AsyncStorage.getItem(key);
