import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage() {
  const [loadedSales, setLoadedSales] = useState();

  const { data, error } = useSWR(
    `https://next-sales-2d3fd-default-rtdb.europe-west1.firebasedatabase.app/sales.json`
  );

  useEffect(() => {
    if (data) {
      const sales = [];

      for (const key in data) {
        sales.push({ id: key, ...data[key] });
      }
      setLoadedSales(sales);
    }
  }, [data]);

  if (error) return <p>Failed to load</p>;
  if (!data || !loadedSales) return <p>Loading...</p>;

  return (
    <ul>
      {loadedSales.map(sale => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;
