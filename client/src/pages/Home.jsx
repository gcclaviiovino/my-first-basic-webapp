import './Home.css';
import { useNavigate } from "react-router-dom";

function HeroSection() {
    return (
        <section className="hero-section">
            <h1>Welcome to liovino's little server!</h1>
            <p>You can get started by logging in or creating a new account.</p>
        </section>
    );
}

function FunSection() {
    return (
        <section className="fun-section">
            <p>Or just take some time to have fun.</p>
        </section>
    );
}

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <HeroSection />
            <div className="button-row">
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Register</button>
            </div>
            <FunSection />
            <div className="button-row">
                <button onClick={() => navigate("/parrot")}>Parrot Party Zone</button>
                <button onClick={() => navigate("/quotes")}>Quote Generator</button>
            </div>
        </div>
    );
}

export default Home;