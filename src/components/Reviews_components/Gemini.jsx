import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

function Gemini({ data, username }) {
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState('');
    const [reviews, setReviews] = useState([]);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

    useEffect(() => {
        if (!data) return;
        const allReviewsWithMovies = Object.entries(data).flatMap(([movieName, movieReviews]) =>
            movieReviews.map(entry => ({
                movieName: movieName.replace(/-/g, ' ').split(' ').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' '),
                review: entry.review
            }))
        );
        setReviews(allReviewsWithMovies);
    }, [data]);

    useEffect(() => {
        if (!username || !reviews.length) return;

        const cachedData = JSON.parse(localStorage.getItem(`${username}_apiData`));
        if (cachedData && isValidCache(cachedData.timestamp)) {
            setApiData(cachedData.text);
        }
    }, [username, reviews]);

    const isValidCache = (timestamp) => {
        const oneDay = 24 * 60 * 60 * 1000;
        return (Date.now() - timestamp) < oneDay;
    };

    const fetchData = async () => {
        if (!reviews.length) return;
        
        setLoading(true);
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `
            ROAST ME!
            I am a user of a website. i write reviews of movies. I am going to give you a list of my reviews that i have written through my time. 
            I want you to analyze them and tell me about my movie taste. Give me an overview of the types of comments I tend to make, recurring themes, and my attitude toward different genres, actors, or storytelling approaches.
            Start by giving me an engaging long summary based on my reviews. Be detailed and in-depth, but don't take yourself seriously. Be sarcastic, funny and roast me. You are a harsh critic!
            
            After the summary, break down my reviewing style into these sections and be funny there too:
            What kind of movies do i watch?
            Key themes in my reviews.
            What my reviews say about my movie preferences
            My approach to critiquing films
            Unique habits.
            The reviews: ${JSON.stringify(reviews)} 
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            setApiData(text);

            localStorage.setItem(`${username}_apiData`, JSON.stringify({
                text: text,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
            setApiData("Failed to generate content.");
        }
        setLoading(false);
    };

    return (
        <div className={`flex flex-col items-center gap-5 justify-between bg-gray-100 bg-opacity-60 w-full rounded-lg shadow-lg ${apiData ? 'px-12 py-6 md:px-12 md:py-6 ' : 'p-3 md:p-6 }'}`}>
            <h2 className="text-xl text-center font-oswald text-gray-700">AI Review Analysis</h2>
            {!apiData && reviews.length > 0 && (
                <button
                    onClick={fetchData}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Analyze'}
                </button>
            )}

            <div className="">
                {loading ? (
                    <p>Analyzing reviews, please wait...</p>
                ) : reviews.length === 0 ? (
                    <p className="text-gray-600">No reviews available to analyze</p>
                ) : (
                    <ReactMarkdown className="text-gray-900 text-sm">{apiData}</ReactMarkdown>
                )}
            </div>
        </div>
    );
}

export default Gemini;