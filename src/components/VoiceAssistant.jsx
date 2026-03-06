export const VoiceAssistant = ({ isListening, toggleListening, interimTranscript }) => {
    return (
        <div className="voice-assistant-bar">
            <button
                className={`mic-button ${isListening ? 'listening' : ''}`}
                onClick={toggleListening}
                title={isListening ? "Stop Listening" : "Start Listening"}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="22"></line>
                    <line x1="8" y1="22" x2="16" y2="22"></line>
                </svg>
            </button>

            <div className="transcript">
                {interimTranscript || (isListening ? 'Listening...' : '')}
            </div>
        </div>
    );
};
