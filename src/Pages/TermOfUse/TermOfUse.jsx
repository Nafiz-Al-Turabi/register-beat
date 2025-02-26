import React, { useEffect } from 'react';

const TermsOfUse = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Terms of Use for BeatProtect.io</h1>
            <p className="text-gray-400 mb-4">Effective Date: [Insert Date]</p>
            <p className="text-gray-400 mb-4">Last Updated: [Insert Date]</p>
            <p className="text-gray-400 mb-4">
                Welcome to BeatProtect.io (“Company”, “we”, “us”, or “our”). By accessing or using our platform, you (“User”, “Producer”, “you”) agree to comply with and be bound by these Terms of Use (“Terms”). If you do not agree with these Terms, do not use our platform.
            </p>

            <h2 className="text-xl font-semibold mt-6">1. Introduction</h2>
            <p className="text-gray-400">
                BeatProtect.io is a platform that allows music producers to register and protect their beats by generating legal proof of ownership. The platform provides services such as beat registration, copyright protection, subscription plans, and legal documentation for beat ownership.
            </p>

            <h2 className="text-xl font-semibold mt-6">2. User Accounts & Registration</h2>
            <h3 className="text-lg font-semibold mt-4">2.1. Eligibility</h3>
            <ul className="list-disc pl-6 text-gray-400">
                <li>You are at least 18 years old or have legal parental/guardian consent.</li>
                <li>You have the legal right to register the beats you upload.</li>
                <li>You are not prohibited from using our services under applicable laws.</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4">2.2. Account Creation & Security</h3>
            <ul className="list-disc pl-6 text-gray-400">
                <li>You must provide accurate and complete information during registration.</li>
                <li>You are responsible for maintaining the security of your account.</li>
                <li>Any activity conducted through your account is your responsibility.</li>
                <li>If you believe your account has been compromised, notify us immediately.</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4">2.3. Account Suspension & Termination</h3>
            <ul className="list-disc pl-6 text-gray-400">
                <li>We reserve the right to suspend or terminate accounts if you violate these Terms.</li>
                <li>We detect fraudulent activity.</li>
                <li>You engage in unauthorized use of the platform.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">3. Beat Registration & Copyright Protection</h2>
            <p className="text-gray-400">
                Producers can register beats using our system. Upon registration, a unique digital certificate with a timestamp and fingerprint is generated as proof of ownership. BeatProtect.io does not guarantee absolute copyright protection but provides digital evidence in case of disputes.
            </p>
            
            <h3 className="text-lg font-semibold mt-4">3.2. Responsibility for Beat Ownership</h3>
            <ul className="list-disc pl-6 text-gray-400">
                <li>Users must ensure they have full rights to register beats.</li>
                <li>BeatProtect.io is not responsible for false or fraudulent beat registrations.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">4. Subscription Plans & Payments</h2>
            <ul className="list-disc pl-6 text-gray-400">
                <li>Free Plan: Limited access to the platform.</li>
                <li>Pro Plan: $9.99/month – allows up to 20 beat registrations per month.</li>
                <li>Additional credits: $5 for 10 extra beat registrations.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">5. User Conduct & Prohibited Activities</h2>
            <ul className="list-disc pl-6 text-gray-400">
                <li>Users agree NOT to upload beats they do not own.</li>
                <li>Attempt to hack, modify, or disrupt the platform.</li>
                <li>Engage in fraudulent or illegal activities.</li>
                <li>Violate third-party intellectual property rights.</li>
            </ul>
            <p className="text-gray-400">Violation of these rules may result in account suspension or legal action.</p>

            <h2 className="text-xl font-semibold mt-6">6. Intellectual Property Rights</h2>
            <p className="text-gray-400">
                BeatProtect.io retains all intellectual property rights over its software, website, and branding. Users retain ownership of the beats they register. By using BeatProtect.io, you grant us a non-exclusive license to store, process, and display your beats for registration purposes.
            </p>

            <h2 className="text-xl font-semibold mt-6">7. Limitation of Liability</h2>
            <p className="text-gray-400">
                BeatProtect.io is a registration service, not a legal authority. We are not liable for financial losses, copyright disputes, or legal issues arising from the use of the platform. We do not guarantee that beats registered on our platform will be legally enforceable in all jurisdictions.
            </p>

            <h2 className="text-xl font-semibold mt-6">8. Privacy & Data Protection</h2>
            <p className="text-gray-400">
                We collect and store user data securely in compliance with international privacy regulations. Personal information is not shared with third parties unless required by law. For more details, refer to our Privacy Policy.
            </p>

            <h2 className="text-xl font-semibold mt-6">9. Modifications to the Terms</h2>
            <p className="text-gray-400">
                We may update these Terms from time to time. Users will be notified of significant changes via email or a notice on our website. Continued use of the platform after changes means acceptance of the new Terms.
            </p>

            <h2 className="text-xl font-semibold mt-6">10. Governing Law & Dispute Resolution</h2>
            <p className="text-gray-400">
                These Terms are governed by the laws of [Insert Country]. Any disputes arising from the use of the platform will be resolved through arbitration or legal proceedings in [Insert Jurisdiction].
            </p>

            <h2 className="text-xl font-semibold mt-6">11. Contact Information</h2>
            <p className="text-gray-400">
                For any questions regarding these Terms, you can contact us at: <a href="mailto:support@beatprotect.io" className="text-[#7e3aed]">support@beatprotect.io</a>.
            </p>
        </div>
    );
};

export default TermsOfUse;