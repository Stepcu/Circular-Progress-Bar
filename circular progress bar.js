import React from "react";
import { motion } from "framer-motion";

// Circular Progress Bar Component
const CircularProgressBar = ({ skills, centerText }) => {
  // Constants for the circular progress bar
  const radius = 250; // Radius of the circle
  const strokeWidth = 30; // Width of the stroke
  const circumference = 2 * Math.PI * radius; // Total circumference of the circle
  const gap = 10; // Gap between segments
  const totalSegments = skills.length; // Number of skill segments
  const segmentLength =
    (circumference - totalSegments * gap) / totalSegments; // Length of each segment
  const totalAnimationDuration = totalSegments * 0.5; // Total animation duration (0.5 seconds per segment)

  return (
    <div
      style={{
        position: "relative",
        width: "700px",
        height: "700px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width="700"
        height="700"
        viewBox="0 0 700 700"
        style={{ transform: "rotate(-90deg)" }} // Rotates to start from the top
      >
        {/* Render progress bar segments */}
        {skills.map((skill, index) => {
          const startOffset =
            (segmentLength + gap) * index; // Calculate the offset for each segment

          return (
            <motion.circle
              key={index}
              r={radius} // Circle radius
              cx="350" // X-center of the circle
              cy="350" // Y-center of the circle
              fill="transparent" // No fill color
              stroke={skill.color} // Color for the segment
              strokeWidth={strokeWidth} // Stroke width
              strokeDasharray={`${segmentLength} ${circumference - segmentLength}`} // Define dash pattern for progress
              strokeDashoffset={-startOffset} // Offset the start position
              initial={{ strokeDasharray: `0 ${circumference}` }} // Start animation with no visible progress
              animate={{
                strokeDasharray: `${segmentLength} ${circumference - segmentLength}`,
              }} // Animate to full segment length
              transition={{
                duration: 0.5, // Duration for segment animation
                delay: index * 0.5, // Delay each segment for a cascading effect
                ease: "easeInOut", // Smooth easing for animation
              }}
            />
          );
        })}
      </svg>

      {/* Render skill labels */}
      {skills.map((skill, index) => {
        const angle = (360 / totalSegments) * index - 90; // Angle for text position
        const textX =
          350 + (radius + 80) * Math.cos((angle * Math.PI) / 180); // Calculate X position for text
        const textY =
          350 + (radius + 80) * Math.sin((angle * Math.PI) / 180); // Calculate Y position for text

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }} // Start with invisible text
            animate={{ opacity: 1 }} // Fade in text
            transition={{
              duration: 0.5, // Duration for text animation
              delay: index * 0.5, // Synchronize with progress bar animation
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${textX}px`,
              top: `${textY}px`,
              transform: "translate(-50%, -50%)", // Center-align text
              fontSize: "16px",
              fontWeight: "bold",
              color: skill.color,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {skill.name}
          </motion.div>
        );
      })}

      {/* Render central text */}
      <motion.div
        initial={{ opacity: 0 }} // Start with invisible central text
        animate={{ opacity: 1 }} // Fade in central text
        transition={{
          duration: totalAnimationDuration, // Total duration matches all segment animations
          delay: 0,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#FFFBFB",
          maxWidth: "375px",
          wordBreak: "break-word",
        }}
      >
        {centerText}
      </motion.div>
    </div>
  );
};

// Example usage of the CircularProgressBar component
export default function App() {
  const skills = [
    { name: "JavaScript", progress: 7, color: "#FFB02E" },
    { name: "React", progress: 7, color: "#FFB02E" },
    { name: "Node.js", progress: 7, color: "#FFB02E" },
    { name: "Next.js", progress: 7, color: "#FFB02E" },
    { name: "JQuery", progress: 7, color: "#FFB02E" },
    { name: "HTML", progress: 7, color: "#FFB02E" },
    { name: "Bootstrap", progress: 7, color: "#FFB02E" },
    { name: "Adobe PhotoShop", progress: 7, color: "#FFB02E" },
    { name: "Figma", progress: 7, color: "#FFB02E" },
    { name: "Sketch", progress: 7, color: "#FFB02E" },
    { name: "CSS", progress: 7, color: "#FFB02E" },
    { name: "AWS", progress: 7, color: "#FFB02E" },
    { name: "MySQL", progress: 7, color: "#FFB02E" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgressBar
        skills={skills}
        centerText="Software Developer with 3 years of experience in web development. Detail-oriented and methodical, I specialize in front-end and back-end technologies, along with UI/UX design. Passionate about innovation and continuous learning, I'm eager to contribute to impactful projects that drive meaningful results!"
      />
    </div>
  );
}
