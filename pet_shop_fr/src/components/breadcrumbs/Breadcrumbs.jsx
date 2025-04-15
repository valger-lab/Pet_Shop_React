import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs = ({ additionalPaths = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbLink}>
        Main page
      </Link>

      {additionalPaths.map((path, index) => (
        <span key={index}>
          <span className={styles.separator}> ➜ </span>
          <Link to={path.path} className={styles.breadcrumbLink}>
            {path.name}
          </Link>
        </span>
      ))}

      {pathnames
        .filter(
          (name) =>
            !additionalPaths.some((path) => path.path.split("/").pop() === name)
        )
        .map((name, index) => {
          const isLast = index === pathnames.length - 1;
          const fullPath = `/${pathnames.slice(0, index + 1).join("/")}`;

          return (
            <span key={name}>
              <span className={styles.separator}> ➜ </span>
              {isLast ? (
                <span className={styles.breadcrumbText}>{name}</span>
              ) : (
                <Link to={fullPath} className={styles.breadcrumbLink}>
                  {name}
                </Link>
              )}
            </span>
          );
        })}
    </div>
  );
};

export default Breadcrumbs;
