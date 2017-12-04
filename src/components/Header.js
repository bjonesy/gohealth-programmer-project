import React from 'react';
import { Container } from 'reactstrap';
import NavBar from './NavBar';
import '../assets/css/layout/header.css';

const Header = () => {
	return(
		<header id="masthead" className="app-header">
			<Container>
				<NavBar />
			</Container>	
		</header>
	);
}

export default Header;