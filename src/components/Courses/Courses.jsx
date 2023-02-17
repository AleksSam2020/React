import React, { useEffect, useState } from 'react';
import { Input } from '../Input';
import './Courses.css';
import { Button } from '../Button';
import { CourseCard } from '../CourseCard';
import { convertTime, getAuthorName } from '../helpers';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
	deleteCourseTC,
	getAllCourses,
	getAllCoursesTC,
	setAllCoursesAC,
} from '../../store/courses';
import { getAllAuthors, getAllAuthorsTC } from '../../store/authors';
import { checkUserRoleTC, setEditModeAC, user } from '../../store/user';

export const Courses = () => {
	const history = useHistory();
	const [query, setQuery] = useState('');
	const courses = useSelector(getAllCourses);
	const authorsList = useSelector(getAllAuthors);
	const userSelector = useSelector(user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllAuthorsTC());
		dispatch(checkUserRoleTC());
	}, [dispatch]);

	const handleChange = (event) => {
		setQuery(event.target.value);
	};

	const onSearch = () => {
		const SearchCourses = courses.filter((course) => {
			return (
				course.title.toLowerCase().includes(query.toLowerCase()) ||
				course.id.toLowerCase().includes(query.toLowerCase())
			);
		});
		dispatch(setAllCoursesAC(SearchCourses));
	};
	useEffect(() => {
		if (query === '') dispatch(getAllCoursesTC());
	}, [query]);

	const addCourse = () => {
		history.push('/courses/add');
	};

	const onShowCourse = (id) => {
		history.push(`/courses/${id}`);
	};

	const onDeleteCourse = (id) => {
		dispatch(deleteCourseTC(id));
	};
	const onUpdateCourse = (id) => {
		dispatch(setEditModeAC(true));
		history.push(`/courses/update/${id}`);
	};

	return (
		<div className='courses'>
			<div className='container'>
				<div className='search-bar'>
					<Input
						onChange={handleChange}
						value={query}
						placeholder='Enter course name...'
					/>
					<Button content='Search' onClick={onSearch} />
				</div>
				<div>
					{userSelector.role === 'admin' && (
						<Button content='Add new Course' onClick={addCourse} />
					)}
				</div>
			</div>

			{courses.map((item) => {
				return (
					<CourseCard
						key={item.id}
						title={item.title}
						description={item.description}
						duration={convertTime(item.duration)}
						authors={getAuthorName(item.authors, authorsList)}
						created={item.creationDate}
						onClick={() => onShowCourse(item.id)}
						onDeleteCourse={() => onDeleteCourse(item.id)}
						onUpdateCourse={() => onUpdateCourse(item.id)}
					/>
				);
			})}
		</div>
	);
};
