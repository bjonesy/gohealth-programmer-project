import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../assets/css/layout/footer.css';

const Footer = () => {
	return (
		<footer id="colophon" className="app-footer">
			<Container>
				<Row>
					<Col sm="12" lg="12">
						<p className="float-right"><a href="#masthead"><i className="fa fa-chevron-up fa-2x"></i></a></p>
						<p className="float-left">GoHealth Urgent Care Programmer Project</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
}

export default Footer;