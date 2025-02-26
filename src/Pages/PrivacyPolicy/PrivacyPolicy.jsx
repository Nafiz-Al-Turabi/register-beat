import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy for BeatProtect.io</h1>
            <p className="text-gray-400"><strong>Effective Date:</strong> [Insert Date]</p>
            <p className="text-gray-400 mb-4"><strong>Last Updated:</strong> [Insert Date]</p>
            <p className="text-gray-400 mb-4">
                This Privacy Policy describes how <a href="https://beatprotect.io" className="text-[#7e3aed]">BeatProtect.io</a> (the “Site”, “we”, “us”, or “our”) collects, uses, and discloses your Personal Information when you visit or use our services.
            </p>
            
            <h2 className="text-xl font-semibold mt-6">1. Collecting Personal Information</h2>
            <p className="text-gray-400">When you visit our Site, we collect certain information about your device, interactions with the Site, and data necessary to provide our services.</p>
            
            <h3 className="text-lg font-semibold mt-4">1.1 Device Information</h3>
            <ul className="list-disc pl-6 text-gray-400">
                <li>Web browser version</li>
                <li>IP address</li>
                <li>Time zone</li>
                <li>Cookie information</li>
                <li>Pages visited and interactions with the Site</li>
            </ul>
            
            <h3 className="text-lg font-semibold mt-4">1.2 User & Subscription Information</h3>
            <ul className="list-disc pl-6 text-gray-400">
                <li>Name</li>
                <li>Email address</li>
                <li>Payment details (including credit card numbers, PayPal)</li>
                <li>Subscription status</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">2. Minors</h2>
            <p className="text-gray-400">The Site is not intended for individuals under the age of 12. If you believe a minor has provided us with Personal Information, please contact us at <a href="mailto:support@beatprotect.io" className="text-[#7e3aed]">support@beatprotect.io</a>.</p>
            
            <h2 className="text-xl font-semibold mt-6">3. Sharing Personal Information</h2>
            <p className="text-gray-400">We share your Personal Information with third-party service providers, including:</p>
            <ul className="list-disc pl-6 text-gray-400">
                <li>Payment Processors: Stripe, PayPal</li>
                <li>Analytics Services: Google Analytics</li>
                <li>Legal Compliance: As required by law</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">4. Behavioural Advertising</h2>
            <p className="text-gray-400">We use your Personal Information for targeted advertisements. To opt-out:</p>
            <ul className="list-disc pl-6 text-gray-400">
                <li><a href="https://www.facebook.com/adpreferences" className="text-[#7e3aed]">Facebook Ad Preferences</a></li>
                <li><a href="https://adssettings.google.com" className="text-[#7e3aed]">Google Ad Settings</a></li>
                <li><a href="https://www.youradchoices.com" className="text-[#7e3aed]">DAA Opt-Out</a></li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">5. Your Rights</h2>
            <p className="text-gray-400">For EEA residents, you have the right to:</p>
            <ul className="list-disc pl-6 text-gray-400">
                <li>Access your Personal Information</li>
                <li>Request correction, updates, or deletion</li>
                <li>Transfer your data to another service</li>
            </ul>
            <p className="text-gray-400">California residents have additional rights under the CCPA.</p>
            
            <h2 className="text-xl font-semibold mt-6">6. Contact Information</h2>
            <p className="text-gray-400">If you have questions about this Privacy Policy, contact us at:</p>
            <p className="text-gray-400"><strong>Email:</strong> <a href="mailto:support@beatprotect.io" className="text-[#7e3aed]">support@beatprotect.io</a></p>
        </div>
    );
};

export default PrivacyPolicy;
