import React, { useRef, useEffect } from "react";
import { Renderer, Camera, Transform, Mesh, Program, Geometry } from "ogl";

// Vertex and fragment shaders for iridescence
const vertex = `
attribute vec3 position;
attribute vec3 normal;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  vNormal = normal;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragment = `
precision highp float;
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uTime;
uniform float uAmplitude;
uniform float uSpeed;
uniform vec3 uColor;

// Simple iridescence effect
vec3 iridescence(vec3 normal, float time) {
  float angle = dot(normal, vec3(0.0, 0.0, 1.0));
  float shift = sin(time * uSpeed + angle * 6.0) * uAmplitude;
  vec3 base = vec3(0.8, 0.8, 0.8) + shift * vec3(0.2, 0.4, 0.8);
  return mix(base, uColor, 0.5 + 0.5 * angle);
}

void main() {
  vec3 color = iridescence(normalize(vNormal), uTime);
  gl_FragColor = vec4(color, 1.0);
}`;

const defaultColor = [1, 1, 1];

export default function Iridescence({ color = defaultColor, amplitude = 0.1, speed = 1.0, mouseReact = false, ring = false, size = 400 }) {
  const ref = useRef(null);
  const animationRef = useRef(0);

  useEffect(() => {
    let renderer;
    let gl;
    let camera;
    let scene;
    let geometry;
    let program;
    let mesh;
    let canvas;
    let disposed = false;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let onCtxLost;

    function safeRemoveCanvas() {
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }

    const el = ref.current;
    if (!el || el.querySelector("canvas")) {
      return undefined;
    }

    try {
      const dpr = typeof window !== "undefined" ? Math.min(2, window.devicePixelRatio || 1) : 1;
      renderer = new Renderer({ dpr, alpha: true });
      gl = renderer.gl;
      if (!gl) {
        return undefined;
      }

      gl.clearColor(0, 0, 0, 0);
      renderer.setSize(size, size);
      canvas = gl.canvas;
      el.appendChild(canvas);

      onCtxLost = (e) => {
        e.preventDefault();
        disposed = true;
      };
      canvas.addEventListener("webglcontextlost", onCtxLost);

      camera = new Camera(size / 2);
      camera.position.z = 3;
      scene = new Transform();

      if (ring) {
        const segments = 128;
        const tube = 0.25;
        const radius = 0.8;
        const positions = [];
        const normals = [];
        for (let i = 0; i < segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          for (let j = 0; j < segments; j++) {
            const phi = (j / segments) * Math.PI * 2;
            const x = (radius + tube * Math.cos(phi)) * Math.cos(theta);
            const y = (radius + tube * Math.cos(phi)) * Math.sin(theta);
            const z = tube * Math.sin(phi);
            positions.push(x, y, z);
            normals.push(x, y, z);
          }
        }
        geometry = new Geometry(gl, {
          position: { size: 3, data: new Float32Array(positions) },
          normal: { size: 3, data: new Float32Array(normals) },
        });
      } else {
        const lat = 64;
        const lon = 64;
        const r = 1;
        const positions = [];
        const normals = [];
        for (let i = 0; i <= lat; ++i) {
          const theta = (i * Math.PI) / lat;
          for (let j = 0; j <= lon; ++j) {
            const phi = (j * 2 * Math.PI) / lon;
            const x = r * Math.sin(theta) * Math.cos(phi);
            const y = r * Math.sin(theta) * Math.sin(phi);
            const z = r * Math.cos(theta);
            positions.push(x, y, z);
            normals.push(x, y, z);
          }
        }
        geometry = new Geometry(gl, {
          position: { size: 3, data: new Float32Array(positions) },
          normal: { size: 3, data: new Float32Array(normals) },
        });
      }

      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uAmplitude: { value: amplitude },
          uSpeed: { value: speed },
          uColor: { value: color },
        },
      });

      mesh = new Mesh(gl, { geometry, program });
      mesh.setParent(scene);

      if (mouseReact) {
        gl.canvas.addEventListener("mousemove", (e) => {
          const rect = gl.canvas.getBoundingClientRect();
          mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        });
      }

      function animate() {
        if (disposed) return;
        try {
          time += 0.016;
          program.uniforms.uTime.value = time;
          if (mouseReact) {
            targetRotY += (mouseX * Math.PI - targetRotY) * 0.05;
            targetRotX += (mouseY * Math.PI - targetRotX) * 0.05;
            mesh.rotation.y = targetRotY;
            mesh.rotation.x = targetRotX;
          } else {
            mesh.rotation.y += 0.01;
            mesh.rotation.x += 0.005;
          }
          renderer.render({ scene, camera });
        } catch (err) {
          console.warn("Iridescence: render stopped", err);
          disposed = true;
          return;
        }
        animationRef.current = requestAnimationFrame(animate);
      }
      animate();
    } catch (err) {
      console.warn("Iridescence: WebGL init failed", err);
      safeRemoveCanvas();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(animationRef.current);
      if (canvas && onCtxLost) {
        canvas.removeEventListener("webglcontextlost", onCtxLost);
      }
      safeRemoveCanvas();
    };
  }, [color, amplitude, speed, mouseReact, ring, size]);

  return <div ref={ref} style={{ width: size, height: size, margin: "0 auto" }} />;
}
