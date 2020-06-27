import { useEffect, useState } from 'react';

// function to return the window dimensions
const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

/**
 * Usage: will update state whenever window is resized
 *    const { height, width } = useWindowDimensions();
 */
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    // handle resize function
    const handleResize = () => setWindowDimensions(getWindowDimensions());

    // on mount, add the event listener, on dismount remove it
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
