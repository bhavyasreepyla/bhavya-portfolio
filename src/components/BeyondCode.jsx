export default function BeyondCode() {
  return (
    <section className="min-h-screen flex items-center px-6 md:px-16 border-b">
      <div className="max-w-4xl">

        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Beyond Code
        </h2>

        {/* Intro */}
        <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
          Engineering is only part of who I am. My perspective is shaped by art,
          culture, and a life lived across different worlds.
        </p>

        {/* Personal elements */}
        <div className="space-y-8">

          <div>
            <h3 className="text-xl font-medium mb-2">
              Bharatanatyam & Discipline
            </h3>
            <p className="text-gray-700 leading-relaxed">
              I trained in Bharatanatyam, a classical Indian dance form that taught me
              patience, precision, and the value of iteration — qualities that carry
              directly into how I approach engineering and research.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">
              Growing Up in Tanzania
            </h3>
            <p className="text-gray-700 leading-relaxed">
              I spent my formative years in Tanzania, which gave me a global perspective,
              adaptability, and a deep appreciation for diverse ways of thinking and
              problem-solving.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">
              Teaching & Mentorship
            </h3>
            <p className="text-gray-700 leading-relaxed">
              I've enjoyed mentoring junior engineers and interns, helping them navigate
              technical challenges and grow in their confidence. I believe the best way
              to solidify understanding is to teach it to someone else.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">
              Curiosity Beyond AI
            </h3>
            <p className="text-gray-700 leading-relaxed">
              I'm interested in philosophy, human behavior, design, and the intersection
              of technology with society. I believe understanding humans is just as
              important as understanding algorithms.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}