import { useNavigate } from "react-router-dom";
import './Features.css';

function Features() {
	const navigate = useNavigate();

	const features = [
		{
			title: "Login",
			description: "Access personal dashboard with secure authentication",
			icon: "🔐",
			path: "/login"
		},
		{
			title: "Register",
			description: "Create a new account",
			icon: "📝",
			path: "/register"
		},
		{
			title: "Party",
			description: "Join the Parrot Party Zone for some fun",
			icon: "🦜",
			path: "/parrot"
		},
		{
			title: "Quotes",
			description: "Generate inspiring quotes to brighten your day",
			icon: "💬",
			path: "/quotes"
		}
	];

	return (
		<div className="features-container">
			<div className="features-header">
				<h1 className="features-title">Features</h1>
				<p className="features-subtitle">Explore what we have to offer</p>
			</div>
			
			<div className="features-grid">
				{features.map((feature, index) => (
					<div 
						key={index} 
						className="feature-card"
						onClick={() => navigate(feature.path)}
					>
						<div className="feature-icon">{feature.icon}</div>
						<h3 className="feature-title">{feature.title}</h3>
						<p className="feature-description">{feature.description}</p>
					</div>
				))}
			</div>

			<button className="back-home-btn" onClick={() => navigate("/")}>
				Go back Home
			</button>
		</div>
	);
}

export default Features;
