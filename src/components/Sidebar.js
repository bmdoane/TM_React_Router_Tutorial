import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'
import slug from 'slug'

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
}

// Return Route for built in location checker to change style
// Match signifies current app location (if location = pathname)
function CustomLink ({ to, children }) {
  return (
    <Route
      path={to.pathname}
      children={({ match }) => (
        <li style={{ listStyleType: 'none', fontWeight: match ? 'bold' : 'normal' }}>
          <Link to={to}>{children}</Link>
        </li>
      )}
    />
  )
}

export default function Sidebar ({ title, list, loading, location, match }) {
  return loading === true
    ? <h1></h1>
    : <div>
        <h3 className='header'>{title}</h3>
        <ul className='sidebar-list'>
          {list.map((item) => (
            <CustomLink
              key={item}
              to={{
                pathname: `${match.url}/${slug(item)}`,
                search: location.search,
              }}
            >
              {item.toUpperCase()}
            </CustomLink>
          ))}
        </ul>
      </div>

}