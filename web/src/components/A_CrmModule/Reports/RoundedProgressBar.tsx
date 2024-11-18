import React from 'react';

const RoundedProgressBar = ({ progress, width = 100, height = 8, backgroundColor = '#E5E7EB', fillColor = '#E3BDFF' }) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      style={{
        width: `${width}%`,
        height: `${height}px`,
        backgroundColor: backgroundColor,
        borderRadius: `${height / 2}px`,
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          width: `${clampedProgress}%`,
          height: '100%',
          backgroundColor: fillColor,
          transition: 'width 0.5s ease-in-out'
        }}
      />
    </div>
  );
};

export default RoundedProgressBar;
