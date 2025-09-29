export const DeleteModal = ({ setIsOpen, deleteFunction, productName }: { setIsOpen: (isOpen: boolean) => void, deleteFunction: () => void, productName: string }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        zIndex: "1000",
      }}
    >
      <div
        style={{
          height: "fit-content",
          width: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: '20px',
          borderRadius: '10px',
          zIndex: "1000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h2>This action cannot be undone. Are you sure you want to delete "<span style={{ fontWeight: "bold", color: "red" }}>{productName}</span>"?</h2>
        <button onClick={deleteFunction}>Delete</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </div>
    </div>
  )
}