import { createContext, useEffect, useState } from 'react';
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const googleProvider = new GoogleAuthProvider();

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signedUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log('user on auth change', currentUser);
			setUser(currentUser);
			setLoading(false);
			if (currentUser && currentUser.email) {
				const loggedUser = {
					email: currentUser.email,
				};
				console.log(loggedUser);

				fetch('https://car-doctor-server-tobibur2021.vercel.app/jwt', {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify(loggedUser),
				})
					.then((res) => res.json())
					.then((data) => {
						console.log('response token', data);
						localStorage.setItem('car-access-token', data.token);
					});
			} else {
				localStorage.removeItem('car-access-token');
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	const authInfo = {
		user,
		loading,
		createUser,
		signedUser,
		googleSignIn,
		logOut,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
