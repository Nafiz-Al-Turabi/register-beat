import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <p className="text-gray-400 mb-4">
                At BeatProtect, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
            </p>

            <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
            <p className="text-gray-400">When you register and use BeatProtect, we may collect the following information:</p>
            <ul className="list-disc pl-6 text-gray-400">
                <li>Personal information (e.g., name, email address, phone number).</li>
                <li>Beat details (e.g., title, BPM, genre, and related metadata).</li>
                <li>Uploaded files (e.g., beat audio files and cover images).</li>
                <li>Payment details (if applicable for premium services).</li>
                <li>Technical data such as IP address, browser type, and device information.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">2. How We Use Your Information</h2>
            <p className="text-gray-400">We use the collected data for the following purposes:</p>
            <ul className="list-disc pl-6 text-gray-400">
                <li>To provide and improve our beat protection services.</li>
                <li>To process beat registrations and verifications.</li>
                <li>To communicate with you regarding updates, support, and security alerts.</li>
                <li>To analyze user trends and enhance user experience.</li>
                <li>To comply with legal obligations and prevent fraudulent activities.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">3. Data Security</h2>
            <p className="text-gray-400">
                We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-xl font-semibold mt-6">4. Sharing of Information</h2>
            <p className="text-gray-400">We do not sell, rent, or share your personal information with third parties, except in the following cases:</p>
            <ul className="list-disc pl-6 text-gray-400">
                <li>When required by law or regulatory authorities.</li>
                <li>To process transactions (e.g., payment gateways).</li>
                <li>With trusted partners who assist in platform operations (under strict confidentiality agreements).</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">5. Cookies & Tracking Technologies</h2>
            <p className="text-gray-400">
                We use cookies and similar technologies to improve user experience, analyze site traffic, and provide personalized content. You can manage your cookie preferences through your browser settings.
            </p>

            <h2 className="text-xl font-semibold mt-6">6. Third-Party Links</h2>
            <p className="text-gray-400">
                Our platform may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their privacy policies.
            </p>

            <h2 className="text-xl font-semibold mt-6">7. Your Rights & Choices</h2>
            <p className="text-gray-400">
                You have the right to access, modify, or delete your personal data. If you wish to exercise these rights, please contact us at <a href="mailto:support@beatprotect.com" className="text-[#7e3aed]">support@beatprotect.com</a>.
            </p>

            <h2 className="text-xl font-semibold mt-6">8. Updates to Privacy Policy</h2>
            <p className="text-gray-400">
                We may update this Privacy Policy periodically. We will notify users of any significant changes through email or website announcements.
            </p>

            <h2 className="text-xl font-semibold mt-6">9. Contact Us</h2>
            <p className="text-gray-400">
                If you have any questions or concerns regarding our Privacy Policy, please reach out to us at:
            </p>
            <p className="text-gray-400"><strong>Email:</strong> <a href="mailto:support@beatprotect.com" className="text-[#7e3aed]">support@beatprotect.com</a></p>
        </div>
    );
};

export default PrivacyPolicy;
