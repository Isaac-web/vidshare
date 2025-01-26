import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const useAppwrite = <T,>(fn: Function) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const handleFetchData = async () => {
    try {
      const data = (await fn()) as unknown as T[];
      setData(data);
    } catch (error: any) {
      Alert.alert('Load Error', 'An error occured while loading posts.');
      setError(error?.message || '');
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => handleFetchData();

  useEffect(() => {
    handleFetchData();
  }, []);

  return { isLoading, data, error, refetch };
};

export default useAppwrite;
