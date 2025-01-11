import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const cities = [
    'London', 'Paris', 'New York', 'Tokyo', 'Sydney', 
    'Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier', 
    'Berlin', 'Madrid', 'Rome', 'Buenos Aires', 'Cairo',
    'Dubai', 'Moscow', 'Toronto', 'Los Angeles', 'Chicago',
    'Istanbul', 'Seoul', 'Bangkok', 'Hong Kong', 'Singapore',
    'Delhi', 'Mumbai', 'Rio de Janeiro', 'Sao Paulo', 'Cape Town',
    'Johannesburg', 'Lagos', 'Mexico City', 'Beijing', 'Shanghai',
  ];
  

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Gallery</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="Cities" id="basic-nav-dropdown">
            {cities.map((city, index) => (
              <NavDropdown.Item 
                key={index} 
                href={`/weather/${city.toLowerCase()}`} 
              >
                {city}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
