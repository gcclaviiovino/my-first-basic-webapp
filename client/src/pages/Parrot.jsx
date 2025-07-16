import { useEffect, useState } from "react";

function Parrot() {
    const [html, setHtml] = useState(null);

    useEffect(() => {
        fetch("/api/parrot")
            .then((res) => res.text())
            .then(setHtml)
            .catch(console.error);
    }, []);

    if (!html) return <div>Loading...</div>;

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
}

export default Parrot;