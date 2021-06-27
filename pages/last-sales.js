import { useEffect, useState } from 'react';

function LastSalesPage() {
  const [loadedSales, setLoadedSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://next-sales-2d3fd-default-rtdb.europe-west1.firebasedatabase.app/sales.json`
    )
      .then(response => response.json())
      .then(data => {
        const sales = [];

        for (const key in data) {
          sales.push({ id: key, ...data[key] });
        }

        setLoadedSales(sales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!loadedSales) {
    return <p>No data yet</p>;
  }

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
