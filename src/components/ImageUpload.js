import React, { useState, useEffect } from 'react';
import "./Style.css"
import { Canvas } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

const GLBPreview = ({ glbUrl, modelColor, lightIntensity }) => {
  const [model, setModel] = useState(null);
  const [ambientLight, setAmbientLight] = useState(0.5);
  const [pointLight, setPointLight] = useState(1);
  const [directionalLight, setDirectionalLight] = useState(1);

  // Load GLB model
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(glbUrl, (gltf) => {
      gltf.scene.traverse(child => {
        if (child.isMesh) {
          child.material.color.set(modelColor);
          
        }
      });
      setModel(gltf.scene);
    });
  }, [glbUrl, modelColor]);

  // Update light intensities live
  useEffect(() => {
    setAmbientLight(lightIntensity * 0.5); // Adjust ambient light intensity
    setPointLight(lightIntensity); // Adjust point light intensity
    setDirectionalLight(lightIntensity); // Adjust directional light intensity
  }, [lightIntensity]);
console.log("sdsds--", ambientLight);
  return (
    <div className="card-container">
     <Canvas style={{ height: '500px', width: '800px' }} camera={{ position: [0, 0, 10],zoom:1 }}>
        <ambientLight intensity={ambientLight} />
        <pointLight position={[10, 10, 10]} intensity={pointLight} />
        <directionalLight position={[0, 10, 0]} intensity={directionalLight} />
        <OrbitControls />
        {model && <primitive object={model} />}
      </Canvas>
    </div>

/* <div className="card-container">
      <Canvas style={{ height: '500px', width: '800px' }} camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={ambientLight} />
        <pointLight position={[10, 10, 10]} intensity={pointLight} />
        <OrbitControls />
        {model && <primitive object={model} />}
      </Canvas>
    </div> */

    // <Canvas style={{ height: '500px', width: '800px' }} camera={{ position: [0, 0, 5] }}>
    //   <ambientLight intensity={ambientLight} />
    //   <pointLight position={[10, 10, 10]} intensity={pointLight} />
    //   <directionalLight position={[0, 10, 0]} intensity={directionalLight} />
    //   <OrbitControls />
    //   {model && <primitive object={model} />}
    // </Canvas>

  );
};

const GLBFileUpload = () => {
  const [glbUrl, setGLBUrl] = useState('');
  const [modelColor, setModelColor] = useState('#ffe100');
  const [lightIntensity, setLightIntensity] = useState(0.25);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setGLBUrl(url);
      setError(null);
    }
  };

  const handleColorChange = (e) => {
    setModelColor(e.target.value);
  };

  const handleIntensityChange = (e) => {
    setLightIntensity(parseFloat(e.target.value));
  };

  return (
    <div>
      <input type="file" accept=".glb" onChange={handleFileChange} />
      <input type="color" value={modelColor} onChange={handleColorChange} />
      <input type="range" min="0.5" max="100" step="0.5" value={lightIntensity} onChange={handleIntensityChange} />
      {error && <p>{error}</p>}
      {glbUrl && <GLBPreview glbUrl={glbUrl} modelColor={modelColor} lightIntensity={lightIntensity} />}
    </div>
  );
};

export default GLBFileUpload;
