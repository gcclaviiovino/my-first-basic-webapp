import { useState } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarDropdown from '../components/calendarDropdown.jsx';

function Register() {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);

	const [ formData, setFormData ] = useState({
		name: '',
		surname: '',
		email: '',
		birthDate: null,
		password: '',
		role: '',
		confirmPassword: ''
	})

	const [ error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));

		// Real-time password validation
		if (name === "password") {
			const passwordChecks = passwordRules(value).filter(rule => rule !== true);
			if (passwordChecks.length > 0) {
				setError(passwordChecks[0]);
				return;
			} else {
				setError('');
			}
			if (formData.confirmPassword) {
				const confirmPasswordChecks = confirmPasswordRules(value, formData.confirmPassword).filter(rule => rule !== true);
				if (confirmPasswordChecks.length > 0) {
					setError(confirmPasswordChecks[0]);
					return;
				}
			}
		}

		if (name === "confirmPassword") {
			const confirmPasswordChecks = confirmPasswordRules(formData.password, value).filter(rule => rule !== true);
			if (confirmPasswordChecks.length > 0) {
				setError(confirmPasswordChecks[0]);
				return;
			} else {
				setError('');
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (error) return;

		const formattedBirthDate = formData.birthDate ? formData.birthDate.toISOString().split('T')[0] : null;

		const payload = {
			...formData,
			birthDate: formattedBirthDate,
		};

		const res = await fetch('/api/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		const data = await res.json();
		if (res.ok) {
			navigate('/login');
		} else {
			setError(data.error || 'Registration failed');
		}
	};

	const passwordRules = (password) => [
		!!password || 'Password field is required',
		password.length >= 8 || 'Your password should contain at least 8 characters',
		/[A-Z]/.test(password) || 'Your password should contain at least an uppercase',
		/[a-z]/.test(password) || 'Your password should contain at least a lowercase',
		/[0-9]/.test(password) || 'Your password should contain at least a digit',
		/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) || 'Your password should contain at least a special character',
	];

	const confirmPasswordRules = (password, confirmPassword) => [
		!!confirmPassword || 'You need to confirm your password',
		confirmPassword === password || 'The passwords do not match',
	];

	const handleContinue = (e) => {
		e.preventDefault();
		if (!formData.name || !formData.birthDate) {
			setError('Please fill in all required fields');
			return;
		}
		setError('');
		setStep(2);
	};

	return (
		<div className="register-wrapper">
			<div className="registerDiv">
				<div className="register-form-container">
					<div className="login-logo">
						<img src="/assets/logo.png" alt="Logo" />
					</div>
					<h2 className="register-title">Welcome!</h2>
					<p className="register-subtitle">
						{step === 1 ? 'A minute to sign up, many more to enjoy our features' : 'A minute to sign up, many more to enjoy our features'}
					</p>
					
					{step === 1 ? (
						<form onSubmit={handleContinue}>
						<div className="input-group">
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
							<span className="input-label">Name</span>
							<i className="input-underline"></i>
						</div>
						<div className="input-group">
							<input
								type="text"
								name="surname"
								value={formData.surname}
								onChange={handleChange}
								required
							/>
							<span className="input-label">Surname</span>
							<i className="input-underline"></i>
						</div>
						<div className="form-row">
							<div className="input-group half-width">
								<CalendarDropdown
									selectedDate={formData.birthDate}
									onChange={(date) => setFormData(prev => ({ ...prev, birthDate: date }))}
								/>
							</div>
							<div className="input-group half-width">
								<input
									type="text"
									name="role"
									value={formData.role}
									onChange={handleChange}
									required
								/>
								<span className="input-label">Role</span>
								<i className="input-underline"></i>
							</div>
						</div>
						<button type="submit" className="signin-btn">Continue</button>
						{error && <p className="error-message">{error}</p>}
					</form>
				) : (
					<form onSubmit={handleSubmit}>
						<div className="input-group">
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
							<span className="input-label">Email</span>
							<i className="input-underline"></i>
						</div>
						<div className="input-group">
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								required
							/>
							<span className="input-label">Password</span>
							<i className="input-underline"></i>
						</div>
						<div className="input-group">
							<input
								type="password"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
							/>
							<span className="input-label">Confirm Password</span>
							<i className="input-underline"></i>
						</div>
						<button type="submit" className="signin-btn">Sign Up</button>
						{error && <p className="error-message">{error}</p>}
					</form>
				)}
				</div>
			</div>
		</div>
	);
}

export default Register;