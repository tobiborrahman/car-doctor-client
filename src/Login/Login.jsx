import { Link } from 'react-router-dom';
import img from '../assets/images/login/login.svg';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {
	const { signedUser } = useContext(AuthContext);
	const handleLogin = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		console.log(email, password);

		signedUser(email, password)
			.then((signed) => {
				const signedUp = signed.user;
				console.log(signedUp);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col lg:flex-row">
				<div className="w-1/2 mr-32">
					<img src={img} alt="" />
				</div>
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div className="card-body">
						<h1 className="text-3xl text-center font-bold">
							Login
						</h1>
						<form onSubmit={handleLogin}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="text"
									placeholder="email"
									name="email"
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="text"
									placeholder="password"
									name="password"
									className="input input-bordered"
								/>
								<label className="label">
									<a
										href="#"
										className="label-text-alt link link-hover"
									>
										Forgot password?
									</a>
								</label>
							</div>
							<div className="form-control mt-6">
								<button className="btn btn-primary">
									Login
								</button>
							</div>
						</form>

						<p>
							New to Cars Doctor?{' '}
							<Link
								to="/signup"
								className="text-orange-700 mx-auto"
							>
								Sign Up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
