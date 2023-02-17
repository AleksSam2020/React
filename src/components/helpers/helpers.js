export const convertTime = (duration) => {
	let a = `${Math.floor(duration / 60)}`;
	let b = duration - a * 60 + '';

	if (b < 10) {
		b = b.padStart(2, '0');
	}
	if (a < 10) {
		a = a.padStart(2, '0');
	}
	return `${a}:${b}`;
};

export const dateOfCreate = () => {
	const today = new Date();

	return `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
};

export const getAuthorName = (authors, authorsList) => {
	let authorsNames = [];
	authors.map((authorId) => {
		authorsList.find((author) => {
			if (authorId === author.id) {
				authorsNames.push(author.name);
			}
		});
	});
	return authorsNames.join(', ');
};
