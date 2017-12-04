import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<Navbar color="dark" dark expand="md">
				<Link className="navbar-brand" to="/">GoHealth Urgent Care</Link>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<Link className="nav-link" to="/">Home</Link>
						</NavItem>
						<NavItem>
							<Link className="nav-link" to="/submissions">Form Submissions</Link>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}

export default NavBar;
