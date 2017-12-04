import React, { Component } from 'react';
import axios from 'axios';
import https from 'https';
import { Redirect } from 'react-router';
import Geolocation from "react-geolocation";
import { Form, Container, Row, Col, FormGroup, Label, Input, Jumbotron, Button } from 'reactstrap';
import '../assets/css/components/form.css';

class HealthForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			geolocation: '',
			phone: '',
			phoneError: false,
			fName: '',
			fNameError: false,
			lName: '',
			lNameError: false,
			DOB: '',
			DOBError: false,
			insurance: '',
			insuranceError: false,
			healthCarrier: '',
			healthCarrierError: false,
			insuranceID: '',
			insuranceIDError: false,
			isSubmitted: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// Add class to form when form is successfully submitted
	formSubmitted = (props) => {
		const isSubmitted = this.state.isSubmitted;
		let submitted = '';
		if ( true === isSubmitted ) {
			submitted = 'app-form__form submitted';
		} 
		else if ( false === isSubmitted ) {
			submitted = 'app-form__form unsubmitted';
		}

		return(submitted);
	}

	// Show the extra fields for insurance information
	checkInsuranceInput = (props) => {
		const insuranceCheck = this.state.insurance;
		let checkClass = '';
		if ( 'Yes' === insuranceCheck ) {
			checkClass = 'more';
		} 
		else if ( 'No' === insuranceCheck || '' === insuranceCheck || 'Please Select' === insuranceCheck ) {
			checkClass = 'hide';
		}

		return(checkClass);
	}


	/**
	 * Check health insurance using https://apistage.gohealthuc.com
	 *
	 * Currently not working. Unable to connect even with SSL validation turned off
	 * @return {object}
	 */
	checkHealthCarrier = () => {
		const agentOptions = {
		    rejectUnauthorized: false,
		}
		const agent = new https.Agent(agentOptions)

		const body = {
			member: {first_name: 'Rita', 'last_name': 'Book', id: '345123987', birth_date: '19991-10-31'}, 
			provider: {first_name: 'Marty', last_name: 'Seeger', npi: '1234567890'}, 
			trading_partner_id: 'united_health_care'
		}

		axios.post('https://apistage.gohealthuc.com:1981/v1/eligibility_demo', {
			agent,
			headers: {
				'authtoken': 'ghbrandon2046',
				'Acces-Control-Allow-Origin': 'http://localhost:3000',
			},
			body: body
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		}); 
	}

	// Get the values on state change for form inputs
	onChange = (e) => {
		// Because we named the inputs to match their corresponding values in state, it's
		// super easy to update the state
		const state = this.state
		state[e.target.name] = e.target.value;
		this.setState(state);
	}

	// Handle the form submission
	handleSubmit = (e, props) => { 
		e.preventDefault();
		const { phone, fName, lName, DOB, insurance, healthCarrier, insuranceID, geolocation } = this.state;

		// First Name
		if ( '' === fName ) {
			this.setState({
				fNameError: true
			})
		}

		// Last Name
		if ( '' === lName ) {
			this.setState({
				lNameError: true
			})
		}

		// Date of Birth
		if ( '' === DOB ) {
			this.setState({
				DOBError: true
			})
		}

		// Phone Number
		if ( '' === phone ) {
			this.setState({
				phoneError: true
			})
		}

		// Insurance
		if ( '' === insurance ) {
			this.setState({
				insuranceError: true
			})
		}

		// If insurance then provider and insurance ID check
		if ( 'Yes' === insurance ) {
			// Healthcare provider
			if ( '' === healthCarrier ) {
				this.setState({
					healthCarrierError: true
				})
				
			}

			// Insurance ID
			if ( '' === insuranceID ) {
				this.setState({
					insuranceIDError: true
				})
			}
		}

		// Don't submit the form if any of these values are empty
		if ( '' === phone || '' === fName || '' === lName || '' === DOB || '' === insurance ) {
			return false;
		}

		// Check to make sure if insurance is checked that the user has provided
		// Healthcare provider and insurance ID
		if ( 'Yes' === insurance ) {
			if ( '' === healthCarrier || 'Please Select' === healthCarrier ||  '' === insuranceID ) {
				return false;
			}
		}
		
		// Submit the form when each input has the correct values
		if ( '' !== phone || '' !== fName || '' !== lName || '' !== DOB || '' !== insurance || '' !== healthCarrier || '' !== insuranceID ) {
			console.log(this.state);
			let params = {
				geolocation: geolocation,
				phone: phone,
				fName: fName,
				lName: lName,
				DOB: DOB,
				insurance: insurance,
				healthCarrier: healthCarrier,
				insuranceID: insuranceID
			}
			axios.post('/form-submissions', params)
			.then(response => {
				// Successful from submission
				// console.log(response);
			})
			.catch(error => {
				console.log(error);
			});

			// Show the success message before redirect
			this.setState({isSubmitted: true});
		}
		
	}

	// Get users Geolocation
	getLocation = (data) => {
		this.setState({
			geolocation: {latitude: data.coords.latitude, longitude: data.coords.latitude} 
		})
	}

	// Redirect page after successful form submit
	pageRedirect = (props) => {
		setTimeout(() => {
			return <Redirect to={window.location = 'https://www.gohealthuc.com/about/'} />;
		}, 1000);
	}

	render() {
		const { phone, fName, fNameError, lName, lNameError, DOB, DOBError, insurance, insuranceError, healthCarrier, healthCarrierError, insuranceID, insuranceIDError, phoneError, isSubmitted } = this.state;
		// First or last name error
		const nameErrorClass = fNameError || lNameError ? 'app-form__error error name' : 'app-form__error noerror name';
		// Date of Birth error
		const dobErrorClass = DOBError ? 'app-form__error error dob' : 'app-form__error noerror dob';
		// Phone error
		const phoneErrorClass = phoneError ? 'app-form__error error phone' : 'app-form__error noerror phone';
		// Insurance error
		const insuranceErrorClass = insuranceError ? 'app-form__error error insurance' : 'app-form__error noerror insurance';
		// Healthcare provider error
		const healthCarrierErrorClass = healthCarrierError ? 'app-form__error error healthCarrier' : 'app-form__error noerror healthCarrier';
		// insurance ID error
		const insuranceIDErrorClass = insuranceIDError ? 'app-form__error error insuranceID' : 'app-form__error noerror insuranceID';
		//console.log(this.checkHealthCarrier());
		const submitRedirect = isSubmitted ? this.pageRedirect() : false;
		return(
			<section className="app-form">
				<Geolocation 
					onSuccess={this.getLocation}
				/>
				{submitRedirect}
				<Container>
					<Row>
						<Col sm="12" md="12">
							{/* Form */}
							<Form className={this.formSubmitted()} onSubmit={this.handleSubmit}>
								<FormGroup row>
									<Col xs={12} sm={12} md={6}>
										<Label for="fName" sm={12} md={6} size="lg">First Name</Label>
										<Input type="text" name="fName" id="fName" placeholder="First Name" bsSize="lg" value={fName} onChange={this.onChange} />
									</Col>  
									<Col xs={12} sm={12} md={6}>
										<Label for="lName" sm={12} md={6} size="lg">Last Name</Label>
										<Input type="text" name="lName" id="lName" placeholder="Last Name" bsSize="lg" value={lName} onChange={this.onChange} />
									</Col>
									<Col xs="12" sm="12" md="12">
										<div className={nameErrorClass}>Both first and last name are required.</div>
									</Col>	
								</FormGroup>
								<FormGroup row>
									<Col xs={12} sm={12} md={12}>
										<Label for="DOB" sm={12} md={6} size="lg">Date of Birth</Label>
										<Input type="date" name="DOB" id="DOB" placeholder="Date of Birth" bsSize="lg" value={DOB} onChange={this.onChange} />
										<div className={dobErrorClass}>Date of Birth is required.</div>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Col xs={12} sm={12} md={12}>
										<Label for="phone" sm={12} md={6} size="lg">Phone Number</Label>
										<Input type="number" name="phone" id="phone" placeholder="8139432331" bsSize="lg" value={phone} onChange={this.onChange} />
										<div className={phoneErrorClass}>A phone number is required.</div>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Col xs={12} sm={12} md={12}>
										<Label for="insurance">Do You Have Health Insurance?</Label>
										<Input type="select" name="insurance" id="insurance" bsSize="lg" value={insurance} onChange={this.onChange}>
											<option>Please Select</option>
											<option>Yes</option>
											<option>No</option>
										</Input>
										<div className={insuranceErrorClass}>Please select Yes or No.</div>
									</Col>  
								</FormGroup>
								<FormGroup row>
									<Col xs={12} sm={12} md={12}>
										<div className={this.checkInsuranceInput()}>
											<Label for="healthCarrier">Health Insurance Carrier</Label>
											<Input type="select" name="healthCarrier" id="healthCarrier" bsSize="lg" value={healthCarrier} onChange={this.onChange}>
												<option>Please Select</option>
												<option>Aetna</option>
												<option>Blue Cross/Blue Shield</option>
												<option>United Health Care</option>
											</Input>
											<div className={healthCarrierErrorClass}>A Healthcare provider is needed.</div>

											<Label for="insuranceID">Insurance ID</Label>
											<Input type="text" name="insuranceID" id="insuranceID" bsSize="lg" value={insuranceID} onChange={this.onChange} />
											<div className={insuranceIDErrorClass}>Your insurance ID is required.</div>
										</div>
									</Col>
								</FormGroup>
								<Button size="lg" type="submit">Submit</Button>
								{/* Form submit success message */}
								<div className="success">
									<Jumbotron>
										<h4 className="display-4">Thank you for your submission.</h4>
										<p className="lead">Please check in when you arrive.</p>
										<p className="lead">Please wait while you are being redirected to <a href="https://www.gohealthuc.com/about/">https://www.gohealthuc.com/about/</a></p>
									</Jumbotron>
								</div>
							</Form>
						</Col>  
					</Row>
				</Container>
			</section>      
		);
	}   
}

export default HealthForm;