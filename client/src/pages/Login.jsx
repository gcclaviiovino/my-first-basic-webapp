import { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch('/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});

		const data = await res.json();
		if (res.ok) {
			console.log(data.token);
			localStorage.setItem('token', data.token);
			localStorage.setItem('user', JSON.stringify(data.user)); 
			navigate('/dashboard');
		} else {
			alert(data.error || 'Login failed');
		}
	};

	return (
		<div className="login-wrapper">
			<div className="loginDiv">
				<div className="login-logo">
					<img src="/assets/logo.png" alt="Logo" />
				</div>
				<h2 className="login-title">Welcome back!</h2>
				<p className="login-subtitle">
					Don't have an account? <span className="signup-link" onClick={() => navigate('/register')}>Sign up</span>
				</p>
				<form onSubmit={handleSubmit}>
					<div className="input-group">
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<span className="input-label">Username</span>
						<i className="input-underline"></i>
					</div>
					<div className="input-group">
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<span className="input-label">Password</span>
						<i className="input-underline"></i>
					</div>
					<button type="submit" className="signin-btn">Sign In</button>
				</form>
				<p className="forgot-password">Forgot Password?</p>
				{message && <p className="error-message">{message}</p>}
			</div>
		</div>
	);
}

export default Login;