import React from 'react';
import './CourseInfo.css';
import { useHistory, useParams } from 'react-router-dom';
import { convertTime, getAuthorName } from '../helpers';
import { useSelector } from 'react-redux';
import { getAllAuthors } from '../../store/authors';
import { getAllCourses } from '../../store/courses';

export const CourseInfo = () => {
	const history = useHistory();
	const { courseId } = useParams();
	const allCourses = useSelector(getAllCourses);
	const authorsList = useSelector(getAllAuthors);
	const course = allCourses.filter((c) => c.id === courseId)[0];
	return (
		<div className='show-course-container'>
			<div>
				<div className='back'>
					&lsaquo; <span onClick={() => history.goBack()}>Back to courses</span>
				</div>
				<div className='show-title-container'>{course.title}</div>
				<div className='show-description-container'>
					<div>{course.description}</div>
					<div>
						<div>
							ID: <span>{course.id}</span>
						</div>
						<div>
							Duration: <span>{convertTime(course.duration)}</span>
						</div>
						<div>
							Created: <span>{course.creationDate}</span>
						</div>
						<div>
							Authors: <span>{getAuthorName(course.authors, authorsList)}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
