import styles from "./PageContainer.module.css";

const PageContainer = ({ children, className }) => {
  return (
    <div className={className ? className : styles.container}>{children}</div>
  );
};

export default PageContainer;
