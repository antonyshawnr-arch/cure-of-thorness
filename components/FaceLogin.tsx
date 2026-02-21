'use client';
import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export default function FaceLogin({ onSuccess }: { onSuccess: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  const startDetection = async () => {
    // Access camera, detect face (simplified for demo)
    if (videoRef.current && modelsLoaded) {
      const detection = await faceapi.detectSingleFace(videoRef.current);
      if (detection) onSuccess(); // Match stored face embedding in prod
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted />
      <button onClick={startDetection}>Scan Face</button>
    </div>
  );
}
