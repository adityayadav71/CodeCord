const Skeleton = ({ classes }) => {
  const classNames = `animate-pulse bg-grey3 ${classes}`;
  return <div className={classNames}></div>;
};

export default Skeleton;
