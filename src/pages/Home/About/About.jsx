import person from '../../../assets/images/about_us/person.jpg';
import parts from '../../../assets/images/about_us/parts.jpg';

const About = () => {
	return (
		<div className="hero min-h-screen">
			<div className="hero-content flex-col lg:flex-row">
				<div className="w-1/2 relative">
					<img
						src={person}
						className="w-[400px] h-[400px] rounded-lg"
					/>
					<img
						src={parts}
						className=" w-2/4 h-[250px] mr-24 border-8 border-white absolute top-1/2 right-0 rounded-lg"
					/>
				</div>
				<div className="w-1/2">
					<h3 className="text-2xl font-semibold text-orange-500">
						About Us
					</h3>
					<h1 className="text-5xl font-bold">
						We are qualified <br /> & of experience <br /> in this
						field
					</h1>
					<p className="py-6">
						There are many variations of passages of Lorem Ipsum
						available, but the majority have suffered alteration in
						some form, by injected humour, or randomized words which
						do not look even slightly believable.
					</p>
					<p>
						the majority have suffered alteration in some form, by
						injected humour, or randomized words which do not look
						even slightly believable.
					</p>
					<button className="btn btn-warning mt-10">
						Get More Info
					</button>
				</div>
			</div>
		</div>
	);
};

export default About;
