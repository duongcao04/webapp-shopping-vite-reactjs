export default function formatNumber(str) {
	const result = str.split('').reverse().reduce((prev, next, index) => {
		return ((index % 3) ? next : (next + ',')) + prev
	})
	return result
}