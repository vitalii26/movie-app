import styles from "./PageContainer.module.css";
import PropTypes from "prop-types";

const PageContainer = ({ children, className }) => {
  return (
    <div className={className ? className : styles.container}>{children}</div>
  );
};

PageContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PageContainer;
