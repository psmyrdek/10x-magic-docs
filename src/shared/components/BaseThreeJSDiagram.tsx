import React, {useRef, useState, useEffect} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

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
    const nodePositions: {[key: string]: THREE.Vector3} = {};
    const nodeGroups: {[key: string]: THREE.Group} = {};

    // Force-directed layout parameters
    const repulsionForce = 2; // Strength of repulsion between nodes
    const minDistance = 2.5; // Minimum distance between nodes
    const damping = 0.8; // Damping factor for node movement
    const iterations = 50; // Number of iterations for force-directed layout

    // Initialize node positions
    nodes.forEach((node) => {
      nodePositions[node.id] = new THREE.Vector3(...node.position);
    });

    // Apply force-directed layout
    for (let i = 0; i < iterations; i++) {
      // Calculate repulsion forces
      nodes.forEach((node1) => {
        const pos1 = nodePositions[node1.id];
        const forces = new THREE.Vector3(0, 0, 0);

        nodes.forEach((node2) => {
          if (node1.id !== node2.id) {
            const pos2 = nodePositions[node2.id];
            const direction = new THREE.Vector3().subVectors(pos1, pos2);
            const distance = direction.length();

            if (distance < minDistance) {
              const force = repulsionForce / (distance * distance);
              forces.add(direction.normalize().multiplyScalar(force));
            }
          }
        });

        // Apply forces with damping
        const newPos = pos1.clone().add(forces.multiplyScalar(damping));

        // Maintain vertical position (y-coordinate)
        newPos.y = pos1.y;

        // Limit horizontal movement
        const maxHorizontalMove = 1.5;
        const horizontalDiff = new THREE.Vector2(
          newPos.x - pos1.x,
          newPos.z - pos1.z
        );
        if (horizontalDiff.length() > maxHorizontalMove) {
          horizontalDiff.normalize().multiplyScalar(maxHorizontalMove);
          newPos.x = pos1.x + horizontalDiff.x;
          newPos.z = pos1.z + horizontalDiff.y;
        }

        nodePositions[node1.id] = newPos;
      });
    }

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

    // Create canvas texture for text rendering
    const createTextTexture = (
      text: string,
      width: number,
      height: number,
      backgroundColor: number,
      textColor: string = "#ffffff"
    ) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      // Set canvas size (higher resolution for better text quality)
      const scale = 2;
      canvas.width = width * scale;
      canvas.height = height * scale;

      // Fill background
      ctx.fillStyle = new THREE.Color(backgroundColor).getStyle();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      const fontSize = Math.min(canvas.height / 2, 32 * scale);
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = textColor;

      // Handle text wrapping for longer text
      const words = text.split(" ");
      const maxWidth = canvas.width * 0.9;
      let line = "";
      const lines = [];

      for (const word of words) {
        const testLine = line + (line ? " " : "") + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== "") {
          lines.push(line);
          line = word;
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      // Draw each line of text
      const lineHeight = fontSize * 1.2;
      const totalTextHeight = lineHeight * lines.length;
      const startY = (canvas.height - totalTextHeight) / 2 + lineHeight / 2;

      lines.forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2, startY + i * lineHeight);
      });

      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Set loading to false since we don't need to wait for font loading anymore
    setIsLoading(false);

    // Create nodes with text on them
    nodes.forEach((node) => {
      // Create a group to hold the node and its text
      const group = new THREE.Group();
      group.position.copy(nodePositions[node.id]);

      // Create the main geometry
      const geometry = createNodeGeometry
        ? createNodeGeometry(node.type)
        : defaultCreateNodeGeometry(node.type);

      // Create the base material for the node
      const material = new THREE.MeshStandardMaterial({
        color: node.color,
        metalness: 0.1,
        roughness: 0.5,
      });

      // Create node mesh
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData = {id: node.id, type: "node", name: node.name};
      group.add(mesh);
      nodeMeshes[node.id] = mesh;

      // Add text panel above the node
      const textPanelSize = {width: 2, height: 0.6};
      const textTexture = createTextTexture(
        node.name,
        textPanelSize.width * 200,
        textPanelSize.height * 200,
        node.color,
        "#000000"
      );

      if (textTexture) {
        const textGeometry = new THREE.PlaneGeometry(
          textPanelSize.width,
          textPanelSize.height
        );
        const textMaterial = new THREE.MeshBasicMaterial({
          map: textTexture,
          transparent: true,
          depthWrite: false,
        });

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(0, 1.0, 0); // Position above the node
        textMesh.lookAt(0, 0, 1); // Always face camera

        group.add(textMesh);

        // Add a billboard behavior to make text always face camera
        const updateTextOrientation = () => {
          if (textMesh && camera) {
            textMesh.lookAt(camera.position);
          }
        };

        // Store the update function for animation loop
        textMesh.userData = {updateOrientation: updateTextOrientation};
      }

      // Add the group to the scene
      scene.add(group);
      nodeGroups[node.id] = group;
    });

    // Create connections with adjusted positions
    connections.forEach((connection) => {
      const fromNode = nodePositions[connection.from];
      const toNode = nodePositions[connection.to];

      if (fromNode && toNode) {
        const points = [fromNode, toNode];

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

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Handle mouse move for hover effect
    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;

      mouse.x = (event.offsetX / mountRef.current.clientWidth) * 2 - 1;
      mouse.y = -(event.offsetY / mountRef.current.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

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
      const intersects = raycaster.intersectObjects(scene.children, true);

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

      // Update text orientations to face camera
      Object.values(nodeGroups).forEach((group) => {
        group.children.forEach((child) => {
          if (child.userData && child.userData.updateOrientation) {
            child.userData.updateOrientation();
          }
        });
      });

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

      // Dispose materials and geometries
      Object.values(nodeMeshes).forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });

      // Clean up all node groups
      Object.values(nodeGroups).forEach((group) => {
        scene.remove(group);
        group.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (child.material instanceof THREE.Material) {
              child.material.dispose();
            } else if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            }
          }
        });
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
