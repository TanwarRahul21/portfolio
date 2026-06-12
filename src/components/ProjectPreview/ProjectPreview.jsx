import React from 'react';

const ProjectPreview = ({ title, emoji, gradient }) => {
  return (
    <div
      className="w-full h-56 flex items-center justify-center relative overflow-hidden rounded-t-2xl"
      style={{
        background: gradient || "linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #1e1b4b 100%)",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-5 right-10 w-32 h-32 bg-indigo-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="text-6xl mb-4">{emoji}</div>
        <h3 className="text-3xl font-bold text-white">{title}</h3>
      </div>
    </div>
  );
};

export default ProjectPreview;
