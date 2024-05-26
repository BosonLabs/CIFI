import React from "react";
import useDarkMode from "use-dark-mode";

const Imagecopy = ({ className, src, srcDark, srcSet, srcSetDark, alt }) => {
  const darkMode = useDarkMode(false);

  return (
    <img    
      style={{width:"50px",height:"50px"}}
      className={className}
      srcSet={darkMode.value ? srcSetDark : srcSet}
      src={darkMode.value ? srcDark : src}
      alt={alt}
    />
  );
};

export default Imagecopy;
