import { useState } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarDropdown from '../components/calendarDropdown.jsx';

function Register() {
	const navigate = useNavigate();

	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		birthDate: null,
		password: '',
		role: ''
	})

	const [ error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formattedBirthDate = formData.birthDate ? formData.birthDate.toISOString().split('T')[0] : null;

		const payload = {
			...formData,
			birthDate: formattedBirthDate,
		};

		const res = await fetch ('/api/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		const data = await res.json();
		if(res.ok) {
			navigate('/login');
		} else {
			setError(data.error || 'Registration failed');
		}
	};

	return (
		<div className="registerDiv">
		<h2>Register</h2>
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="name"
				placeholder="Name"
				value={formData.name}
				onChange={handleChange}
			/><br/>
			<CalendarDropdown
				selectedDate={formData.birthDate}
				onChange={(date) => setFormData(prev => ({ ...prev, birthDate: date }))}
			/><br/>
			<input
				type="email"
				name="email"
				placeholder="Email"
				value={formData.email}
				onChange={handleChange}
			/><br/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				value={formData.password}
				onChange={handleChange}
			/><br/>
			<input
				type="text"
				name="role"
				placeholder="Role (user/admin)"
				value={formData.role}
				onChange={handleChange}
			/><br/>
			<button type="submit">Register</button>
			{error && <p className="error">{error}</p>}
		</form>
		</div>
	);
}

export default Register;