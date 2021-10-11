const BgImageContainer = ({ bgPath, children }) => {
  return (
    <section
      style={{
        background: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${bgPath}) no-repeat center/ cover `,
        width: "100%",
        minHeight: "calc(100vh - 94px)",
      }}
    >
      {children}
    </section>
  );
};

export default BgImageContainer;
