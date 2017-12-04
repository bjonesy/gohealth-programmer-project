import React, { Component } from 'react';
import { connect } from 'react-redux';

class SubmissionList extends Component {
	componentWillUpdate(nextProps, nextState){
		return nextProps;
	}

	// Table infor with form submission data
	tableInfo(formposts) {
		if ( '' !== this.props.formposts ) {
			return this.props.formposts.map((post, index) => {
				const num = index + 1;
				return(
					<tr key={index}>
						<th scope="row">{num}</th>
						<td>{post.fName}</td>
						<td>{post.lName}</td>
						<td>{post.DOB}</td>
						<td>{post.phone}</td>
						<td>{post.insurance}</td>
						<td>{post.healthCarrier}</td>
						<td>{post.insuranceID}</td>
						<td>{post.geolocation.latitude}</td>
						<td>{post.geolocation.longitude}</td>
					</tr>	
				)
			});	
		}	
	}

	render() {
		return (
			<section className="table-responsive">
				<table className="table">
					{/* Table header */}
					<thead>
						<tr>
							<th>#</th>
							<th>First</th>
							<th>Last</th>
							<th>DOB</th>
							<th>Phone</th>
							<th>Insurance</th>
							<th>Carrier</th>
							<th>ID</th>
							<th>Latitude</th>
							<th>Longitude</th>
						</tr>
					</thead>
					{/* Table body */}
					<tbody>
						{this.tableInfo()}
					</tbody>
				</table>	
			</section>
		);
	}		
}

function mapStateToProps({formposts}) {
	return {formposts};
}

export default connect(mapStateToProps)(SubmissionList)	