export default getAddressString = (addressObj) => {
	let a = addressObj
		? addressObj.district ??
		  addressObj.city ??
		  addressObj.subregion ??
		  addressObj.region ??
		  addressObj.name
		: "";
	a = `${a ?? ""}`.trim();
	return a;
};
