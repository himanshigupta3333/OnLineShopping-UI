import React, { useMemo, useState, useEffect } from "react";
import { Table } from 'reactstrap';
import axios from 'axios';
import './App.css';

function App() {
  const [loadingData, setLoadingData] = useState(true);
  const columns = useMemo(() => [
    {
      Header: "Product Code",
      accessor: "productCode",
    },
    {
      Header: "Product Name",
      accessor: "productName",
    },
    {
      Header: "Product Desc",
      accessor: "productDesc",
    },
    {
      Header: "Product Price",
      accessor: "price",
    },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .get("http://localhost:8082/getProducts/")
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          setLoadingData(false);
        });
    }
    if (loadingData) {
      getData();
    }
  }, []);

  return (
    <div className="App">
      {/* here you check if the state is loading otherwise if you will not call that you will get a blank page because the data is an empty array at the moment of mounting */}
      {loadingData ? (
        <p>Loading Please wait...</p>
      ) : (
        <Table columns={columns} data={data} />
      )}
    </div>
  );
}
export default App;