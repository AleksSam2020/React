import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import './CourseForm.css';
import { Input } from '../Input';
import { convertTime } from '../helpers';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllAuthors,
	addAuthorTC,
	getAllAuthorsTC,
} from '../../store/authors';
import {
	addNewCourseTC,
	getAllCourses,
	updateCourseTC,
} from '../../store/courses';
import { isEditMode, setEditModeAC } from '../../store/user';

export const CourseForm = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [addedAuthors, setAddedAuthors] = useState([]);
	const [authorsList, setAuthorsList] = useState([]);
	const [createAuthorValue, setCreateAuthorValue] = useState('');
	const [duration, setDuration] = useState('');
	const allAuthors = useSelector(getAllAuthors);
	const isEdit = useSelector(isEditMode);
	const courses = useSelector(getAllCourses);
	const history = useHistory();
	const dispatch = useDispatch();
	const courseId = useParams();
	const currentCourse = courses.filter(
		(course) => course.id === courseId.courseId
	)[0];
	useEffect(() => {
		dispatch(getAllAuthorsTC());
	}, []);

	useEffect(() => {
		setAuthorsList(allAuthors);
	}, [allAuthors]);

	useEffect(() => {
		if (isEdit) {
			setTitle(currentCourse.title);
			setDescription(currentCourse.description);
			setDuration(currentCourse.duration);
			const addAuthors = [];
			allAuthors.map((a) => {
				currentCourse.authors.map((id) => {
					if (a.id === id) {
						addAuthors.push(a);
					}
				});
			});
			setAddedAuthors(addAuthors);
		}
	}, [isEdit]);

	const createAuthor = () => {
		const newAuthor = {
			name: createAuthorValue,
		};
		if (createAuthorValue.length > 1) {
			dispatch(addAuthorTC(newAuthor));
		} else {
			alert('author name length should be at least 2 characters');
		}
		setCreateAuthorValue('');
	};
	const addAuthor = (e) => {
		const currentAuthor = allAuthors.find((author) => {
			return author.id === e.target.dataset.id;
		});

		const copy = addedAuthors.find((author) => {
			return author.id === currentAuthor.id;
		});

		if (!addedAuthors.includes(copy)) {
			setAddedAuthors([
				...addedAuthors,
				{ id: currentAuthor.id, name: currentAuthor.name },
			]);
		}
	};

	const deleteAuthor = (e) => {
		const currentAuthors = addedAuthors.filter((author) => {
			return author.id !== e.target.dataset.id;
		});

		setAddedAuthors(currentAuthors);
	};

	const onCreateCourse = () => {
		const newCourse = {
			title,
			description,
			duration: Number(duration),
			authors: addedAuthors.map((el) => el.id),
		};

		if (
			title === '' ||
			description.length === 0 ||
			duration === '' ||
			newCourse.authors.length === 0
		) {
			alert('Please, fill all fields');
		} else if (description.length < 2) {
			alert(' Description should be at least 2 characters');
		} else if (duration === '0') {
			alert('duration should be more than 0 minute');
		} else {
			dispatch(addNewCourseTC({ ...newCourse }));
			history.push('/courses');
		}
	};
	const onSaveCourse = () => {
		const course = {
			title,
			description,
			duration: Number(duration),
			authors: addedAuthors.map((el) => el.id),
		};
		dispatch(updateCourseTC(course, currentCourse.id));
		dispatch(setEditModeAC(false));
		history.push('/courses');
	};
	return (
		<div className='container-create-course'>
			<div>
				<div className='title-btn-container'>
					<div className='title-container'>
						<label htmlFor='title'>Title</label>
						<Input
							id='title'
							placeholder='Enter title...'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div>
						{!isEdit ? (
							<Button content='Create course' onClick={onCreateCourse} />
						) : (
							<Button content='Save' onClick={onSaveCourse} />
						)}
					</div>
				</div>
				<div className='description-container'>
					<label htmlFor='description'>Description</label>
					<textarea
						id='description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						minLength='2'
						placeholder='Enter description...'
					/>
				</div>
			</div>
			<div>
				<div className='create-add-author'>
					<div>
						<div className='title-add-author'>
							<span>Add author</span>
						</div>
						<div>
							<label htmlFor='author'>Author name</label>
							<Input
								id='author'
								placeholder='Enter author name...'
								onChange={(e) => setCreateAuthorValue(e.target.value)}
								value={createAuthorValue}
							/>
						</div>
						<div className='btn-create-author'>
							<Button content='Create author' onClick={createAuthor} />
						</div>
					</div>

					<div className='authors-container'>
						<div className='title-authors'>
							<span>Authors</span>
						</div>
						{authorsList.map((author) => {
							return (
								<div className='author' key={author.id}>
									<div className='author-name'>{author.name}</div>
									<Button
										content='Add author'
										onClick={addAuthor}
										id={author.id}
									/>
								</div>
							);
						})}
					</div>
				</div>

				<div className='duration-delete-author-container'>
					<div>
						<div className='title-duration'>
							<span>Duration</span>
						</div>
						<div>
							<label htmlFor='duration'>Duration</label>
							<Input
								id='author'
								placeholder='Enter duration...'
								value={duration}
								onChange={(e) => setDuration(e.target.value)}
								type='number'
							/>
						</div>
						<div>
							Duration: <span>{convertTime(duration)}</span> hours
						</div>
					</div>

					<div className='added-authors-container'>
						<div className='title-course-authors'>
							<span>Course authors</span>
						</div>
						{!addedAuthors.length && (
							<div className='empty'>Author list is empty</div>
						)}
						{addedAuthors.map((author) => {
							return (
								<div className='author' key={author.id}>
									<div className='author-name'>{author.name}</div>
									<Button
										content='Delete author'
										onClick={deleteAuthor}
										id={author.id}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
