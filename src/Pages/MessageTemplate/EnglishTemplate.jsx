import React, { useRef, useState } from 'react';

const EnglishTemplate = () => {
    const templateRef = useRef(null);
    const [showToast, setShowToast] = useState(false);

    const handleCopy = () => {
        const text = templateRef.current?.innerText;
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }).catch(err => {
                console.error(err);
            });
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center py-10 px-4 relative">
            {showToast && (
                <div className="fixed top-5 bg-purple-600 text-white px-4 py-2 rounded shadow-lg animate-bounce z-50">
                    ✅ Template Copied!
                </div>
            )}

            <h1 className="text-purple-400 text-3xl font-bold mb-4">Message Template</h1>
            <p className="text-gray-300 text-center max-w-2xl mb-8">
                Use this professional template to contact artists using your beats without authorization
            </p>

            <div className="bg-[#1e1e1e] text-gray-300 max-w-2xl w-full rounded-2xl shadow-lg p-6">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleCopy}
                        className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-lg"
                    >
                        Copy Template
                    </button>
                </div>

                <div ref={templateRef} className="bg-[#2b2b2b] p-6 rounded-lg whitespace-pre-wrap text-gray-200">
                    <p><strong>Subject:</strong> Urgent: Unauthorized Use of Beat – License Required</p>
                    <p className="mt-4">Dear [Artist's Name],</p>
                    <p className="mt-4">
                        I hope you're doing well. I recently discovered that you have used my beat titled
                        [Beat Name] in your song "[Song Name]", which is currently available on streaming
                        platforms where the song is published.
                    </p>
                    <p className="mt-4">
                        I appreciate your interest in my work, and I'm glad that my production has inspired your
                        creativity. However, this beat is protected under copyright, and its usage requires a valid
                        license. Unfortunately, I could not find a valid license associated with your song, meaning
                        that it is currently being used without my authorization.
                    </p>
                    <p className="mt-4">
                        To ensure that you can continue using the beat legally and avoid any copyright claims, I
                        invite you to purchase the appropriate license via the following link:
                    </p>
                    <p className="mt-2">👉 [Link to purchase License]</p>
                    <p className="mt-4">
                        I really like what you've done with the song, and I would love for it to remain available on
                        streaming platforms. However, if you are not willing to acquire the License, I will have to
                        proceed with requesting the removal of the song from digital platforms.
                    </p>
                    <p className="mt-4">
                        Please let me know how you'd like to proceed within the next [X days]. I prefer to resolve
                        this matter amicably and support artists who respect producers' rights.
                    </p>
                    <p className="mt-4">Looking forward to your response.</p>
                    <p className="mt-4">Best regards,</p>
                    <p>[Your Name]</p>
                    <p>[Contact Information]</p>
                    <p>[Your Website / Social Media Links]</p>
                </div>
            </div>

            <div className="bg-[#1d2333] text-gray-300 max-w-2xl w-full mt-6 rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-2">💡 How to use this template</h2>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Copy the template using the button above</li>
                    <li>Replace all placeholders in brackets with the relevant information</li>
                    <li>Send the message to the artist</li>
                    <li>Adjust the tone and edits as needed for your specific situation</li>
                    <li>Send the message through your preferred contact method</li>
                </ol>

                <div className="bg-[#2f204c] p-3 mt-4 rounded-lg text-sm text-purple-300">
                    <strong>Remember:</strong> The purpose of this message is to connect the artist into a client. Being
                    friendly and professional can lead to better results and potential long-term business relationships.
                </div>
            </div>
        </div>
    );
};

export default EnglishTemplate;