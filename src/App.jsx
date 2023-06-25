import authProvider from './authProvider';
import jsonServerProvider from "ra-data-json-server";
// import crudProvider from 'ra-data-nestjsx-crud';
import { Admin, Resource, ListGuesser } from 'react-admin';

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

// const httpClient = (url, options = {}) => {
//   if (!options.headers) {
//       options.headers = new Headers({ Accept: 'application/json' });
//   }
//   const { token } = JSON.parse(localStorage.getItem('token'));
//   options.headers.set('Authorization', `Bearer ${token}`);
//   return fetchUtils.fetchJson(url, options);
// };
// const dataProvider = crudProvider('http://localhost:8000', httpClient);

const App = () => (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      requireAuth
    >
      <Resource name="posts" list={ListGuesser} />
      <Resource name="comments" list={ListGuesser} />
    </Admin>
);

export default App
