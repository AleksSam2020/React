import React from 'react';
import { Button } from '../Button';
import DeleteIcon from '../assets/delete.svg';
import UpdateIcon from '../assets/pencil.svg';
import './CourseCard.css';
import { useSelector } from 'react-redux';
import { user } from '../../store/user';

export const CourseCard = ({
	title,
	description,
	authors,
	duration,
	creationDate,
	onClick,
	onDeleteCourse,
	onUpdateCourse,
}) => {
	const userSelector = useSelector(user);
	return (
		<div className='course-card'>
			<div className='main-container'>
				<div>{title}</div>
				<div>{description}</div>
			</div>
			<div className='secondary-container'>
				<div>
					Authors: <span>{authors}</span>
				</div>
				<div>
					Duration: <span>{duration} hours</span>
				</div>
				<div>
					Created: <span>{creationDate}</span>
				</div>
				<div>
					<Button content='Show course' onClick={onClick} />
					{userSelector.role === 'admin' && (
						<>
							<img src={UpdateIcon} alt='update' onClick={onUpdateCourse} />
							<img src={DeleteIcon} alt='delete' onClick={onDeleteCourse} />
						</>
					)}
				</div>
			</div>
		</div>
	);
};
