"Client"

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
  return (
    <div className="cosmic-bg min-h-screen py-20">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 purple-gradient-text">
            Join the Reflect Community
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join our community to enhance your note-taking and thinking process. 
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center purple-gradient-text">
            What to expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="feature-card">
              <h3 className="text-xl font-bold mb-2">Community Discussions</h3>
              <p className="text-gray-400">
                Engage with other Reflect users, share tips, and discuss best
                practices.
              </p>
            </div>

            <div className="feature-card">
              <h3 className="text-xl font-bold mb-2">Feedback & Suggestions</h3>
              <p className="text-gray-400">
                Share your thoughts and help shape the future of Reflect.
              </p>
            </div>
            
            
            <div className="feature-card">
              <h3 className="text-xl font-bold mb-2">Exclusive Content</h3>
              <p className="text-gray-400">
                Access exclusive articles and resources to enhance your Reflect
                experience.
              </p>
            </div>

            <div className="feature-card">
              <h3 className="text-xl font-bold mb-2">Events & Webinars</h3>
              <p className="text-gray-400">
                Participate in community events and webinars to learn more about
                Reflect and its features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
