import React, {useState, useRef, useEffect, useMemo} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  Environment,
  PerspectiveCamera,
  useCursor,
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Float,
  RoundedBox,
  Torus,
  Sphere,
  Cylinder,
  Effects,
} from "@react-three/drei";
import * as THREE from "three";
import {EffectComposer, Bloom, Vignette} from "@react-three/postprocessing";

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

// Node component with modernized materials and effects
const Node = ({
  node,
  position,
  onNodeClick,
  isHovered,
  setHovered,
}: {
  node: Node3D;
  position: THREE.Vector3;
  onNodeClick: (nodeId: string) => void;
  isHovered: boolean;
  setHovered: (nodeId: string | null) => void;
}) => {
  const [hovered, hover] = useState(false);
  useCursor(hovered || isHovered);

  // Scale up slightly when hovered
  const scale = hovered || isHovered ? 1.15 : 1;

  // Create appropriate geometry based on node type
  switch (node.type) {
    case "trigger":
      return (
        <group position={position} scale={scale}>
          <Float
            speed={2}
            rotationIntensity={0.2}
            floatIntensity={0.3}
            floatingRange={[-0.05, 0.05]}
          >
            <Sphere
              args={[0.8, 32, 32]}
              onPointerOver={() => {
                hover(true);
                setHovered(node.id);
              }}
              onPointerOut={() => {
                hover(false);
                setHovered(null);
              }}
              onClick={() => onNodeClick(node.id)}
            >
              <MeshWobbleMaterial
                color={node.color}
                factor={0.2}
                speed={0.5}
                roughness={0.4}
                metalness={0.6}
                emissive={
                  hovered || isHovered
                    ? new THREE.Color(node.color).multiplyScalar(0.3)
                    : new THREE.Color(0x000000)
                }
              />
            </Sphere>
            <NodeLabel name={node.name} />
          </Float>
        </group>
      );
    case "definition":
      return (
        <group position={position} scale={scale}>
          <Float
            speed={1.5}
            rotationIntensity={0.1}
            floatIntensity={0.3}
            floatingRange={[-0.05, 0.05]}
          >
            <RoundedBox
              args={[1.5, 0.8, 0.8]}
              radius={0.15}
              smoothness={4}
              onPointerOver={() => {
                hover(true);
                setHovered(node.id);
              }}
              onPointerOut={() => {
                hover(false);
                setHovered(null);
              }}
              onClick={() => onNodeClick(node.id)}
            >
              <MeshTransmissionMaterial
                color={node.color}
                distortionScale={0.5}
                temporalDistortion={0.1}
                roughness={0.2}
                thickness={0.8}
                transmission={0.6}
                chromaticAberration={0.1}
                anisotropicBlur={0.1}
                envMapIntensity={0.4}
                distortion={0.3}
                ior={1.5}
                emissive={
                  hovered || isHovered
                    ? new THREE.Color(node.color).multiplyScalar(0.5)
                    : new THREE.Color(0x000000)
                }
              />
            </RoundedBox>
            <NodeLabel name={node.name} />
          </Float>
        </group>
      );
    case "execution":
      return (
        <group position={position} scale={scale}>
          <Float
            speed={1.8}
            rotationIntensity={0.1}
            floatIntensity={0.2}
            floatingRange={[-0.05, 0.05]}
          >
            <Cylinder
              args={[0.6, 0.6, 0.8, 32]}
              onPointerOver={() => {
                hover(true);
                setHovered(node.id);
              }}
              onPointerOut={() => {
                hover(false);
                setHovered(null);
              }}
              onClick={() => onNodeClick(node.id)}
            >
              <MeshDistortMaterial
                color={node.color}
                distort={0.2}
                speed={0.8}
                roughness={0.5}
                metalness={0.2}
                emissive={
                  hovered || isHovered
                    ? new THREE.Color(node.color).multiplyScalar(0.3)
                    : new THREE.Color(0x000000)
                }
              />
            </Cylinder>
            <NodeLabel name={node.name} />
          </Float>
        </group>
      );
    case "resource":
      return (
        <group position={position} scale={scale}>
          <Float
            speed={1.5}
            rotationIntensity={0.15}
            floatIntensity={0.25}
            floatingRange={[-0.05, 0.05]}
          >
            <Torus
              args={[0.6, 0.2, 16, 32]}
              onPointerOver={() => {
                hover(true);
                setHovered(node.id);
              }}
              onPointerOut={() => {
                hover(false);
                setHovered(null);
              }}
              onClick={() => onNodeClick(node.id)}
            >
              <meshPhysicalMaterial
                color={node.color}
                roughness={0.2}
                metalness={0.8}
                clearcoat={0.8}
                clearcoatRoughness={0.2}
                emissive={
                  hovered || isHovered
                    ? new THREE.Color(node.color).multiplyScalar(0.3)
                    : new THREE.Color(0x000000)
                }
              />
            </Torus>
            <NodeLabel name={node.name} />
          </Float>
        </group>
      );
    default:
      return (
        <group position={position} scale={scale}>
          <Float
            speed={2}
            rotationIntensity={0.1}
            floatIntensity={0.2}
            floatingRange={[-0.05, 0.05]}
          >
            <Sphere
              args={[0.8, 32, 32]}
              onPointerOver={() => {
                hover(true);
                setHovered(node.id);
              }}
              onPointerOut={() => {
                hover(false);
                setHovered(null);
              }}
              onClick={() => onNodeClick(node.id)}
            >
              <meshPhysicalMaterial
                color={node.color}
                roughness={0.2}
                metalness={0.5}
                emissive={
                  hovered || isHovered
                    ? new THREE.Color(node.color).multiplyScalar(0.3)
                    : new THREE.Color(0x000000)
                }
              />
            </Sphere>
            <NodeLabel name={node.name} />
          </Float>
        </group>
      );
  }
};

// Modern connection line with smooth curves
const Connection = ({
  startPosition,
  endPosition,
  type,
}: {
  startPosition: THREE.Vector3;
  endPosition: THREE.Vector3;
  type: string;
}) => {
  const points = useMemo(() => {
    // Create a curve between the two points with a nice arc
    const curve = new THREE.QuadraticBezierCurve3(
      startPosition,
      new THREE.Vector3(
        (startPosition.x + endPosition.x) / 2,
        (startPosition.y + endPosition.y) / 2 + 0.5,
        (startPosition.z + endPosition.z) / 2
      ),
      endPosition
    );

    return curve.getPoints(20);
  }, [startPosition, endPosition]);

  const color = useMemo(() => {
    if (type === "challenge") return new THREE.Color(0xff7777);
    if (type === "solution") return new THREE.Color(0x55ccff);
    return new THREE.Color(0xaabbcc);
  }, [type]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  // Much thicker lines, and removing the dashed option
  const lineWidth = 8;

  return (
    <>
      <mesh>
        <primitive object={lineGeometry} attach='geometry' />
        <lineBasicMaterial
          color={color}
          opacity={0.8}
          transparent={true}
          linewidth={lineWidth}
        />
      </mesh>

      {/* Enhanced glow effect */}
      <mesh>
        <primitive object={lineGeometry} attach='geometry' />
        <lineBasicMaterial
          color={color}
          opacity={0.4}
          transparent={true}
          linewidth={lineWidth + 2}
        />
      </mesh>
    </>
  );
};

// Node label with modern appearance
const NodeLabel = ({name}: {name: string}) => {
  return (
    <Text
      position={[0, 1.2, 0]}
      fontSize={0.25}
      color='#ffffff'
      anchorX='center'
      anchorY='middle'
      outlineWidth={0.005}
      outlineColor='#000000'
      maxWidth={2}
      renderOrder={1}
      textAlign='center'
      depthOffset={1}
    >
      {name}
    </Text>
  );
};

// Scene component containing all 3D elements
const Scene = ({
  nodes,
  connections,
  onNodeClick,
  hoveredNode,
  setHoveredNode,
}: {
  nodes: Node3D[];
  connections: Connection3D[];
  onNodeClick: (nodeId: string) => void;
  hoveredNode: string | null;
  setHoveredNode: (nodeId: string | null) => void;
}) => {
  // Store node positions after force-directed layout
  const nodePositions = useRef<{[key: string]: THREE.Vector3}>({});

  // Apply force-directed layout algorithm
  const applyForceDirectedLayout = () => {
    // Initialize positions from nodes
    nodes.forEach((node) => {
      nodePositions.current[node.id] = new THREE.Vector3(...node.position);
    });

    // Force-directed layout parameters
    const repulsionForce = 2;
    const minDistance = 2.5;
    const damping = 0.8;
    const iterations = 50;

    // Run iterations of force-directed layout
    for (let i = 0; i < iterations; i++) {
      // Calculate repulsion forces
      nodes.forEach((node1) => {
        const pos1 = nodePositions.current[node1.id];
        const forces = new THREE.Vector3(0, 0, 0);

        nodes.forEach((node2) => {
          if (node1.id !== node2.id) {
            const pos2 = nodePositions.current[node2.id];
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

        nodePositions.current[node1.id] = newPos;
      });
    }
  };

  // Apply layout on component mount
  useEffect(() => {
    applyForceDirectedLayout();
  }, [nodes]);

  return (
    <>
      {/* Environment and lighting */}
      <Environment preset='city' />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7]} intensity={0.8} castShadow />
      <hemisphereLight args={[0x606060, 0x404040]} intensity={0.4} />

      {/* Add subtle camera movement */}
      <CameraRig />

      {/* Render nodes */}
      {nodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          position={
            nodePositions.current[node.id] ||
            new THREE.Vector3(...node.position)
          }
          onNodeClick={onNodeClick}
          isHovered={node.id === hoveredNode}
          setHovered={setHoveredNode}
        />
      ))}

      {/* Render connections */}
      {connections.map((connection, idx) => {
        const fromPosition =
          nodePositions.current[connection.from] ||
          new THREE.Vector3(
            ...(nodes.find((n) => n.id === connection.from)?.position || [
              0, 0, 0,
            ])
          );
        const toPosition =
          nodePositions.current[connection.to] ||
          new THREE.Vector3(
            ...(nodes.find((n) => n.id === connection.to)?.position || [
              0, 0, 0,
            ])
          );

        return (
          <Connection
            key={`${connection.from}-${connection.to}-${idx}`}
            startPosition={fromPosition}
            endPosition={toPosition}
            type={connection.type}
          />
        );
      })}

      {/* Post-processing effects */}
      <Effects>
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={0.3} radius={0.7} />
          <Vignette opacity={0.3} darkness={0.7} />
        </EffectComposer>
      </Effects>
    </>
  );
};

// Add subtle camera movement for more dynamic feel
const CameraRig = () => {
  const {camera} = useThree();

  useFrame(({clock}) => {
    const t = clock.getElapsedTime() * 0.15;
    camera.position.x += Math.sin(t) * 0.01;
    camera.position.y += Math.cos(t) * 0.01;
  });

  return null;
};

export const BaseThreeJSDiagram: React.FC<BaseThreeJSDiagramProps> = ({
  nodes,
  connections,
  getNodeInfo,
  height = "600px",
  backgroundColor = 0x121212,
}) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const handleNodeClick = (nodeId: string) => {
    setActiveNode(nodeId);
  };

  return (
    <div className='relative w-full' style={{height}}>
      <Canvas shadows dpr={[1, 2]} camera={{position: [0, 0, 20], fov: 60}}>
        <color
          attach='background'
          args={[`#${backgroundColor.toString(16).padStart(6, "0")}`]}
        />

        <Scene
          nodes={nodes}
          connections={connections}
          onNodeClick={handleNodeClick}
          hoveredNode={hoveredNode}
          setHoveredNode={setHoveredNode}
        />

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={30}
          makeDefault
        />

        <PerspectiveCamera
          makeDefault
          position={[0, 0, 20]}
          fov={60}
          near={0.1}
          far={1000}
        />
      </Canvas>

      {/* Info panel */}
      {activeNode && (
        <div className='absolute bottom-4 left-4 right-4 bg-[#1a1a1a] p-4 rounded-lg shadow-lg max-w-md backdrop-blur-md bg-opacity-85 border border-gray-700'>
          <h3 className='text-lg font-bold text-gray-100'>
            {getNodeInfo(activeNode).title}
          </h3>
          <p className='mt-2 text-gray-300'>
            {getNodeInfo(activeNode).description}
          </p>
          <button
            className='mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-md text-sm text-white transition-colors'
            onClick={() => setActiveNode(null)}
          >
            Close
          </button>
        </div>
      )}

      {/* Instructions panel */}
      <div className='absolute top-4 right-4 bg-[#1a1a1a] p-3 rounded-lg shadow-lg backdrop-blur-md bg-opacity-85 border border-gray-700 transition-opacity opacity-80 hover:opacity-100'>
        <h4 className='font-medium text-sm mb-2 text-gray-200'>Instructions</h4>
        <ul className='text-xs space-y-1 text-gray-300'>
          <li>• Click on any node for details</li>
          <li>• Drag to rotate the view</li>
          <li>• Scroll to zoom in/out</li>
          <li>• Right-click and drag to pan</li>
        </ul>
      </div>
    </div>
  );
};
