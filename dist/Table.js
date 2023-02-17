"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.sort.js");
var _react = _interopRequireWildcard(require("react"));
var _DisplayTable = _interopRequireDefault(require("./DisplayTable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Filter = _ref => {
  let {
    data,
    headerText,
    headerBackground,
    headerBorder,
    tableText,
    tableBackground,
    tableBorder,
    hoverColor
  } = _ref;
  const [tableData, setTableData] = (0, _react.useState)(data || []);
  const [column, setColumn] = (0, _react.useState)();
  const [sortType, setSortType] = (0, _react.useState)(true);
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
  (0, _react.useEffect)(() => {
    sorting();
    return () => {};
    // eslint-disable-next-line
  }, [sortType]);
  return /*#__PURE__*/_react.default.createElement(_DisplayTable.default, {
    data: tableData,
    setColumn: setColumn,
    setSortType: setSortType,
    sortType: sortType,
    headerText: headerText,
    headerBackground: headerBackground,
    headerBorder: headerBorder,
    tableText: tableText,
    tableBackground: tableBackground,
    tableBorder: tableBorder,
    hoverColor: hoverColor
  });
};
var _default = Filter;
exports.default = _default;