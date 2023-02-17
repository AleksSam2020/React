export const getAllCourses = () => {
	return fetch('http://localhost:3000/courses/all').then((res) => res.json());
};

export const getAllAuthors = () => {
	return fetch('http://localhost:3000/authors/all').then((res) => res.json());
};

export const addAuthor = (author) => {
	return fetch('http://localhost:3000/authors/add', {
		method: 'POST',
		body: JSON.stringify(author),
		headers: {
			Authorization: localStorage.getItem('userToken'),
			'content-type': 'application/json',
		},
	}).then((res) => res.json());
};

export const loginUser = (currentUser) => {
	return fetch('http://localhost:3000/login', {
		method: 'POST',
		body: JSON.stringify(currentUser),
		headers: {
			Authorization: localStorage.getItem('userToken'),
			'Content-Type': 'application/json',
		},
	}).then((res) => res.json());
};

export const logoutUser = () => {
	return fetch('http://localhost:3000/logout', {
		method: 'DELETE',
		headers: {
			Authorization: localStorage.getItem('userToken'),
			'Content-Type': 'application/json',
		},
	}).catch((error) => console.log(error));
};

export const checkUserRole = () => {
	return fetch('http://localhost:3000/users/me', {
		method: 'GET',
		headers: {
			Authorization: localStorage.getItem('userToken'),
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};

export const addNewCourse = (newCourse) => {
	return fetch('http://localhost:3000/courses/add', {
		method: 'POST',
		body: JSON.stringify(newCourse),
		headers: {
			accept: '/',
			Authorization: localStorage.getItem('userToken'),
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};

export const deleteCourse = (id) => {
	return fetch(`http://localhost:3000/courses/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: localStorage.getItem('userToken'),
			'Content-Type': 'application/json',
		},
	}).catch((error) => console.log(error));
};

export const updateCourse = (course, id) => {
	return fetch(`http://localhost:3000/courses/${id}`, {
		method: 'PUT',
		body: JSON.stringify(course),
		headers: {
			accept: '/',
			Authorization: localStorage.getItem('userToken'),
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};
