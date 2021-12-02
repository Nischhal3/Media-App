(async () => {
	'use strict';
	const url = 'http://localhost:3000'; 

	// check sessionStorage
	if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
		location.href = '../login/index.html';
		return;
	}
	// check if token valid
	try {
		const fetchOptions = {
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('token'),
			},
		};
		const response = await fetch(url + '/user/token', fetchOptions);
		if (!response.ok) {
			location.href = '../login/index.html';
		} else {
			const json = await response.json();
			sessionStorage.setItem('user', JSON.stringify(json.user));
		}
	} catch (e) {
		console.log(e.message);
	}
})();
