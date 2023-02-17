import React, { useEffect, useState } from "react";
import Table from "./DisplayTable";

const Filter = ({
  data,
  headerText,
  headerBackground,
  headerBorder,
  tableText,
  tableBackground,
  tableBorder,
  hoverColor,
}) => {
  const [tableData, setTableData] = useState(data || []);
  const [column, setColumn] = useState();
  const [sortType, setSortType] = useState(true);

  const sorting = () => {
    if (sortType === false) {
      tableData.sort((a, b) => {
        return a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0;
      });
    } else {
      tableData.sort((a, b) => {
        return a[column] < b[column] ? 1 : a[column] > b[column] ? -1 : 0;
      });
    }
    setTableData(data);
  };

  useEffect(() => {
    sorting();
    return () => {};
    // eslint-disable-next-line
  }, [sortType]);
  return (
    <Table
      data={tableData}
      setColumn={setColumn}
      setSortType={setSortType}
      sortType={sortType}
      headerText={headerText}
      headerBackground={headerBackground}
      headerBorder={headerBorder}
      tableText={tableText}
      tableBackground={tableBackground}
      tableBorder={tableBorder}
      hoverColor={hoverColor}
    />
  );
};

export default Filter;
