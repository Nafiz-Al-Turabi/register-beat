import React from 'react';

const TermsOfUse = () => {
    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>

            <p className="text-gray-400 mb-4">
                Welcome to BeatProtect! By accessing and using our platform, you agree to the following terms and conditions. Please read them carefully.
            </p>

            <h2 className="text-xl font-semibold mt-6">1. Acceptance of Terms</h2>
            <p className="text-gray-400">
                By using BeatProtect, you acknowledge that you have read, understood, and agreed to these Terms of Use. If you do not agree, please do not use our services.
            </p>

            <h2 className="text-xl font-semibold mt-6">2. User Responsibilities</h2>
            <ul className="list-disc pl-6 text-gray-400">
                <li>You must be at least 18 years old to use our services.</li>
                <li>You are responsible for maintaining the confidentiality of your account.</li>
                <li>You must not engage in any unlawful activities using BeatProtect.</li>
                <li>All beats you register must be your original work or have the necessary rights for registration.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">3. Copyright & Ownership</h2>
            <p className="text-gray-400">
                BeatProtect does not claim ownership of any beat registered on our platform. However, by submitting content, you grant us a limited license to store and process your beat for verification and protection purposes.
            </p>

            <h2 className="text-xl font-semibold mt-6">4. Prohibited Content</h2>
            <ul className="list-disc pl-6 text-gray-400">
                <li>No copyrighted beats unless you have explicit permission.</li>
                <li>No unauthorized third-party samples.</li>
                <li>No content that promotes illegal activities.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">5. Limitation of Liability</h2>
            <p className="text-gray-400">
                BeatProtect is a platform designed to assist with beat registration and protection. We are not responsible for any disputes, legal claims, or copyright infringements between users.
            </p>

            <h2 className="text-xl font-semibold mt-6">6. Termination of Service</h2>
            <p className="text-gray-400">
                We reserve the right to suspend or terminate your account if you violate these terms or engage in fraudulent activities.
            </p>

            <h2 className="text-xl font-semibold mt-6">7. Changes to Terms</h2>
            <p className="text-gray-400">
                We may update these Terms of Use at any time. Continued use of our platform after changes means you accept the revised terms.
            </p>

            <h2 className="text-xl font-semibold mt-6">8. Contact Information</h2>
            <p className="text-gray-400">
                If you have any questions regarding these terms, please contact us at <a href="mailto:support@beatprotect.com" className="text-[#7e3aed]">support@beatprotect.com</a>.
            </p>
        </div>
    );
};

export default TermsOfUse;
