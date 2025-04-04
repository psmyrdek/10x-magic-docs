import React, {useRef, useState, useEffect} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";
import {FontLoader, Font} from "three/examples/jsm/loaders/FontLoader.js";

export type Node3D = {
  id: string;
  name: string;
  position: [number, number, number];
  color: number;
  type: string;
};

export type Connection3D = {
  from: string;
  to: string;
  type: string;
};

export type NodeInfo = {
  title: string;
  description: string;
};

type BaseThreeJSDiagramProps = {
  nodes: Node3D[];
  connections: Connection3D[];
  getNodeInfo: (nodeId: string) => NodeInfo;
  createNodeGeometry?: (nodeType: string) => THREE.BufferGeometry;
  height?: string;
  backgroundColor?: number;
};

export const BaseThreeJSDiagram: React.FC<BaseThreeJSDiagramProps> = ({
  nodes,
  connections,
  getNodeInfo,
  createNodeGeometry,
  height = "600px",
  backgroundColor = 0xf0f0f0,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    // Add ambient light and directional light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 20);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });

    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );

    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Node meshes map
    const nodeMeshes: {[key: string]: THREE.Mesh} = {};
    const nodeLabels: {[key: string]: THREE.Mesh} = {};

    // Default node geometry creator
    const defaultCreateNodeGeometry = (type: string): THREE.BufferGeometry => {
      switch (type) {
        case "trigger":
          return new THREE.SphereGeometry(0.8, 32, 32);
        case "definition":
          return new THREE.BoxGeometry(1.5, 0.8, 0.8);
        case "execution":
          return new THREE.CylinderGeometry(0.6, 0.6, 0.8, 32);
        case "resource":
          return new THREE.TorusGeometry(0.6, 0.2, 16, 32);
        default:
          return new THREE.SphereGeometry(0.8, 32, 32);
      }
    };

    // Load font for text geometry
    const fontLoader = new FontLoader();
    fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font: Font) => {
      setIsLoading(false);

      // Create nodes
      nodes.forEach((node) => {
        const geometry = createNodeGeometry
          ? createNodeGeometry(node.type)
          : defaultCreateNodeGeometry(node.type);

        const material = new THREE.MeshStandardMaterial({
          color: node.color,
          metalness: 0.1,
          roughness: 0.5,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(node.position[0], node.position[1], node.position[2]);
        mesh.userData = {id: node.id, type: "node", name: node.name};
        scene.add(mesh);
        nodeMeshes[node.id] = mesh;

        // Create text label
        const textGeometry = new TextGeometry(node.name, {
          font: font,
          size: 0.35,
          depth: 0.08,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.01,
          bevelSize: 0.01,
          bevelOffset: 0,
          bevelSegments: 5,
        });

        const textMaterial = new THREE.MeshPhongMaterial({
          color: 0x222222,
          specular: 0x111111,
          shininess: 30,
          flatShading: false,
        });

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Center the text under the node
        textGeometry.computeBoundingBox();
        const textWidth =
          textGeometry.boundingBox!.max.x - textGeometry.boundingBox!.min.x;
        textMesh.position.set(
          node.position[0] - textWidth / 2,
          node.position[1] - 1.3,
          node.position[2]
        );

        textMesh.rotation.x = -0.1;
        scene.add(textMesh);
        nodeLabels[node.id] = textMesh;
      });

      // Create connections
      connections.forEach((connection) => {
        const fromNode = nodes.find((n) => n.id === connection.from);
        const toNode = nodes.find((n) => n.id === connection.to);

        if (fromNode && toNode) {
          const points = [
            new THREE.Vector3(...fromNode.position),
            new THREE.Vector3(...toNode.position),
          ];

          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x666666,
            transparent: true,
            opacity: 0.7,
            ...(connection.type === "dashed"
              ? {dashSize: 0.2, gapSize: 0.1}
              : {}),
          });

          const line =
            connection.type === "dashed"
              ? new THREE.Line(lineGeometry, lineMaterial)
              : new THREE.Line(lineGeometry, lineMaterial);

          scene.add(line);
        }
      });
    });

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Handle mouse move for hover effect
    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;

      mouse.x = (event.offsetX / mountRef.current.clientWidth) * 2 - 1;
      mouse.y = -(event.offsetY / mountRef.current.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const firstHit = intersects.find(
          (hit) => hit.object.userData && hit.object.userData.type === "node"
        );

        if (firstHit) {
          document.body.style.cursor = "pointer";
          const nodeId = firstHit.object.userData.id;
          Object.values(nodeMeshes).forEach((mesh) => {
            if (mesh.userData.id === nodeId) {
              (mesh.material as THREE.MeshStandardMaterial).emissive.set(
                0x333333
              );
            } else {
              (mesh.material as THREE.MeshStandardMaterial).emissive.set(
                0x000000
              );
            }
          });
        } else {
          document.body.style.cursor = "auto";
          Object.values(nodeMeshes).forEach((mesh) => {
            (mesh.material as THREE.MeshStandardMaterial).emissive.set(
              0x000000
            );
          });
        }
      } else {
        document.body.style.cursor = "auto";
        Object.values(nodeMeshes).forEach((mesh) => {
          (mesh.material as THREE.MeshStandardMaterial).emissive.set(0x000000);
        });
      }
    };

    // Handle click for detailed information
    const handleClick = (event: MouseEvent) => {
      if (!mountRef.current) return;

      mouse.x = (event.offsetX / mountRef.current.clientWidth) * 2 - 1;
      mouse.y = -(event.offsetY / mountRef.current.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const firstHit = intersects.find(
          (hit) => hit.object.userData && hit.object.userData.type === "node"
        );

        if (firstHit) {
          const nodeId = firstHit.object.userData.id;
          setActiveNode(nodeId);
        }
      }
    };

    // Add event listeners
    if (mountRef.current) {
      mountRef.current.addEventListener("mousemove", handleMouseMove);
      mountRef.current.addEventListener("click", handleClick);
    }

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeEventListener("mousemove", handleMouseMove);
        mountRef.current.removeEventListener("click", handleClick);
        if (mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }

      window.removeEventListener("resize", handleResize);

      Object.values(nodeMeshes).forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });

      Object.values(nodeLabels).forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
    };
  }, [nodes, connections, createNodeGeometry, backgroundColor]);

  return (
    <div className='relative w-full' style={{height}}>
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-10'>
          <div className='text-lg font-medium'>Loading 3D diagram...</div>
        </div>
      )}

      <div ref={mountRef} className='w-full h-full' />

      {activeNode && (
        <div className='absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-md'>
          <h3 className='text-lg font-bold'>{getNodeInfo(activeNode).title}</h3>
          <p className='mt-2'>{getNodeInfo(activeNode).description}</p>
          <button
            className='mt-2 text-sm text-blue-600 hover:text-blue-800'
            onClick={() => setActiveNode(null)}
          >
            Close
          </button>
        </div>
      )}

      <div className='absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg'>
        <h4 className='font-medium text-sm mb-2'>Instructions</h4>
        <ul className='text-xs space-y-1'>
          <li>• Click on any node for details</li>
          <li>• Drag to rotate the view</li>
          <li>• Scroll to zoom in/out</li>
          <li>• Right-click and drag to pan</li>
        </ul>
      </div>
    </div>
  );
};
