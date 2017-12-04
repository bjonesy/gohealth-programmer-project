import React from 'react';
import Header from '../components/Header';
import HealthForm from '../components/HealthForm';
import Footer from '../components/Footer';
import '../assets/css/layout/main.css';

const Home = () => {
	return(
		<div className="app">
			<Header />
			<main id="main" className="app-main">
				<HealthForm />
			</main>	
			<Footer />
		</div>
	);
}

export default Home;