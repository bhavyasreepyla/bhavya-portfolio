export default function HowIWork() {
  return (
    <section className="min-h-screen flex items-center px-6 md:px-16 border-b">
      <div className="max-w-4xl">

        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          How I Work
        </h2>

        {/* Intro */}
        <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
          I value clarity, consistency, and thoughtful problem-solving. My approach to
          work is shaped by both engineering discipline and creative exploration.
        </p>

        {/* Working principles */}
        <div className="space-y-8">

          <div>
            <h3 className="text-xl font-medium mb-2">
              I start by understanding the problem deeply
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Before thinking about models or metrics, I spend time understanding the
              problem space — asking why the problem exists, who it affects, and what a
              meaningful solution should look like.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">
              I experiment, reflect, and iterate
            </h3>
            <p className="text-gray-700 leading-relaxed">
              I believe progress comes from trying, failing, and refining. I treat
              experiments as learning tools, not just steps toward an output.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">
              I care about reliability and responsibility
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Whether working with data, models, or users, I prioritize robustness,
              transparency, and ethical awareness — especially in systems that interact
              with real people.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">
              I learn continuously and independently
            </h3>
            <p className="text-gray-700 leading-relaxed">
              I actively seek out new ideas through courses, papers, and hands-on
              exploration, and I enjoy teaching myself concepts beyond formal
              requirements.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
