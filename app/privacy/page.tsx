import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Purpose of Using Customer Information</h2>
      <p>The operator uses the information obtained from customers for the following purposes:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>To accept registration for this service, verify customer identity, and authenticate</li>
        <li>To analyze customer behavior history in this service and use it to maintain and improve this service</li>
        <li>To respond to actions that violate the operator&apos;s terms or laws</li>
        <li>In addition to the above, to provide, maintain, protect, and improve this service</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Access Analysis Tool</h2>
      <p>The operator uses &quot;Google Analytics&quot; for customer access analysis. Google Analytics uses cookies to collect traffic data. Traffic data is collected anonymously and does not identify individuals. You can refuse the collection of this information by disabling cookies. Please check your browser settings for details. For more information about Google Analytics, please check the following:</p>
      <ul className="list-disc pl-6 mb-4">
        <li><a href="https://marketingplatform.google.com/about/analytics/terms/us/" className="text-blue-600 hover:underline">Terms of Service | Google Analytics – Google</a></li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to the Privacy Policy</h2>
      <p>The operator will change the contents of this privacy policy as necessary. In this case, we will appropriately announce or notify the implementation date and content of the revised privacy policy.</p>
    </div>
  );
}
