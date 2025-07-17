import React, { useEffect, useState } from "react";
import './Quotes.css';
import { useNavigate } from "react-router-dom";

function	MainSection () {
	return (
		<section className="main-section">
			<h1>What kind of quote would you like to generate?</h1>
		</section>
	);
}

function Quotes () {
	const [quote, setQuote] = useState("");
	const [showPopup, setShowPopup] = useState(false);
	const [quoteType, setQuoteType] = useState("");

	const fetchQuote = async (type) => {
		const res = await fetch(`api/quote/${type}`);
		const data = await res.json();
		setQuote(data.quote || "No quote found.");
		setQuoteType(type);
		setShowPopup(true);
	};

	const getEmoji = (type) => {
        if (type === "zen") return "🧘";
        if (type === "fortune") return "🍀";
        return "💬";
    };

	return (
		<div className="quotes-container">
			<MainSection />
			<div className="button-row">
				<button onClick={() => fetchQuote("zen")}>Zen</button>
				<button onClick={() => fetchQuote("fortune")}>Fortune</button>
			</div>
			{showPopup && (
				<div className="popup">
					<div className="popup-content">
						<p>
							{getEmoji(quoteType)}<br />
							{quote}
						</p>
						<button onClick={() => setShowPopup(false)}>Close</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Quotes;
