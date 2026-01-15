export default function Letter() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-16 border-b">
      <div className="max-w-3xl">

        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
          If You're Reading This
        </h2>

        {/* Letter content */}
        <div className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-6">
          
          <p>
            You're probably here because you're trying to understand who I am beyond
            bullet points and project descriptions.
          </p>

          <p>
            I value clarity, honesty, and doing work that actually matters to people.
            I'm not interested in building things just because they're technically
            impressive — I care about impact, thoughtfulness, and responsibility.
          </p>

          <p>
            I'm still learning, still growing, and still figuring out what kind of
            engineer and researcher I want to become. But I know I want to work on
            problems that require both technical depth and human understanding.
          </p>

          <p>
            If that resonates with you, I'd love to talk.
          </p>

        </div>
      </div>
    </section>
  );
}