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
			navigate('/dashboard');
		} else {
			alert(data.error || 'Login failed');
		}
	};

	return (
		<div className="loginDiv">
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/><br/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/><br/>
				<button type="submit">Login</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}

export default Login;