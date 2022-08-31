import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useAxiosGet(url, config, setIsError) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(url, config)
      .then((response) => response.data)
      .then((response) => {
        if (response.statusCode === 400) {
          setIsError(true);
        } else {
          setIsError(false);
          setData(response.data);
        }
      })
      .catch((event) => {
        setIsError(true);
        const errMessage = event.response.data.error;
        setError(errMessage);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return [data, error, loading];
}
