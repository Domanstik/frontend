import { NavLink } from 'react-router-dom';
import contest from '@icons/navigation/contests.svg';
import rating from '@icons/navigation/rating.svg';
import shop from '@icons/navigation/shop.svg';
import dashboard from '@icons/navigation/dashboard.svg';
import './Navigation.css';

const items = [
  { to: '/contests', icon: contest, label: 'Contests' },
  { to: '/leaderboard', icon: rating, label: 'Leaderboard' },
  { to: '/store', icon: shop, label: 'Shop' },
  { to: '/dashboard', icon: dashboard, label: 'Dashboard' },
];

export default function Navigation() {
  return (
    <nav className="nav">
      {items.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `nav_button${isActive ? ' nav_button--active' : ''}`
          }
          end
        >
          {({ isActive }) => (
            <span className="nav__icon-wrap">
              <span
                className={
                  'nav__icon-highlight' + (isActive ? ' nav__icon-highlight--active' : '')
                }
              />
              <img src={icon} alt={label} className="nav__icon" />
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
