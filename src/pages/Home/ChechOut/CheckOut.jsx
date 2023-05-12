import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const CheckOut = () => {
	const services = useLoaderData();
	const { user } = useContext(AuthContext);
	const { _id, img, title, price } = services;

	const handleBooking = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const formPrice = form.price.value;
		const email = form.email.value;
		const formTitle = form.title.value;
		const date = form.date.value;

		console.log(name, email, formPrice, formTitle);
		const booking = {
			name,
			service: title,
			service_id: _id,
			img,
			price,
			date,
			email: user?.email,
		};

		console.log(booking);

		fetch('http://localhost:5000/bookings', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(booking),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.insertedId) {
					Swal.fire({
						title: 'Success!',
						text: 'Item added successfully',
						icon: 'success',
						confirmButtonText: 'Cool',
					});
				}
			});
	};
	return (
		<div>
			<h2>CheckOut booking: {title}</h2>

			<div className="card flex-shrink-0 max-w-2xl mx-auto shadow-2xl bg-base-100">
				<form onSubmit={handleBooking} className="card-body">
					<div className="flex justify-between">
						<div className="w-1/2">
							<div className="form-control">
								<label className="label">
									<span className="label-text">Name</span>
								</label>
								<input
									type="text"
									placeholder="name"
									name="name"
									className="input input-bordered w-full"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Price</span>
								</label>
								<input
									type="text"
									placeholder="price"
									name="price"
									defaultValue={price}
									className="input input-bordered"
								/>
							</div>
						</div>
						<div className="w-1/2">
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="email"
									placeholder="email"
									name="email"
									defaultValue={user?.email}
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Date</span>
								</label>
								<input
									type="date"
									placeholder="title"
									name="date"
									className="input input-bordered"
								/>
							</div>
						</div>
					</div>
					<div className="form-control">
						<textarea
							type="text"
							placeholder="Your Message"
							className="input input-bordered h-52"
						/>
					</div>
					<div className="form-control mt-6">
						<button className="btn btn-primary">
							Order Confirm
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CheckOut;
