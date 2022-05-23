import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { useToggleFilter, useHandleRoute, useFetchData, useFetchPaintings } from './Utils';
import {
  storeFilterParams, storeAuthors, storeLocations,
  storePaintings, storeFetchState, storePaginationLinks
} from './store/data';

import Search from './components/Search';
import CustomSelect from './components/CustomSelect';
import DropdownRange from './components/DropdownRange';
import Pagination from './components/Pagination';
import { ReactComponent as ThemeBtn } from './assets/theme-btn.svg';

import './styles/tags.css';
import './styles/app.css';
import './styles/search.css';
import './styles/customSelect.css';
import './styles/dropdownRange.css';
import './styles/pagination.css';
import './styles/painting.css';



const App = () => {
  const toggleFilter = useToggleFilter();
  const fetchPaintings = useFetchPaintings();
  const fetchData = useFetchData(fetchPaintings);
  const handleRoute = useHandleRoute(fetchPaintings, fetchData);

  const [searchParams] = useSearchParams();
  useEffect(() => handleRoute(), [searchParams]);

  const filterParams = useSelector(storeFilterParams);
  const authors = useSelector(storeAuthors);
  const locations = useSelector(storeLocations);
  const paintings = useSelector(storePaintings);
  const fetchState = useSelector(storeFetchState);
  const paginationLinks = useSelector(storePaginationLinks);

  const [themeDark, setThemeDark] = useState(false);
  const toggleTheme = () => setThemeDark(!themeDark);



  return (
    <div className={themeDark ? "app app_theme-dark" : "app"}>
      <header className="app__header">
        <Link className="app__logo-link" to="/"></Link>

        <button className="app__theme-btn" onClick={toggleTheme}>
          <ThemeBtn />
        </button>
      </header>

      <main className="app__main">
        <div className="app__filters">
          <Search
            value={filterParams.q}
            update={(v) => toggleFilter('q', v)}
            rootClass="app__filters-item"
            placeholder="Name"
          />

          <CustomSelect
            data={authors}
            property="name"
            value={filterParams.authorId}
            update={(id) => toggleFilter('authorId', id)}
            rootClass="app__filters-item"
            placeholder="Author"
          />

          <CustomSelect
            data={locations}
            property="location"
            value={filterParams.locationId}
            update={(id) => toggleFilter('locationId', id)}
            rootClass="app__filters-item"
            placeholder="Location"
          />

          <DropdownRange
            from={filterParams.created_gte}
            to={filterParams.created_lte}
            updateFrom={(v) => toggleFilter('created_gte', v)}
            updateTo={(v) => toggleFilter('created_lte', v)}
            rootClass="app__filters-item"
          />
        </div>

        <ul className="app__list paintings-list">
          {(fetchState !== 'ok') ? (
            <li className="app__list-item paintings-loading">
              <div className="paintings-loading__aspect-ratio">
                <p className="paintings-loading__text">{fetchState}</p>
              </div>
            </li >
          ) : (paintings.map((item) =>
            <li className="app__list-item painting" key={item.id}>
              <div className="painting__aspect-ratio" style={{ backgroundImage: `url('${item.imageUrl}')` }}>
                <div className="painting__caption-mount">
                  <div className="painting__caption">
                    <h3>{item.name}</h3>
                    <p><b>Author:</b> {item.author}</p>
                    <p><b>Created:</b> {item.created}</p>
                    <p><b>Location:</b> {item.location}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Pagination links={paginationLinks} />
      </main>
    </div>
  );
};

export default App;
