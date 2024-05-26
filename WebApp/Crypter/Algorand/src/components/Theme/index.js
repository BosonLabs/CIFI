import React from "react";
import cn from "classnames";
import styles from "./Theme.module.sass";
import useDarkMode from "use-dark-mode";

const Theme = ({ className,boo}) => {
  const darkMode = useDarkMode(true);

  return (
    <label
      className={cn(
        styles.theme,
        { [styles.theme]: className === "theme" },
        { [styles.themeBig]: className === "theme-big" }
      )}
    >
      <input
        className={styles.input}
        // checked={darkMode.value}
        onChange={darkMode.toggle}
        type="checkbox"
        // checked="true"
      />
      <span className={styles.inner}>
        <span className={styles.box}></span>
      </span>
    </label>
  );
};

export default Theme;
