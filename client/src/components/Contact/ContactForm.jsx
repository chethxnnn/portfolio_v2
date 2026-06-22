import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';

const generateMathProblem = () => {
  const ops = ['+', '-', '*'];
  const op1 = ops[Math.floor(Math.random() * ops.length)];
  const op2 = ops[Math.floor(Math.random() * ops.length)];
  
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const c = Math.floor(Math.random() * 10) + 1;

  const question = `${a} ${op1} ${b} ${op2} ${c}`;
  // Safe eval since we tightly control the string contents
  const answer = eval(question); 
  
  return { question, answer };
};

const ContactForm = () => {
  const [expandedStep, setExpandedStep] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [problem, setProblem] = useState(null);
  const [answerInput, setAnswerInput] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setProblem(generateMathProblem());
  }, []);

  const printConsoleEasterEgg = () => {
    console.log(
      "%c🕵️‍♂️ Hey there, Inspector!", 
      "color: #ffffff; font-size: 22px; font-weight: bold; background: #111; padding: 12px; border-radius: 8px; border: 1px solid #333;"
    );
    console.log("%cHere are my contact details:", "color: #888; font-size: 14px; margin-top: 8px;");
    
    const contactInfo = {
      name: "chethan p",
      email: "chethanseervi2004@gmail.com",
      mobile_no: "8722573214",
      message: "have a nice day"
    };
    
    console.log(JSON.stringify(contactInfo, null, 2));
  };

  const handleOpenModal = () => {
    setProblem(generateMathProblem());
    setAnswerInput('');
    setError(false);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(answerInput, 10) === problem.answer) {
      setIsUnlocked(true);
      setShowModal(false);
      printConsoleEasterEgg();
      // Ensure we stay focused on this section after the UI height changes
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    } else {
      setError(true);
      setAnswerInput('');
    }
  };

  const toggleStep = (step) => {
    setExpandedStep(prev => prev === step ? null : step);
  };

  return (
    <section className="py-12 md:py-24 px-6 relative z-10 min-h-[80vh] flex flex-col justify-center" id="contact">
      <div className="max-w-4xl mx-auto w-full">
        <SectionHeader id="contact" label="Contact" title="Wanna connect with me?" index="06" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-8 flex flex-col items-center text-center"
        >
          
          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              <motion.div
                key="locked"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <button 
                  onClick={handleOpenModal}
                  className="px-8 py-4 bg-white text-black font-black text-xl md:text-2xl tracking-widest uppercase hover:bg-gray-200 hover:scale-105 transition-all duration-300 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  CONNECT NOW!
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full mt-10 flex flex-col items-center"
              >
                <p className="text-[#888888] font-mono text-sm tracking-widest uppercase mb-10">
                  Follow these steps
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 w-full">
                  {/* Step 1 */}
                  <div className="w-full select-none text-left">
                    <h4 className="text-white font-bold text-2xl md:text-3xl mb-4 leading-tight">
                      Step: 1
                    </h4>
                    <div className="pt-2 flex flex-col items-start h-full">
                      <h5 className="text-white font-mono text-lg mb-6 tracking-widest uppercase">Inspect</h5>
                      <div className="flex flex-col items-start gap-6 w-full">
                        <p className="text-[#888888] font-mono text-sm leading-relaxed text-left">
                          <strong className="text-white block mb-2">Windows / Linux</strong>
                          Press <code className="bg-[#1a1a1a] px-3 py-1 rounded-md text-white border border-[#333]">Ctrl + Shift + I</code> or <code className="bg-[#1a1a1a] px-3 py-1 rounded-md text-white border border-[#333]">F12</code>
                        </p>
                        <p className="text-[#888888] font-mono text-sm leading-relaxed text-left">
                          <strong className="text-white block mb-2">Mac</strong>
                          Press <code className="bg-[#1a1a1a] px-3 py-1 rounded-md text-white border border-[#333]">Cmd + Option + I</code>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="w-full select-none text-left">
                    <h4 className="text-white font-bold text-2xl md:text-3xl mb-4 leading-tight">
                      Step: 2
                    </h4>
                    <div className="pt-2 flex flex-col items-start space-y-5 text-left h-full">
                      <h5 className="text-white font-mono text-lg mb-6 tracking-widest uppercase">Console</h5>
                      <p className="text-[#888888] font-mono text-sm leading-relaxed">
                        Navigate to the <strong className="text-white">Console</strong> tab at the top of the DevTools window.
                      </p>
                      <p className="text-[#888888] font-mono text-sm leading-relaxed">
                        Also, select the <strong className="text-white">Messages</strong> tab on the left sidebar in the console.
                      </p>
                      <p className="text-[#888888] font-mono text-sm leading-relaxed">
                        You will find my details waiting for you there in raw JSON format.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Math Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0a0a0a] border border-[#333] rounded-xl p-8 max-w-sm w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-[#666] hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
              
              <div className="text-center">
                <h4 className="text-white font-bold text-xl uppercase tracking-wider mb-2">Prove you're human</h4>
                <p className="text-[#888] font-mono text-xs uppercase tracking-widest mb-8">Apply BODMAS rule</p>
                
                <div className="text-4xl md:text-5xl font-black text-white mb-8 tracking-wider font-mono">
                  {problem?.question}
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                  <input
                    type="number"
                    autoFocus
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    placeholder="="
                    className={`w-32 bg-transparent border-b-2 ${error ? 'border-red-500 text-red-500' : 'border-white text-white'} text-3xl font-mono text-center pb-2 focus:outline-none mb-6`}
                  />
                  {error && <p className="text-red-500 font-mono text-xs mb-4">Incorrect. Try again.</p>}
                  <button 
                    type="submit"
                    className="w-full bg-white text-black font-bold uppercase tracking-widest py-3 rounded hover:bg-gray-200 transition-colors"
                  >
                    Verify
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactForm;
