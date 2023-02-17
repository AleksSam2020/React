import { convertTime, getAuthorName } from '../../components/helpers';
import { mockedAuthorsList } from '../../components/CourseCard/CourseCard.constants';

export const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
	courses: [
		{
			id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
			title: 'JavaScript',
			description: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum
 has been the industry's standard dummy text ever since
the 1500s, when an unknown
 printer took a galley of type and scrambled it to make
a type specimen book.`,
			creationDate: '9/3/2021',
			duration: convertTime(160),
			authors: getAuthorName(
				[
					'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
					'f762978b-61eb-4096-812b-ebde22838167',
				],
				mockedAuthorsList
			),
		},
	],
	authors: mockedAuthorsList,
};

export const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};
