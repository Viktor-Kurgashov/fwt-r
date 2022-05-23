import { ReactComponent as FirstPage } from '../assets/first-page.svg';
import { ReactComponent as PrevPage } from '../assets/prev-page.svg';
import { ReactComponent as NextPage } from '../assets/next-page.svg';
import { ReactComponent as LastPage } from '../assets/last-page.svg';
import { Link } from "react-router-dom";



const Pagination = ({ links }) => {
  return (
    <div className="app__pagination pagination">
      {(links.first)
        ? <Link className="pagination__arrow-link" to={links.first}><FirstPage /></Link>
        : <p className="pagination__arrow-link pagination__arrow-link_disabled"><FirstPage /></p>
      }

      {(links.prev)
        ? <Link className="pagination__arrow-link" to={links.prev}><PrevPage /></Link>
        : <p className="pagination__arrow-link pagination__arrow-link_disabled"><PrevPage /></p>
      }

      {links.arr.map((item, index) => (item)
        ? <Link className="pagination__numbered-link" to={item} key={item}>{index + 1}</Link>
        : <p className="pagination__numbered-link pagination__numbered-link_current" key={item}>{index + 1}</p>
      )}

      {(links.next)
        ? <Link className="pagination__arrow-link" to={links.next}><NextPage /></Link>
        : <p className="pagination__arrow-link pagination__arrow-link_disabled"><NextPage /></p>
      }

      {(links.last)
        ? <Link className="pagination__arrow-link" to={links.last}><LastPage /></Link>
        : <p className="pagination__arrow-link pagination__arrow-link_disabled"><LastPage /></p>
      }
    </div>
  )
}

export default Pagination