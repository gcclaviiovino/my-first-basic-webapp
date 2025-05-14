function formatQuote(quote, author, format) {
	if (format === 'markdown') {
		return `> ${quote}\n\n— **${author}**`;
	}
	return `${quote} — ${author}`;
}

const getZenQuote = async (req, res) => {
	try {
		const format = req.query.format;
		const response = await fetch('https://zenquotes.io/api/random');
		const data = await response.json();
		const quote = data[0]?.q || "Life is waiting for ages at the bus stop, just to catch the wrong bus.";
		const author = data[0]?.a || "Jacopo, the Zen Master";

		res.json({ quote: formatQuote(quote, author, format) });
	} catch (err) {
		console.error('Zen quote fetch error:', err.message);
		res.status(500).json({ error: 'Unable to fetch zen quote...' });
	}
};

const getFortuneQuote = async (req, res) => {
	const format = req.query.format;
	try {
		const response = await fetch('https://favqs.com/api/qotd');
		const data = await response.json();
		const quote = data.quote.body;
		const author = data.quote.author;
		return res.json({ quote: formatQuote(quote, author, format) });
	} catch (err) {
		console.error('Fortune quote fetch error:', err.message);
		return res.status(500).json({ error: 'Sorry...no quotes available at the moment :(' });
	}
};

module.exports = { getZenQuote, getFortuneQuote };