toJsonWithData = (message, totalResult, totalPage, data) => {
  return {
    message: message,
    totalResult: totalResult,
    totalPage: totalPage,
    data: data,
  };
};

toJsonWithData = (message, data, totalPage) => {
  let dataArr = [];

  if (Array.isArray(data)) {
    dataArr = data;
  } else {
    dataArr.push(data);
  }

  return {
    message: message,
    totalResult: dataArr.length,
    totalPage: totalPage,
    data: dataArr,
  };
};

jsonNoData = (message) => {
  return {
    message: message,
    totalResult: 0,
    totalPage: 0,
    data: null,
  };
};

module.exports = { toJsonWithData, jsonNoData };
