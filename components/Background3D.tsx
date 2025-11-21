import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Background3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    // Fog for depth - matches light warm bg color (Amber 50/Stone 100 mix)
    scene.fog = new THREE.FogExp2(0xfffbeb, 0.05);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Geometry: Abstract Pyramids (Tetrahedrons)
    const geometry = new THREE.TetrahedronGeometry(1, 0);
    
    // Material: Gold/Ochre wireframe
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xd97706, // Amber 600
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });

    // Material: Sand solid
    const solidMaterial = new THREE.MeshBasicMaterial({
      color: 0xfef3c7, // Amber 100
      transparent: true,
      opacity: 0.4
    });

    const particles: THREE.Group = new THREE.Group();
    
    // Create multiple floating pyramids
    for (let i = 0; i < 25; i++) {
      const mesh = new THREE.Mesh(geometry, Math.random() > 0.6 ? material : solidMaterial);
      
      mesh.position.x = (Math.random() - 0.5) * 16;
      mesh.position.y = (Math.random() - 0.5) * 16;
      mesh.position.z = (Math.random() - 0.5) * 12;
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      const scale = Math.random() * 0.6 + 0.2;
      mesh.scale.set(scale, scale, scale);

      particles.add(mesh);
    }

    scene.add(particles);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      particles.rotation.y += 0.0015;
      particles.rotation.x += 0.0008;

      // Gentle floating movement for individual particles
      particles.children.forEach((child, i) => {
        child.rotation.x += 0.005;
        child.rotation.y += 0.005;
        child.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Cleanup resources
      geometry.dispose();
      material.dispose();
      solidMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'radial-gradient(circle at 50% 50%, #fffbeb 0%, #e7e5e4 100%)' }} 
    />
  );
};