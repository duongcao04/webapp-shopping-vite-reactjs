export default function formatCash(argument) {
	let str = argument.toString();
	const result = str.split('').reverse().reduce((prev, next, index) => {
		return ((index % 3) ? next : (next + ',')) + prev
	})
	return result + ' ₫'
}