import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
	const navigate = useNavigate();

	return (
		<div className="home-container">
			<div className="welcome-badge">Welcome to</div>
			<h1 className="main-title">
				Web App<br />Basics.
			</h1>
			<button className="get-started-btn" onClick={() => navigate("/features")}>
				Get started
			</button>
		</div>
	);
}

export default Home;