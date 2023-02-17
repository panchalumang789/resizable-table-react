"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Table = _ref => {
  let {
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
    setSortType
  } = _ref;
  const [tabledata, setTableData] = (0, _react.useState)([]);
  const [tableheaders, setTableHeaders] = (0, _react.useState)([]);
  const [isHover, setIsHover] = (0, _react.useState)(false);
  const [hover, setHover] = (0, _react.useState)();
  const handleMouseEnter = index => {
    if (hoverColor) {
      setIsHover(true);
      setHover(index);
    }
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  (0, _react.useEffect)(() => {
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
    nextDivWidth: 0
  };
  const MouseDown = (e, index) => {
    Properties.starting = e.clientX;
    Properties.divIndex = index;
    window.addEventListener("mousemove", MouseMove);
    window.addEventListener("mouseup", MouseUp);
    document.querySelector("#table").style.cursor = "col-resize";
    Properties.divWidth = document.querySelector("#th".concat(Properties.divIndex)).clientWidth;
    Properties.preDivWidth = document.querySelector("#th".concat(Properties.divIndex - 1)) && document.querySelector("#th".concat(Properties.divIndex - 1)).clientWidth;
    Properties.nextDivWidth = document.querySelector("#th".concat(Properties.divIndex + 1)) && document.querySelector("#th".concat(Properties.divIndex + 1)).clientWidth;
  };
  const MouseMove = e => {
    document.querySelector("#table").style.cursor = "col-resize";
    Properties.width = e.clientX - Properties.starting;
    if (Properties.width >= 0) {
      document.querySelector("#th".concat(Properties.divIndex)).style.width = Properties.divWidth + Properties.width + "px";
      document.querySelector("#th".concat(Properties.divIndex + 1)).style.width = Properties.nextDivWidth - Properties.width + "px";
    } else {
      document.querySelector("#th".concat(Properties.divIndex)).style.width = Properties.divWidth + Properties.width + "px";
      document.querySelector("#th".concat(Properties.divIndex + 1)).style.width = Properties.nextDivWidth - Properties.width + "px";
    }
  };
  const MouseUp = () => {
    document.querySelector("#table").style.cursor = "default";
    window.removeEventListener("mousemove", MouseMove);
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("table", {
    id: "table",
    style: {
      textAlign: "center",
      width: "100%",
      border: "1px solid black",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, tableheaders.map((header, index) => {
    return /*#__PURE__*/_react.default.createElement("th", {
      id: "th".concat(index),
      style: {
        position: "relative",
        padding: "8px 0",
        border: "1px solid ".concat(headerBorder || "black"),
        color: headerText,
        backgroundColor: headerBackground,
        minWidth: "50px",
        fontSize: "1.1rem",
        textTransform: "capitalize"
      },
      key: index
    }, /*#__PURE__*/_react.default.createElement("div", {
      onClick: () => {
        setColumn(header);
        setSortType(!sortType);
      }
    }, header), index < tableheaders.length - 1 && /*#__PURE__*/_react.default.createElement("div", {
      id: "resize",
      style: {
        position: "absolute",
        userSelect: "none",
        top: "0px",
        height: "100%",
        width: "8px",
        right: "-4px",
        zIndex: 2
      },
      onMouseDown: e => {
        MouseDown(e, index);
      },
      onMouseEnter: () => {
        document.querySelector("#th".concat(index)).style.cursor = "col-resize";
      },
      onMouseLeave: () => {
        document.querySelector("#th".concat(index)).style.cursor = "default";
      }
    }));
  }))), /*#__PURE__*/_react.default.createElement("tbody", null, tabledata.map((data, index) => {
    return /*#__PURE__*/_react.default.createElement("tr", {
      style: {
        border: "1px solid ".concat(tableBorder)
      },
      key: index
    }, tableheaders.map((header, colindex) => {
      return /*#__PURE__*/_react.default.createElement("td", {
        key: colindex,
        style: {
          padding: "6px 0",
          border: "1px solid ".concat(tableBorder || "black"),
          color: tableText,
          backgroundColor: isHover && hover === index ? hoverColor : tableBackground
        },
        onMouseEnter: () => handleMouseEnter(index),
        onMouseLeave: handleMouseLeave
      }, data[header]);
    }));
  }))));
};
var _default = Table;
exports.default = _default;