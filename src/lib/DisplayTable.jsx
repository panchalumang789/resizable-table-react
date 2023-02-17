import React, { useEffect, useState } from "react";

const Table = ({
  data,
  headerText,
  headerBackground,
  headerBorder,
  tableText,
  tableBackground,
  tableBorder,
  hoverColor,
  setColumn,
  sortType,
  setSortType,
}) => {
  const [tabledata, setTableData] = useState([]);
  const [tableheaders, setTableHeaders] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [hover, setHover] = useState();

  const handleMouseEnter = (index) => {
    if (hoverColor) {
      setIsHover(true);
      setHover(index);
    }
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  useEffect(() => {
    try {
      setTableData(data || []);
      setTableHeaders(Object.keys(data[0]));
    } catch (error) {
      console.error("Please provide data to table");
    }
    return () => {};
  }, [data]);

  let Properties = {
    divIndex: 0,
    starting: 0,
    width: 0,
    divWidth: 0,
    preDivWidth: 0,
    nextDivWidth: 0,
  };

  const MouseDown = (e, index) => {
    Properties.starting = e.clientX;
    Properties.divIndex = index;
    window.addEventListener("mousemove", MouseMove);
    window.addEventListener("mouseup", MouseUp);
    document.querySelector("#table").style.cursor = "col-resize";
    Properties.divWidth = document.querySelector(
      `#th${Properties.divIndex}`
    ).clientWidth;
    Properties.preDivWidth =
      document.querySelector(`#th${Properties.divIndex - 1}`) &&
      document.querySelector(`#th${Properties.divIndex - 1}`).clientWidth;
    Properties.nextDivWidth =
      document.querySelector(`#th${Properties.divIndex + 1}`) &&
      document.querySelector(`#th${Properties.divIndex + 1}`).clientWidth;
  };

  const MouseMove = (e) => {
    document.querySelector("#table").style.cursor = "col-resize";
    Properties.width = e.clientX - Properties.starting;

    if (Properties.width >= 0) {
      document.querySelector(`#th${Properties.divIndex}`).style.width =
        Properties.divWidth + Properties.width + "px";
      document.querySelector(`#th${Properties.divIndex + 1}`).style.width =
        Properties.nextDivWidth - Properties.width + "px";
    } else {
      document.querySelector(`#th${Properties.divIndex}`).style.width =
        Properties.divWidth + Properties.width + "px";
      document.querySelector(`#th${Properties.divIndex + 1}`).style.width =
        Properties.nextDivWidth - Properties.width + "px";
    }
  };

  const MouseUp = () => {
    document.querySelector("#table").style.cursor = "default";
    window.removeEventListener("mousemove", MouseMove);
  };

  return (
    <>
      <table
        id="table"
        style={{
          textAlign: "center",
          width: "100%",
          border: "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {tableheaders.map((header, index) => {
              return (
                <th
                  id={`th${index}`}
                  style={{
                    position: "relative",
                    padding: "8px 0",
                    border: `1px solid ${headerBorder || "black"}`,
                    color: headerText,
                    backgroundColor: headerBackground,
                    minWidth: "50px",
                    fontSize: "1.1rem",
                    textTransform: "capitalize",
                  }}
                  key={index}
                >
                  <div
                    onClick={() => {
                      setColumn(header);
                      setSortType(!sortType);
                    }}
                  >
                    {header}
                  </div>
                  {index < tableheaders.length - 1 && (
                    <div
                      id="resize"
                      style={{
                        position: "absolute",
                        userSelect: "none",
                        top: "0px",
                        height: "100%",
                        width: "8px",
                        right: "-4px",
                        zIndex: 2,
                      }}
                      onMouseDown={(e) => {
                        MouseDown(e, index);
                      }}
                      onMouseEnter={() => {
                        document.querySelector(`#th${index}`).style.cursor =
                          "col-resize";
                      }}
                      onMouseLeave={() => {
                        document.querySelector(`#th${index}`).style.cursor =
                          "default";
                      }}
                    ></div>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tabledata.map((data, index) => {
            return (
              <tr style={{ border: `1px solid ${tableBorder}` }} key={index}>
                {tableheaders.map((header, colindex) => {
                  return (
                    <td
                      key={colindex}
                      style={{
                        padding: "6px 0",
                        border: `1px solid ${tableBorder || "black"}`,
                        color: tableText,
                        backgroundColor:
                          isHover && hover === index
                            ? hoverColor
                            : tableBackground,
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {data[header]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
