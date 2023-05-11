import { Link } from 'react-router-dom';
import img from '../assets/images/login/login.svg';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const SignUp = () => {
	const { createUser } = useContext(AuthContext);

	const handleSignUp = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;
		console.log(name, email, password);

		createUser(email, password)
			.then((signedUp) => {
				const signedUpUser = signedUp.user;
				console.log(signedUpUser);
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
							Sign Up
						</h1>
						<form onSubmit={handleSignUp}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Name</span>
								</label>
								<input
									type="text"
									placeholder="name"
									name="name"
									className="input input-bordered"
								/>
							</div>
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
									Sign Up
								</button>
							</div>
						</form>

						<p>
							Already Have an Account?{' '}
							<Link
								to="/login"
								className="text-orange-700 mx-auto"
							>
								Login
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
