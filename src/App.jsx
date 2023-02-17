import './App.css';
import { Header } from './components/Header';
import { Courses } from './components/Courses';
import { CourseForm } from './components/CourseForm';
import { useEffect, useState } from 'react';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { CourseInfo } from './components/CourseInfo';
import { useDispatch } from 'react-redux';
import { getAllCoursesTC } from './store/courses/thunk';
import { getAllAuthorsTC } from './store/authors/thunk';
import { PrivateRouter } from './components/PrivateRouter/PrivateRouter';

function App() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [showUserLogin, setShowUserLogin] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('userToken')) {
			setShowUserLogin(true);
		}
	}, [showUserLogin]);

	useEffect(() => {
		dispatch(getAllCoursesTC());
		dispatch(getAllAuthorsTC());
	}, [dispatch]);

	return (
		<Router history={history}>
			<div className='App'>
				<Header
					showUserLogin={showUserLogin}
					setShowUserLogin={setShowUserLogin}
				/>
				<Switch>
					<PrivateRouter path='/courses/add'>
						<CourseForm />
					</PrivateRouter>
					<Route exact path='/courses/update/:courseId'>
						<CourseForm />
					</Route>
					<Route path='/courses/:courseId'>
						<CourseInfo />
					</Route>
					<Route exact path='/login'>
						<Login setShowUserLogin={setShowUserLogin} />
					</Route>
					<Route exact path='/registration'>
						<Registration setShowUserLogin={setShowUserLogin} />
					</Route>
					<Route path='/courses'>
						<Courses />
					</Route>
					{localStorage.getItem('userToken') ? (
						<Redirect to='courses' />
					) : (
						<Redirect to='login' />
					)}
				</Switch>
			</div>
		</Router>
	);
}

export default App;
