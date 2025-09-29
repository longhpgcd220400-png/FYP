import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center space-y-6 transition-colors duration-300 min-h-screen">
      {/* Title */}
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#30cfd0] to-[#330867]  bg-clip-text text-transparent">
        Welcome to Daily HearWrite
      </h1>

      {/* Intro */}
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Improve your English listening and dictation skills with daily practice. <br />
        Dictation is a method to learn languages by listening and writing down what you hear. <br />
        It is a highly effective method! <br />
        This website contains thousands of audio recordings & videos to help English learners practice easily and improve quickly.
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <Link
          href="/lessons"
          className="px-6 py-3 rounded-2xl 
                    bg-gradient-to-r from-[#30cfd0] to-[#330867] 
                    text-white font-semibold 
                    shadow-md 
                    hover:opacity-90 
                    transition-all duration-300"
        >
          Start Lessons
        </Link>

        
      </div>

      {/* Section */}
      <section className="py-16 mt-12 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#30cfd0] to-[#330867]  bg-clip-text text-transparent">
            How practicing dictation will improve your English skills?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            When practicing exercises at Daily HearWrite, you will go through 4 main steps, <br />
            all of them are equally important!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto text-center">
          {/* Step 1 */}
          <div>
            <img
              src="/Listen.png"
              alt="Listen"
              className="mx-auto mb-4 w-60 h-60 rounded-2xl object-cover shadow-md"
            />
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#30cfd0] to-[#330867]  bg-clip-text text-transparent">
              1. Listen to the audio
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Through the exercises, you will have to listen a lot; that&apos;s the key
              to improving your listening skills in any learning method.
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <img
              src="/type.png"
              alt="Type"
              className="mx-auto mb-4 w-60 h-60 rounded-2xl object-cover shadow-md"
            />
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#30cfd0] to-[#330867]  bg-clip-text text-transparent">
              2. Type what you hear
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Typing what you hear forces you to focus on every detail which helps you
              become better at pronunciation, spelling and writing.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <img
              src="/icon.png"
              alt="Check"
              className="mx-auto mb-4 w-60 h-60 rounded-2xl object-cover shadow-md"
            />
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#30cfd0] to-[#330867]  bg-clip-text text-transparent">
              3. Check &amp; correct
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Error correction is important for your listening accuracy and reading
              comprehension, it&apos;s best to learn from mistakes.
            </p>
          </div>

          {/* Step 4 */}
          <div>
            <img
              src="/speak.png"
              alt="Read"
              className="mx-auto mb-4 w-60 h-60 rounded-2xl object-cover shadow-md"
            />
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#30cfd0] to-[#330867]  bg-clip-text text-transparent">
              4. Read it out loud
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              After completing a sentence, try to read it out loud, it will greatly
              improve your pronunciation &amp; speaking skills!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
