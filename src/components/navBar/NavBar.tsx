import { Link as RouterLink } from 'react-router-dom';

export const NavBar = () => (
  <nav>
    <ul>
      <li>
        <RouterLink to="/catalog">Movie Catalog</RouterLink>
        <RouterLink to="/converter">Converter</RouterLink>
      </li>
    </ul>
  </nav>
);
