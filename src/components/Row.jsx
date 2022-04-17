import PropTypes from 'prop-types';
import React from 'react';
import '../styles/Row.css';

function Row({ planet }) {
  const {
    name,
    rotation_period: rotationPeriod,
    orbital_period: orbitalPeriod,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water: surfaceWater,
    population,
    films,
    created,
    edited,
    url,
  } = planet;

  return (
    <tr>
      <td data-testid="planet-name">{ name }</td>
      <td>{ rotationPeriod }</td>
      <td>{ orbitalPeriod }</td>
      <td>{ diameter }</td>
      <td>{ climate }</td>
      <td>{ gravity }</td>
      <td>{ terrain }</td>
      <td>{ surfaceWater }</td>
      <td>{ population }</td>
      <td>{ films.map((urlFilm, key) => <span key={ key }>{ urlFilm }</span>) }</td>
      <td>{ created }</td>
      <td>{ edited }</td>
      <td>{ url }</td>
    </tr>
  );
}

Row.propTypes = {
  planet: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default Row;
