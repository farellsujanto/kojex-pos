import React from 'react';
import Routes from './Routes';

import { firebaseApp } from './utils/Firebase';

firebaseApp.firestore().settings({
	cacheSizeBytes: firebaseApp.firestore.CACHE_SIZE_UNLIMITED
});

firebaseApp.firestore().enablePersistence()
	.catch(function (err) {
		if (err.code === 'failed-precondition') {
			console.log("FAILED");
		} else if (err.code === 'unimplemented') {
			console.log("UNIMPLEMENTED");
		}
	});

export default () => {
	return (<Routes />);
}