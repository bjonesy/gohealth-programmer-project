import { FORM_POSTS_START, FORM_POSTS_SUCCESS, FORM_POSTS_FAIL } from '../actions';

export function formposts(state = [], action) {
	switch (action.type) {
		case FORM_POSTS_START:
			return state;
		case FORM_POSTS_SUCCESS:
			return action.formposts;
		case FORM_POSTS_FAIL:
			return state;	
		default: 
			return state;	
	}
}