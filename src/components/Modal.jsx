import { createPortal } from "react-dom";

function Modal({ children, handleClick }) {
  return createPortal(
    <div
      className="flip-container fixed inset-0 !bg-black/70 z-20"
      onClick={handleClick}
    >
      {children}
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
