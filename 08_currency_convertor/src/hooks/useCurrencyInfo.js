import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://api.frankfurter.dev/v2/rates?base=${currency}`)
      .then((res) => res.json())
      .then((res) => {
        const rates = {};

        res.forEach((item) => {
          rates[item.quote] = item.rate;
        });

        setData(rates);
      })
      .catch((error) => {
        console.log(error);
        setData({});
      });
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
