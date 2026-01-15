export default function Contact() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-16">
      <div className="max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Let's Talk
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
          I'm always open to conversations about AI, research, interesting problems, or potential collaborations.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg">
          <a href="mailto:pylabhavyasree1@gmail.com" className="text-blue-600 font-medium hover:underline">
            Email me
          </a>
          <span className="hidden md:inline text-gray-400">·</span>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">
            LinkedIn
          </a>
          <span className="hidden md:inline text-gray-400">·</span>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">
            GitHub
          </a>
        </div>
        <div className="mt-10">
          <a href="/resume.pdf" className="inline-block px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}