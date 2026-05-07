import React from 'react';

/**
 * A simple shim for next/image to allow the library to work in pure React environments.
 */
const Image = ({ 
  src, 
  alt, 
  width, 
  height, 
  fill, 
  className, 
  priority,
  quality,
  sizes,
  ...props 
}: any) => {
  // Handle 'fill' property like Next.js does
  const style: React.CSSProperties = fill ? {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    objectFit: 'cover',
    objectPosition: 'center',
  } : {};

  return (
    <img
      src={src}
      alt={alt || ''}
      width={width}
      height={height}
      className={className}
      style={{ ...style, ...props.style }}
      {...props}
    />
  );
};

export default Image;
