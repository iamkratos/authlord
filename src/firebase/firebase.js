import * as firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyDt2ufPLfgvIRdr3gYLYVcL0L6x3V07i6w',
	authDomain: 'jeopardy-77dae.firebaseapp.com',
	databaseURL: 'https://jeopardy-77dae.firebaseio.com',
	projectId: 'jeopardy-77dae',
	storageBucket: 'jeopardy-77dae.appspot.com',
	messagingSenderId: '491166262478'
};

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
