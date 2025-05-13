const parrotMake = (req, res) => {
	res.send(`
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>🎉 Parrot Party Zone 🦜</title>
			<style>
				body {
					margin: 0;
					padding: 0;
					height: 100vh;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					background: linear-gradient(270deg, #ff0080, #7928ca, #2afadf, #00ff88);
					background-size: 800% 800%;
					animation: backgroundDance 10s ease infinite;
					font-family: 'Comic Sans MS', cursive, sans-serif;
					color: white;
					text-shadow: 2px 2px #000;
				}

				@keyframes backgroundDance {
					0% { background-position: 0% 50%; }
					50% { background-position: 100% 50%; }
					100% { background-position: 0% 50%; }
				}

				.parrots {
					font-size: 5rem;
					animation: bounce 0.6s infinite alternate ease-in-out;
					filter: drop-shadow(0 0 10px yellow);
				}

				@keyframes bounce {
					from { transform: translateY(0); }
					to { transform: translateY(-30px); }
				}

				h1 {
					margin-top: 20px;
					font-size: 2.5rem;
				}
			</style>
		</head>
		<body>
			<div class="parrots">🦜🕺🦜💃🦜</div>
			<h1>Welcome to the Parrot Party Zone</h1>
			<p>Powered by vibes and Node.js ⚡</p>
		</body>
		</html>
	`);
};

module.exports = { parrotMake };