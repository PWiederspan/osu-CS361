import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import {SidebarData} from './SideMenuData';


function Navbar() {

  return (
    <>
        <div>
        </div>
        <nav className={'nav-menu active'}>
          <ul>
            <h1 className="menuText">Menu</h1>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
    </>
  );
}

export default Navbar;
