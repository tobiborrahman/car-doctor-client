import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
	const [services, setServices] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5000/services')
			.then((res) => res.json())
			.then((data) => setServices(data));
	}, []);
	return (
		<div>
			<div className="text-center space-y-3">
				<h3 className="text-2xl font-semibold text-orange-500">
					Service
				</h3>
				<h1 className="text-6xl font-bold">Our Services Area</h1>
				<p>
					the majority have suffered alteration in some form, by
					injected humour, or randomized <br /> words which do not
					look even slightly believable.{' '}
				</p>
			</div>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
				{services.map((service) => (
					<ServiceCard
						key={service._id}
						service={service}
					></ServiceCard>
				))}
			</div>
		</div>
	);
};

export default Services;
