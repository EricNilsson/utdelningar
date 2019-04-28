import { toSek } from '../helpers';

// https://cors-anywhere.herokuapp.com/
// https://limitless-garden-26844.herokuapp.com/

const api_url = 'https://cors-anywhere.herokuapp.com/https://www.avanza.se/_mobile/market/stock/';

// -------------------------------
// Add a single stock to portfolio, fetches data from above url
// -------------------------------
export const addStock = (name, api_id) => {
  return dispatch => {
    dispatch(dataRequest());
    return fetch(api_url + api_id).then(response => {
      if (response.ok) {
        response.json().then(data => {
          // set sector if it is exits
          let sector = 'Övrigt';

          if ('company' in data && data.company.sector) {
            sector = data.company.sector;
          }

          // set currency multipliers for always show in SEK
          const currency_multiply = toSek(data.currency);

          // only add current year of dividends
          data.dividends = data.dividends.filter(el => el.exDate.includes('2019'));

          // set price to two decimals
          const price = (data.lastPrice * currency_multiply).toFixed(2);
          const price_int = Number(price);
          dispatch(
            dataRequestSuccess(name, price_int, data.dividends, api_id, sector, currency_multiply)
          );
        });
      } else {
        dispatch(dataRequestFailed('error fetching stock'));
        alert(`Kunde inte lägga till ${name}, vänligen informera dick@pigment.se`);
      }
    });
  };
};

export const dataRequest = () => {
  return {
    type: 'DATA_STOCK_REQUEST',
  };
};

export const dataRequestSuccess = (name, price, dividends, api_id, sector, currency_multiply) => {
  // remove object
  const decodedName = name.replace(/&amp;/g, '&');

  return {
    type: 'DATA_STOCK_REQUEST_SUCCESS',
    stock: {
      name: decodedName,
      price,
      dividends,
      api_id,
      quantity: '1',
      value: price,
      sector,
      currency_multiply,
    },
  };
};

export const dataRequestFailed = error => {
  return {
    type: 'DATA_STOCK_REQUEST_FAILED',
    error,
  };
};

export const editStock = (quantity, api_id) => {
  return {
    type: 'EDIT_STOCK',
    quantity,
    api_id,
  };
};

export const deleteStock = api_id => {
  return {
    type: 'DELETE_STOCK',
    api_id,
  };
};

// -------------------------------
// Open modal to edit stocks dividend
// -------------------------------
export const editStockModal = api_id => {
  return {
    type: 'EDIT_STOCK_MODAL',
    api_id,
  };
};

export const addDividend = (api_id, exDate, amountPerShare) => {
  return {
    type: 'ADD_DIVIDEND',
    api_id,
    newDividend: {
      exDate,
      amountPerShare,
    },
  };
};

export const editDividend = (api_id, exDate, amountPerShare, currency_multiply) => {
  const amount = amountPerShare / currency_multiply;
  return {
    type: 'EDIT_DIVIDEND',
    exDate,
    api_id,
    amount,
  };
};

export const deleteDividend = (exDate, api_id) => {
  return {
    type: 'DELETE_DIVIDEND',
    exDate,
    api_id,
  };
};

export const closeStockModal = () => {
  return {
    type: 'CLOSE_STOCK_MODAL',
  };
};

// -------------------------------
// This maps through all stocks in portfolio and updates price & value
// -------------------------------
export const updatePortfolio = portfolio => {
  return dispatch => {
    dispatch(updateRequest());

    portfolio.map(stock => {
      return fetch(api_url + stock.api_id, {
        cache: 'reload',
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            // set currency multipliers for always show in SEK
            const currency_multiply = toSek(data.currency);

            // set price to two decimals
            const price = (data.lastPrice * currency_multiply).toFixed(2);
            const price_int = Number(price);

            dispatch(updateRequestSuccess(price_int, stock.api_id));
          });
        } else {
          dispatch(updateRequestFailed('error updating stock'));
          alert(`Kunde inte uppdatera ${stock.name}, vänligen informera dick@pigment.se`);
        }
      });
    });
  };
};

export const updateRequest = () => {
  return {
    type: 'UPDATE_PORTFOLIO_REQUEST',
  };
};

export const updateRequestSuccess = (price, api_id) => {
  return {
    type: 'UPDATE_PORTFOLIO_SUCCESS',
    price,
    api_id,
  };
};

export const updateRequestFailed = error => {
  return {
    type: 'UPDATE_PORTFOLIO_FAILED',
    error,
  };
};
