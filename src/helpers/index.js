// export function calculateYearSum(portfolio) {
//   if (Object.keys(portfolio).length !== 0) {
//     const yearArray = portfolio.map(stock => {
//       const quantity = stock.quantity;
//       return stock.dividends
//         .map(dividend => dividend.amountPerShare * quantity)
//         .reduce((prev, next) => prev + next);
//     });
//     const sum = yearArray.map(value => value).reduce((prev, next) => prev + next);
//     return sum;
//   } else {
//     return '0';
//   }
// }

// export function groupDividendMonth(portfolio) {
//   if (Object.keys(portfolio).length !== 0) {
//     const groups = portfolio.map(stock => {
//       return stock.dividends.reduce((i, date) => {
//         const month = date.exDate.split('-')[1];
//         i[month]
//           ? i[month].data.push(date)
//           : (i[month] = {
//               amountPerShare: date.amountPerShare,
//               quantity: stock.quantity,
//               name: stock.name,
//               month: month,
//             });
//         return i;
//       }, {});
//     });
//     const result = Object.keys(groups).map(keys => {
//       return groups[keys];
//     });
//     return result;
//   } else {
//     return null;
//   }
// }

// export function calcDividendMonth(dividends, month) {
//   const m = dividends.filter(outer => outer[month]).map(outer => outer[month]);

//   if (m.length > 0) {
//     return m
//       .map(dividend => dividend.amountPerShare * dividend.quantity)
//       .reduce((prev, next) => prev + next);
//   } else {
//     return 0;
//   }
// }

export function getDividendMonth(portfolio, month) {
  if (Object.keys(portfolio).length !== 0) {
    // get an array of stocks that has divdends on give month
    const array = portfolio
      .filter(element => element.dividends.some(subElement => subElement.exDate.includes(month)))
      .map(element => {
        let n = Object.assign({}, element, {
          dividends: element.dividends.filter(subElement => subElement.exDate.includes(month)),
        });
        return n;
      });

    // get an array of stocks dividends
    if (Object.keys(array).length !== 0) {
      const dividendArray = array.map(({ quantity, dividends }) => {
        return dividends
          .map(item => item.amountPerShare * quantity)
          .reduce((prev, next) => prev + next);
      });

      // get the sum of all dividends
      const dividendSum = dividendArray.reduce((prev, next) => prev + next);

      return dividendSum;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}

export function getMonthList(portfolio, month) {
  if (Object.keys(portfolio).length !== 0) {
    const stocks = portfolio
      .filter(element => element.dividends.some(subElement => subElement.exDate.includes(month)))
      .map(element => {
        let n = Object.assign({}, element, {
          dividends: element.dividends.filter(subElement => subElement.exDate.includes(month)),
        });
        return n;
      });

    if (Object.keys(stocks).length !== 0) {
      const dividendArray = stocks.map(({ quantity, dividends }) => {
        return dividends
          .map(item => item.amountPerShare * quantity)
          .reduce((prev, next) => prev + next);
      });
      const $data = {
        stocks,
        dividendArray,
      };
      return $data;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
