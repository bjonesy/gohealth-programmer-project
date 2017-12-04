import axios from 'axios';

export const FORM_POSTS_START   = 'FORM_POSTS_START';
export const FORM_POSTS_SUCCESS = 'FORM_POSTS_SUCCESS';
export const FORM_POSTS_FAIL    = 'FORM_POSTS_FAIL';

const formPostsStart = () => ({
	type: FORM_POSTS_START,
});

const formPostsSuccess = formposts => ({
	type: FORM_POSTS_SUCCESS,
	formposts,
});

const formPostsFail = error => ({
	type: FORM_POSTS_FAIL,
	error,
});

export const formPosts = () => (dispatch) => {
	dispatch(formPostsStart());

	return axios.get('/form-posts')
	.then(res => {
		dispatch(formPostsSuccess(res.data));
		return res;
	})
	.catch(error => {
		dispatch(formPostsFail(error));
		return error;
	});
}