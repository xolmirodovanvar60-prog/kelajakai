import { motion } from "framer-motion";

const WorldMap = () => {
  // Node positions representing major cities/tech hubs
  const nodes = [
    { x: 20, y: 35, label: "New York" },
    { x: 10, y: 45, label: "São Paulo" },
    { x: 48, y: 25, label: "London" },
    { x: 52, y: 30, label: "Berlin" },
    { x: 55, y: 40, label: "Dubai" },
    { x: 70, y: 35, label: "Mumbai" },
    { x: 78, y: 28, label: "Beijing" },
    { x: 82, y: 32, label: "Tokyo" },
    { x: 85, y: 55, label: "Sydney" },
    { x: 50, y: 22, label: "Moscow" },
    { x: 65, y: 45, label: "Singapore" },
    { x: 45, y: 35, label: "Cairo" },
  ];

  // Connection lines between nodes
  const connections = [
    [0, 2], [2, 3], [3, 9], [9, 7], [7, 8],
    [2, 4], [4, 5], [5, 6], [6, 7],
    [0, 1], [4, 11], [5, 10], [10, 8],
    [6, 10], [3, 4], [1, 11],
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-50">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* SVG Map */}
      <svg
        viewBox="0 0 100 70"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connection lines */}
        {connections.map(([from, to], i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${nodes[from].x}%`}
            y1={`${nodes[from].y}%`}
            x2={`${nodes[to].x}%`}
            y2={`${nodes[to].y}%`}
            stroke="#93c5fd"
            strokeWidth="0.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: i * 0.1 }}
          />
        ))}

        {/* Animated data packets along lines */}
        {connections.slice(0, 8).map(([from, to], i) => (
          <motion.circle
            key={`packet-${i}`}
            r="0.5"
            fill="#2563eb"
            initial={{ opacity: 0 }}
            animate={{
              cx: [`${nodes[from].x}%`, `${nodes[to].x}%`],
              cy: [`${nodes[from].y}%`, `${nodes[to].y}%`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            {/* Outer pulse ring */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="1.5"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="0.15"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
            {/* Main node */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="0.9"
              fill="#2563eb"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
            {/* Inner highlight */}
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="0.35"
              fill="#60a5fa"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default WorldMap;
