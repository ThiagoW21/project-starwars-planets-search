import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import '../styles/Filters.css';
import Option from './Option';

function Filters() {
  const {
    handleChange,
    columns,
    handleClick,
    handleSelected,
    selectedValues,
    filterByNumericValues,
    handleRemoveFilter,
    handleRemoveAllFilters,
    handleOrder,
    orderData,
  } = useContext(MyContext);

  const operators = ['maior que', 'menor que', 'igual a'];
  const orders = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  return (
    <header>
      <div id="input-filter-container">
        <p>Projeto Star-Wars</p>
        <input
          type="text"
          onChange={ handleChange }
          data-testid="name-filter"
          id="input-filter-name"
          placeholder='Filtro por nome'
        />
      </div>
        <div id="filters-container">
          <label htmlFor="column">
            <span>Coluna</span>
            <br />
            <select
              id="column"
              name="column"
              onChange={ handleSelected }
              data-testid="column-filter"
            >
              {columns.map((column, key) => <Option key={ key } option={ column } />) }
            </select>
          </label>

          <label htmlFor="operator">
            Operador
            <br />
            <select
              id="operator"
              name="comparison"
              onChange={ handleSelected }
              data-testid="comparison-filter"
              value={ selectedValues.comparison }
            >
              {operators.map(
                (operator, key) => <Option key={ key } option={ operator } />,
              ) }
            </select>
          </label>
          <button
            type="button"
            onClick={ handleClick }
            data-testid="button-filter"
          >
            Filtrar

          </button>
          <input
            id="input-number"
            type="number"
            name="value"
            value={ selectedValues.value }
            onChange={ handleSelected }
            data-testid="value-filter"
            />
            <label htmlFor="order">
              Ordenar
              <br />
              <select
                id="order"
                name="column"
                onChange={ handleOrder }
                data-testid="column-sort"
                defaultValue={ orders[0] }
              >
                {orders.map(
                  (order, key) => <Option key={ key } option={ order } />,
                ) }
              </select>
            </label>
            <div id="radios-container">
              <label htmlFor="ASC">
                <input
                  name="sort"
                  type="radio"
                  onChange={ handleOrder }
                  id="ASC"
                  value="ASC"
                  data-testid="column-sort-input-asc"
                />
                Ascendente
              </label>
              <label htmlFor="DESC">
                <input
                  name="sort"
                  type="radio"
                  value="DESC"
                  onChange={ handleOrder }
                  id="DESC"
                  data-testid="column-sort-input-desc"
                />
                Descendente
              </label>
            </div>
            <button
              type="button"
              data-testid="column-sort-button"
              onClick={ orderData }
            >
              Ordenar

            </button>

            <button
              type="button"
              onClick={ handleRemoveAllFilters }
              data-testid="button-remove-filters"
            >
              Remover filtros

            </button>
          </div>
          { filterByNumericValues.map((filter, key) => (
            <div key={ key } data-testid="filter">
              <p>{`${filter.column} ${filter.comparison} ${filter.value}` }</p>
              <button type="button" onClick={ () => handleRemoveFilter(filter) }>X</button>
            </div>
          ))}
    </header>
  );
}

export default Filters;
