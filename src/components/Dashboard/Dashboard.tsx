import { Navigation } from "../Navigation/Navigation";

export const Dashboard = () => {
  return (
    <div      
      style={{
        margin: '10px',
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Navigation />
    </div>
  );
};