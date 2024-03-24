import React, { useEffect, useState, useRef } from 'react';
import * as tmImage from '@teachablemachine/image';

import lockedIcon from '../lock.png'; // Adjust the path as necessary
import unlockedIcon from '../unlock.png'; // Adjust the path as necessary




    //const [text, setText] = useState('');

const TeachableMachineComponent = () => {
    const [lockStatus, setLockStatus] = useState('LOCKED');
    const [recognizedPerson, setRecognizedPerson] = useState('');
    const [lastRecognizedPerson, setLastRecognizedPerson] = useState(''); // Track the last recognized person
    const webcamRef = useRef(null);
    const modelURL = "https://teachablemachine.withgoogle.com/models/pW4jiXCLE/model.json";
    const metadataURL = "https://teachablemachine.withgoogle.com/models/pW4jiXCLE/metadata.json";

    // Function to send text message
    const sendText = (recipient ,person) => {
        // Example fetch logic
        //const recipient = 'your-recipient-number'; // Placeholder
        const textMessage = `Access Granted to ${person}`;

        fetch(`http://127.0.0.1:4000/send-text?recipient=${recipient}&textmessage=${textMessage}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => console.log('Message sent:', data))
            .catch(err => console.error('Fetch error:', err));
    };

    useEffect(() => {
        let webcam;

        const init = async () => {
            const model = await tmImage.load(modelURL, metadataURL);
            webcam = new tmImage.Webcam(600, 400, true);
            await webcam.setup();
            await webcam.play();
            webcamRef.current.innerHTML = '';
            webcamRef.current.appendChild(webcam.canvas);
            webcam.canvas.classList.add('rounded-xl');

            const loop = async () => {
                webcam.update();
                await predict();
                requestAnimationFrame(loop);
            };

            const predict = async () => {
                const prediction = await model.predict(webcam.canvas);
                const highProbPrediction = prediction.find(p => p.probability > 0.9 && (p.className === "Krish" || p.className === "Vraj" || p.className === "Unknown"));

                if (highProbPrediction && recognizedPerson !== highProbPrediction.className && highProbPrediction.className !== "Unknown") {
                    setLockStatus('UNLOCKED');
                    setRecognizedPerson(highProbPrediction.className);
                    // Send text only if the recognized person has changed
                    if (lastRecognizedPerson !== highProbPrediction.className) {
                        
                        setLastRecognizedPerson(highProbPrediction.className); // Update the last recognized person
                    }
                } else if (!highProbPrediction) {
                    setLockStatus('LOCKED');
                    setRecognizedPerson('');
                }
            };

            loop();
        };

        init();

        return () => {
            if (webcam && webcam.getTracks) {
                webcam.getTracks().forEach(track => track.stop());
            }
        };
    }, [recognizedPerson, lastRecognizedPerson]); // Depend on recognizedPerson and lastRecognizedPerson to control effect

    return (
        
        <div className="flex items-center justify-center">
  <div ref={webcamRef} id="webcam-container" className="mr-4"></div>

  <div id="label-container" className="flex flex-col items-center space-y-2">
    {lockStatus === 'UNLOCKED' && recognizedPerson ? (
      <>
        <img src={unlockedIcon} alt="Unlocked" className="w-8 h-8 text-green-500" />
        <div className="text-lg font-medium">{`Welcome, ${recognizedPerson}!`}</div>
        <button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={sendText}>
            Notify Homeowner
        </button>

      </>
    ) : (
      <>
        <img src={lockedIcon} alt="Locked" className="w-8 h-8 text-red-500" />
        <div className="text-lg">Face Not Recognized</div>
      </>
    )}
  </div>
</div>

      
    
    );
};

export default TeachableMachineComponent;

//onClick={sendText(recognizedPerson)}