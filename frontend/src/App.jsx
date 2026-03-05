import React , { useState} from 'react';
import Navbar from './components/Navbar';

function App() {
  const [inputText,setInputText] = useState("");
  const [tone,setTone] = useState("Professional");

  const [correctedText,setCorrectedText] = useState("");
  const [keyChanges,setKeyChanges] = useState([]);

  const [isLoading,setIsLoading] = useState(false);

  const handleCorrectText=async () => {
    if(!inputText.trim()) return;

    setIsLoading(true);
    setCorrectedText("");
    setKeyChanges([]);

    try {
      const response= await fetch("https://ai-autocorrect-tool.onrender.com/correct",{
        method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          text:inputText,
          tone:tone,
        }),
      });

      if(!response.ok){
        throw new Error("Network Response was not ok");
      }

      const data=await response.json();

      setCorrectedText(data.corrected_text);
      setKeyChanges(data.key_changes);
    }
     catch(error){
      console.error("Error correcting text:",error);
      setCorrectedText("An error occurred while connecting to the AI. Is the server running?");
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-[#030712] text-white overflow-hidden">
      {/* Main bg color*/}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/50 to-[#030712]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="p-8 min-h-[80vh] flex items-center px-16">
        {/* Left Side */}
        <div className="max-w-4xl">
        <h1 className="text-white text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
        <div>Write like a pro,</div>
        <div className="text-blue-500">even on your</div>
        <div>first draft.</div>
        </h1>
        <p className="text-gray-400 text-xl leading-relaxed max-w-xl font-medium">
        AI-Driven Autocorrect Tool To Improve Text Accuracy And Fluency , Reducing Errors In Typing And Communication
        </p>
        </div>

        {/*Right Side*/}
        <div className="w-full max-w-2xl flex flex-col gap-y-10 ml-auto mr-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
        <label className="text-blue-400 text-xs font-black uppercase tracking-widest mb-3 block"> Input Text </label>
        <textarea
          className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none mb-3 "
            placeholder="Paste your draft here..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}/>
        <div className="flex items-center justify-between gap-x-4">
        <div className="flex-1">
          <label className="text-blue-400 text-xs font-black uppercase tracking-widest mb-3 block">Select Tone </label>
          <select 
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full appearance-none bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white/80 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer hover:bg-black/60 transition-all">
            <option class="bg-zinc-900 text-white">Casual</option>
            <option class="bg-zinc-900 text-white">Formal</option>
            <option class="bg-zinc-900 text-white">Professional</option>
            <option class="bg-zinc-900 text-white">Creative</option>
          </select>
        </div>
        <button onClick={handleCorrectText} disabled={isLoading} className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs px-8 h-[46px] rounded-lg self-end transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            {isLoading ? "Thinking..." : "Correct Text"}
          </button>
        </div> 
        </div>
        
        <div className="bg-white/5 backdrop:blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
        <label className="text-green-400 text-xs font-black uppercase tracking-widest mb-3 block">AI Result</label>
        <div className="w-full bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 text-grey-200 min-h-[100px] mb-4 italic">{correctedText ? correctedText : "Your corrected text will appear here..."}</div>
          {keyChanges.length > 0 && (
        <div className="border-t border-white/5 pt-4">
        <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 block"> Key Changes </span>
        <div className="flex flex-wrap gap-2">
        {keyChanges.map((change, index) => (
        <div key={index} className="bg-green-500/10 text-green-400 text-[10px] font-bold px-2 py-1 rounded border border-green-500/20 uppercase"> {change} </div>
        ))}
        </div>
        </div>
        )}
        </div>
        </div>
        </main>
        </div>
        </div>
    );
}

export default App;