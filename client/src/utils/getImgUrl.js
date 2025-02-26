// function getImgUrl(name) {
// 	return new URL(`../assets/books/${name}`, import.meta.url);
// }

function getImgUrl(coverImage) {
	return coverImage || 'https://via.placeholder.com/150';
}
export { getImgUrl };
