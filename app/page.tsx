import Link from "next/link";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-8 uppercase tracking-wide shadow-lg p-4 bg-gray-100 rounded-lg">
        Today I Learned
      </h1>

      <p className="text-xl text-center mb-12">
        AI-powered learning support. Record your daily discoveries and
        experience your growth.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          title="Ask AI"
          description="Ask AI about anything you're curious about. Get answers powered by a vast knowledge base."
          icon="🤖"
        />
        <FeatureCard
          title="Automatic Learning Summary"
          description="Automatically summarize and organize what you've learned from your interactions with AI."
          icon="✍️"
        />
        <FeatureCard
          title="Reflect on Your Learning"
          description="Visualize your daily learning on the dashboard. See your growth journey unfold."
          icon="📊"
        />
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/dashboard"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
