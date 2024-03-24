import React, { useState, useEffect } from 'react';

const AudioVisualizer = () => {
    const [decibelLevel, setDecibelLevel] = useState(0);
    const [isTooLoud, setIsTooLoud] = useState(false);

    useEffect(() => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                const microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
                analyser.connect(scriptProcessor);
                scriptProcessor.connect(audioContext.destination);

                scriptProcessor.onaudioprocess = () => {
                    const array = new Uint8Array(analyser.fftSize);
                    analyser.getByteTimeDomainData(array);

                    let sumSquares = 0;
                    for (let i = 0; i < array.length; i++) {
                        const normSample = (array[i] / 128) - 1; // Normalize sample to [-1, 1]
                        sumSquares += normSample * normSample;
                    }
                    const rms = Math.sqrt(sumSquares / array.length);
                    const decibels = 20 * Math.log10(rms); // Convert RMS to decibels

                    setDecibelLevel(decibels + 100); // Adjust decibel level based on testing

                    setIsTooLoud(decibels > -20); // Adjust "too loud" threshold here
                };
            })
            .catch((error) => {
                console.error('Error accessing the microphone', error);
            });

        return () => {
            scriptProcessor.disconnect();
            audioContext.close();
        };
    }, []);

    const barWidth = Math.min(100, Math.max(0, decibelLevel + 50)); // Adjusted calculation for visual representation

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="text-center mb-4">
                <h2 className="text-lg font-semibold">Current Decibel Level: {isNaN(decibelLevel) ? 'Loading...' : decibelLevel.toFixed(2)} dB</h2>
                {isTooLoud && <p className="text-red-500 text-xl mt-2">Too Loud!</p>}
            </div>
            <div className="bg-gray-200 h-4 w-full rounded-full overflow-hidden">
                <div
                    style={{ width: `${barWidth}%` }}
                    className={`h-full ${isTooLoud ? 'bg-red-500' : 'bg-green-500'} transition-width duration-500 ease-in-out`}
                ></div>
            </div>
        </div>
    );
};

export default AudioVisualizer;
