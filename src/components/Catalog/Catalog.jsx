import React, { useState, useEffect } from 'react';
import { GoodCard } from '../GoodCard';
import './Catalog.css';

export const Catalog = () => {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to retrieve and set data from the external endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('https://nyb-project-production.up.railway.app/boats/featured');
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        setGoods(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    // Call the function to fetch and set the data
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
      <div className="catalog">
        {goods.map((good) => (
            <div className="card" key={good.id}>
              <GoodCard good={good} />
            </div>
        ))}
      </div>
  );
};
