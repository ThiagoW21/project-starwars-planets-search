const fetchAPI = async () => {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const { results } = await fetch(URL).then((response) => response.json());
  return results;
};

export default fetchAPI;
