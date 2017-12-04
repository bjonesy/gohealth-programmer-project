import { formposts } from './formpostsReducer';

describe('reducer fetch form posts start', () => {
	it('should return nothing', () => {
		const payload = [];
		expect(
			formposts([], {
			  type: 'FORM_POSTS_START',
			  payload
			})
		).toEqual(
		  payload
		)
	});
});

describe('reducer fetch form posts success', () => {
	it('should fetch form posts', () => {
		const payload = [ { title: 'Title' } ];
		expect(
			formposts([ { title: 'Title' } ], {
			  type: 'FORM_POSTS_SUCCESS',
			  payload
			})
		).toEqual(
		  payload.data
		)
	});
});

describe('reducer fetch form posts fail', () => {
	it('should fail', () => {
		const error = 'Error message';
		const payload = [ error ];
		expect(
			formposts([ error ], {
			  type: 'FORM_POSTS_FAIL',
			  payload
			})
		).toEqual(
		  payload
		)
	});
});