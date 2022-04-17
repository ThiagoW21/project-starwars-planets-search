import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import Row from './Row';
import '../styles/Table.css';

function Table() {
  const { data, fiterByName, filterByNumericValues } = useContext(MyContext);
  const checkName = fiterByName.name !== '';
  let dataFiltered = [...data];

  function filterName() {
    return data.filter(
      (planet) => planet.name.toLowerCase().includes(fiterByName.name.toLowerCase()),
    );
  }

  function compMaiorQue(column, value) {
    dataFiltered = dataFiltered.filter((planet) => parseInt(planet[column], 10) > value);
  }

  function compMenorQue(column, value) {
    dataFiltered = dataFiltered.filter((planet) => parseInt(planet[column], 10) < value);
  }

  function compIgualA(column, value) {
    dataFiltered = dataFiltered.filter(
      (planet) => parseInt(planet[column], 10) === value,
    );
  }

  function filterPlanets(filter) {
    const { value, comparison, column } = filter;
    const valueInt = parseInt(value, 10);

    if (comparison === 'maior que') {
      compMaiorQue(column, valueInt);
    } else if (comparison === 'menor que') {
      compMenorQue(column, valueInt);
    } else {
      compIgualA(column, valueInt);
    }
  }

  function filterNumeric() {
    filterByNumericValues.forEach((filter) => {
      filterPlanets(filter);
    });
  }

  if (checkName) {
    dataFiltered = filterName();
  } else if (filterByNumericValues.length !== 0) {
    filterNumeric();
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotatio Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Teerain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Filme</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { data
        && dataFiltered.map((planet, key) => <Row key={ key } planet={ planet } />) }
      </tbody>
    </table>
  );
}

export default Table;
