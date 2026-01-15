export default function WhatIBuild() {
  return (
    <section className="min-h-screen flex items-center px-6 md:px-16 border-b">
      <div className="max-w-4xl">

        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          What I Build
        </h2>

        {/* Intro paragraph */}
        <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
          I enjoy building AI systems that solve real problems — especially when the
          problem is unclear, the data is imperfect, or the solution requires careful
          thinking rather than brute force.
        </p>

        {/* Focus areas */}
        <div className="space-y-6">

          <div>
            <h3 className="text-xl font-medium mb-2">
              Recommender & Decision Systems
            </h3>
            <p className="text-gray-700 leading-relaxed">
              From mitigating cold-start problems to exploring similarity-based models,
              I like working on systems that help people discover what matters to them.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">
              Computer Vision & Perception
            </h3>
            <p className="text-gray-700 leading-relaxed">
              I’ve worked with vision systems that interpret the real world — from
              surveillance analytics to sign language recognition — where accuracy,
              ethics, and reliability truly matter.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">
              Language & Human-Centered AI
            </h3>
            <p className="text-gray-700 leading-relaxed">
              I’m deeply interested in how humans interact with AI, especially through
              language, interfaces, and assistive technologies that make systems more
              accessible.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
