import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import BookingsRow from './BookingsRow';

const Bookings = () => {
	const { user } = useContext(AuthContext);
	const [bookings, setBookings] = useState([]);

	const url = `http://localhost:5000/bookings?email=${user.email}`;
	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => setBookings(data));
	}, []);

	const handleDelete = (id) => {
		const proceed = confirm('Are you sure you want to delete?');
		if (proceed) {
			fetch(`http://localhost:5000/bookings/${id}`, {
				method: 'DELETE',
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.deletedCount > 0) {
						const remaining = bookings.filter(
							(booking) => booking._id !== id
						);
						setBookings(remaining);
					}
				});
		}
	};

	const handleBookingConfirm = (id) => {
		fetch(`http://localhost:5000/bookings/${id}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ status: 'confirm' }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.modifiedCount > 0) {
					//update state
					const remaining = bookings.filter(
						(booking) => booking._id !== id
					);
					const updated = bookings.find(
						(booking) => booking._id === id
					);
					updated.status = 'confirm';
					const newBooking = [updated, ...remaining];
					setBookings(newBooking);
				}
			});
	};
	return (
		<div>
			<h2 className="text-5xl text-center my-14">
				Bookings: {bookings.length}
			</h2>
			<div className="overflow-x-auto w-full">
				<table className="table w-full">
					{/* head */}
					<thead>
						<tr>
							<th>
								<label>
									<input
										type="checkbox"
										className="checkbox"
									/>
								</label>
							</th>
							<th>image</th>
							<th>Name</th>
							<th>Date</th>
							<th>price</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{bookings.map((booking) => (
							<BookingsRow
								key={booking._id}
								booking={booking}
								handleDelete={handleDelete}
								handleBookingConfirm={handleBookingConfirm}
							></BookingsRow>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Bookings;
