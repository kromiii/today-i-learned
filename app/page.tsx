import Image from "next/image";

import { ReactNode } from "react";
import SignInButton from "@/components/header/SignInButton";
import NewsSection from '@/components/NewsSection';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-600">Today</span>{" "}
            <span className="relative">
              I{" "}
              <span className="relative z-10">
                Learned
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300 -z-10 transform -skew-x-3"></span>
              </span>
            </span>
          </h1>
          <p className="text-xl mb-6">
            AI-powered learning support. Record your daily discoveries and
            experience your growth.
          </p>
          <SignInButton />
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/screenshot.png"
            alt="Today I Learned Dashboard"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

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

      <div className="mb-16"></div>

      {/* YouTube動画の埋め込み */}
      <div className="mt-32 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">
          See it in Action
        </h2>
        <div className="max-w-[560px] mx-auto w-full">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/MO2Tzeaca80?si=i93ecsNAO1l5Q3l_"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>

      <NewsSection />
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
