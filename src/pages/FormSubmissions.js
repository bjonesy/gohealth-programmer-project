import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { formPosts } from '../actions/index';

import Header from '../components/Header';
import SubmissionList from '../components/SubmissionList';
import Footer from '../components/Footer';
import '../assets/css/layout/main.css';

class FormSubmissions extends Component {
	componentWillMount() {
		this.props.formPosts();
	}

	render() {
		return(
			<div className="app">
				<Header />
				<main id="main" className="app-main">
					<SubmissionList />
				</main>	
				<Footer />
			</div>
		);
	}	
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({formPosts, dispatch}), dispatch)
}

export default connect(null, mapDispatchToProps)(FormSubmissions)