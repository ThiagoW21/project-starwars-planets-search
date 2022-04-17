import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchAPI from '../services/fetchAPI';
import MyContext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [fiterByName, setFilterByName] = useState({
    name: '',
  });

  useEffect(() => {
    const getPlanets = async () => {
      const response = await fetchAPI();
      const num = -1;
      const responseSort = response.sort((a, b) => (a.name < b.name ? num : true));
      setData(responseSort);
    };

    getPlanets();
  }, []);

  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({
    order: {
      column: 'population',
      sort: '',
    },
  });

  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [selectedValues, setValues] = useState({
    column: columns[0],
    comparison: 'maior que',
    value: 0,
  });

  function handleChange({ target }) {
    const { value } = target;
    setFilterByName({ name: value });
  }

  function handleClick() {
    const newColumns = columns.filter((column) => column !== selectedValues.column);
    setColumns(newColumns);

    setFilterByNumericValues((prevState) => ([
      ...prevState,
      {
        column: selectedValues.column,
        comparison: selectedValues.comparison,
        value: selectedValues.value,
      },
    ]));

    setValues({
      column: newColumns[0],
      comparison: 'maior que',
      value: 0,
    });
  }

  function handleSelected({ target }) {
    const { name, value } = target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleRemoveFilter(filter) {
    const { column } = filter;
    setColumns((prevState) => [...prevState, column]);
    const newFilter = filterByNumericValues.filter((col) => col.column !== column);
    setFilterByNumericValues(newFilter);
  }

  function handleRemoveAllFilters() {
    filterByNumericValues.map(
      (filter) => setColumns((prevState) => [...prevState, filter.column]),
    );
    setFilterByNumericValues([]);
  }

  function handleOrder({ target }) {
    const { name, value } = target;
    setOrder((prevState) => ({ order: { ...prevState.order, [name]: value } }));
  }

  function orderData() {
    const { column, sort } = order.order;
    let newData = [];

    if (sort === 'ASC') {
      newData = data.sort((a, b) => (parseInt(a[column], 10) - parseInt(b[column], 10)));
    } else {
      newData = data.sort((a, b) => {
        if (b[column] === 'unknown') {
          return (parseInt(1, 10) - parseInt(a[column], 10));
        }

        return (parseInt(b[column], 10) - parseInt(a[column], 10));
      });
    }

    setData([...newData]);
  }

  const context = {
    data,
    handleChange,
    fiterByName,
    setFilterByNumericValues,
    columns,
    handleClick,
    handleSelected,
    selectedValues,
    filterByNumericValues,
    handleRemoveFilter,
    handleRemoveAllFilters,
    handleOrder,
    orderData,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Provider;
