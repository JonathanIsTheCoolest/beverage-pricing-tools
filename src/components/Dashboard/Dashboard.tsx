import { Navigation } from "../Navigation/Navigation";

export const Dashboard = () => {
  return (
    <div      
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
      }}
    >
      <Navigation />
    </div>
  );
};