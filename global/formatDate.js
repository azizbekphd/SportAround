import getNull from "./getNull";

export default function formatDate(dateStr) {
	console.log(`${dateStr} is ${typeof dateStr}`);
	if (dateStr != null) {
		let date =
			typeof dateStr == "string"
				? new Date(dateStr)
				: typeof dateStr == "object"
				? dateStr
				: null;
		return `${getNull(date.getDate())}.${getNull(
			date.getMonth() + 1
		)}.${getNull(date.getFullYear())}`;
	}
}
