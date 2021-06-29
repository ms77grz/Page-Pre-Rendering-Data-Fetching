import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
  const [loadedSales, setLoadedSales] = useState(props.sales);

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
  if (!data && !loadedSales) return <p>Loading...</p>;

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

export async function getStaticProps() {
  const response = await fetch(
    `https://next-sales-2d3fd-default-rtdb.europe-west1.firebasedatabase.app/sales.json`
  );

  const data = await response.json();

  const sales = [];

  for (const key in data) {
    sales.push({ id: key, ...data[key] });
  }

  return { props: { sales } };
}

export default LastSalesPage;
