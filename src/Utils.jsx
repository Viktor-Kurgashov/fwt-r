import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  storeAuthors, setAuthors,
  storeLocations, setLocations,
  storeFilterParams, setFilterParam,
  setPaintings, setFetchState, setPaginationLinks
} from './store/data';

const APIUrl = 'https://test-front.framework.team';



const resetPage = (route) => {
  route.delete('_page');
  route.delete('_limit');
  route.set('_page', '1');
  route.set('_limit', '12');
  return route.toString();
};



export const useToggleFilter = () => {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  return (param, value) => {
    const route = new URLSearchParams(sp.toString());
    if (value) route.set(param, value);
    else route.delete(param);
    navigate('/search?' + resetPage(route));
  };
};
// меняет параметры в ссылке и переходит по ней



export const useClearRange = () => {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  return () => {
    const route = new URLSearchParams(sp.toString());
    route.delete('created_gte');
    route.delete('created_lte');
    navigate('/search?' + resetPage(route));
  };
};



export const useHandleRoute = (fetchPaintings, fetchData) => {
  const [sp] = useSearchParams();
  const dispatch = useDispatch();
  const _locations = useSelector(storeLocations);
  const _filterParams = useSelector(storeFilterParams);

  return () => {
    const route = new URLSearchParams(sp.toString());
    if (_locations.length === 0) fetchData(route.toString());
    else fetchPaintings(route.toString());

    Object.keys(_filterParams).forEach(key => {
      const value = route.get(key) || "";
      if (_filterParams[key] !== value) dispatch(setFilterParam({ param: key, value }))      
    });
  };
};
// извлекает параметры из ссылки, сохраняет в store
// при перезагрузке страницы (_locations.length === 0), подгружает authors, locations



export const useFetchData = (fetchPaintings) => {
  const dispatch = useDispatch();
  return (query) => {
    fetch(APIUrl + '/authors')
      .then(res => res.json())
      .then(_authors => {
        _authors.map(item => {
          item.id = item.id.toString();
          return item;
        });
        dispatch(setAuthors(_authors));
        fetch(APIUrl + '/locations')
          .then(res => res.json())
          .then(_locations => {
            _locations.map(item => {
              item.id = item.id.toString();
              return item;
            });
            dispatch(setLocations(_locations));
            fetchPaintings(query, _authors, _locations);
          })
      })
  }
};
// пришлось передавать authors, locations через аргументы, так как в store они дойти не успевают



export const useFetchPaintings = () => {
  const dispatch = useDispatch();
  const _authors = useSelector(storeAuthors);
  const _locations = useSelector(storeLocations);

  return (query, authors = _authors, locations = _locations) => {
    if (query === '') query = '_page=1&_limit=12';
    dispatch(setFetchState('Loading...'));

    fetch(APIUrl + '/paintings?' + query)
      .then(res => {
        const Link = res.headers.get("Link");
        const pagesNumber = Link ? Link.match(/page=(\d+)[^"]+"last/)[1] : 1;
        dispatch(setPaginationLinks(
          createPaginationLinks(query, pagesNumber)
        ));
        return res.json();
      })
      .then(_paintings => {
        if (!_paintings.length) {
          dispatch(setFetchState('Nothing Found'));
        } else {
          _paintings.map(item => {
            item.author = authors.find(auth => auth.id === item.authorId.toString()).name;
            delete item.authorId;
            item.location = locations.find(loc => loc.id === item.locationId.toString()).location;
            delete item.locationId;
            item.imageUrl = APIUrl + item.imageUrl;
            item.id = item.id.toString();
            return item;
          });
          dispatch(setFetchState('ok'));
        }
        dispatch(setPaintings(_paintings));
      })
  };
};



const createPaginationLinks = (currentRoute, pagesNumber) => {
  currentRoute = new URLSearchParams(currentRoute);
  const currentPage = +currentRoute.get('_page');

  function createLink(num) {
    currentRoute.set('_page', num);
    return '/search?' + currentRoute.toString();
  }
  const result = {
    first: (currentPage > 1) ? createLink(1) : false,
    prev: (currentPage > 1) ? createLink(currentPage - 1) : false,
    next: (currentPage < pagesNumber) ? createLink(currentPage + 1) : false,
    last: (currentPage < pagesNumber) ? createLink(+pagesNumber) : false,
    arr: []
  };

  for (let i = 1; i <= pagesNumber; i++) {
    result.arr.push((currentPage !== i) ? createLink(i) : false);
  }
  return result;
};