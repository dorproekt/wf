import {useState, useCallback} from 'react';

export const useHttp = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState('');

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    try{
      setLoading(true);
      setError(null);

      if(body){
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, { method, body, headers });
      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message || 'Что-то пошло не так');
      }

      setLoading(false);
      setData(data);

      return data;

    }catch (e) {
      setLoading(false);
      setError(e);
    }

  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError, data, setError }
}