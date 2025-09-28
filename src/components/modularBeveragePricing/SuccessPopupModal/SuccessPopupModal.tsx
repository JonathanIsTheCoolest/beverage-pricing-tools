import { useLayoutEffect } from "react"
import { createPortal } from "react-dom"
import type { ErrorObject } from "../../../interfaces/marginEdge"

export const SuccessPopupModal = ({ setIsOpen, errorObject, productName }: { setIsOpen: (isOpen: boolean) => void, errorObject: ErrorObject, productName: string }) => {
  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
        setIsOpen(false)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [])

  return (
    createPortal(
      <div
        id="success-popup-modal"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "fit-content",
          height: "fit-content",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: '20px',
          borderRadius: '10px',
          zIndex: "1000",
        }}
      >
        <h2>
          {
            Object.keys(errorObject).length ?
            <span>
              Failed to process <span style={{ fontWeight: "bold", color: "red" }}>{productName}</span>: {Object.values(errorObject).join(", ")}
            </span> : 
            <span>
              Successfully processed <span style={{ fontWeight: "bold", color: "green" }}>{productName}</span>
            </span>
          }
        </h2>
      </div>,
      document.body
    )
  )
}