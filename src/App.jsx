import { useCalculator } from './hooks/useCalculator';
import { useKeyboard } from './hooks/useKeyboard';
import { useVoiceAssistant } from './hooks/useVoiceAssistant';
import { VoiceAssistant } from './components/VoiceAssistant';
import { Keypad } from './components/Keypad';
import './index.css';

function App() {
  const calcHandlers = useCalculator();
  const { isListening, interimTranscript, toggleListening } = useVoiceAssistant();

  useKeyboard(calcHandlers);

  return (
    <>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="calculator">
        <VoiceAssistant
          isListening={isListening}
          toggleListening={toggleListening}
          interimTranscript={interimTranscript}
        />

        <div className="display-container">
          <div className="equation">{calcHandlers.equation}</div>
          <div className="current-value">{calcHandlers.display}</div>
        </div>

        <Keypad handlers={calcHandlers} />
      </div>
    </>
  );
}

export default App;
