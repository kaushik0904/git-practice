import { useState, useEffect, useRef } from 'react';
import { parseSpeechToCommands } from '../utils/speechParser';

export const useVoiceAssistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [interimTranscript, setInterimTranscript] = useState('');
    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Speech Recognition API not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };

        recognition.onresult = async (event) => {
            let finalTranscript = '';
            let currentInterim = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    currentInterim += event.results[i][0].transcript;
                }
            }

            setInterimTranscript(currentInterim);

            if (finalTranscript) {
                const commands = parseSpeechToCommands(finalTranscript);
                for (const key of commands) {
                    window.dispatchEvent(new KeyboardEvent('keydown', { key }));
                    await new Promise(resolve => setTimeout(resolve, 300));
                }
            }
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.stop();
        };
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current) return alert("Speech Recognition API not supported in this browser.");

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setInterimTranscript('');
            recognitionRef.current.start();
        }
    };

    return { isListening, interimTranscript, toggleListening };
};
