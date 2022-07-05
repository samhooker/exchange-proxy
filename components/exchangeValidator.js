const exchangeValidator = (theUrl, params, query) => {
	let allowed = ['currency', 'yearly_average', 'date_min', 'date_max', 'page'];
	let dateFormat = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
	let yearFormat = /^\d{4}$/;
	let curFormat = /^[A-Za-z]{3}$/;
	let pageFormat = /^\d*$/;

	// Validate and append any currency param
	if (typeof params.currency !== 'undefined') {
		if (curFormat.test(params.currency)) {
			theUrl += `/${params.currency.toUpperCase()}/`;
		}
		else {
			return false;
		}
	}

	// If there is a query string...
	if (Object.keys(query).length) {

		// Validate that all of the supplied query variables are allowed
		for (let q in query) {
			if (!allowed.includes(q)) {
				return false;
			}
		}
	
		// Verify that all of the query variables are properly formatted
		if (
			(query.currency && !curFormat.test(query.currency)) ||
			(query.yearly_average && !yearFormat.test(query.yearly_average)) ||
			(query.date_min && !dateFormat.test(query.date_min)) ||
			(query.date_max && !dateFormat.test(query.date_max)) ||
			(query.page && !pageFormat.test(query.page))
		) {
			return false;
		}

		// If the query is good, append it to the apiUrl
		theUrl += '?';

		for (let q in query) {
			theUrl += `${q}=${query[q]}&`;
		}
	}

	return theUrl;
}

export default exchangeValidator;