import React, { useEffect, useState } from 'react';

const UpliftingMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // You can later fetch from an API here if desired
        const fetchMessages = () => {
            const exampleMessages = [
                "Believe in yourself and all that you are.",
                "You are stronger than you think.",
                "Every day may not be good, but there is something good in every day.",
                "Keep your face always toward the sunshine—and shadows will fall behind you.",
                "The only way to do great work is to love what you do."
            ];
            setMessages(exampleMessages);
        };

        fetchMessages();
    }, []);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>🌟 Uplifting Messages</h2>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                {messages.map((message, index) => (
                    <li key={index} style={{ marginBottom: '10px', fontSize: '1.1em' }}>
                        {message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpliftingMessages;
