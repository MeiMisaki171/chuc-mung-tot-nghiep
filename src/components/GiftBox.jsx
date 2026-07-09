import { useRef, useState } from "react";
import Bouquet from "./Bouquet";

export default function GiftBox({ onOpen }) {
  const stageRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hint, setHint] = useState("Bấm vào hộp quà để mở nhé 🎁");

  const toggleGift = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);

    if (nextOpen) {
      if (stageRef.current && onOpen) {
        const rect = stageRef.current.getBoundingClientRect();
        onOpen((rect.left + rect.width / 2) / window.innerWidth);
      }
    } else {
      setHint("Bấm vào hộp quà để mở nhé 🎁");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleGift();
    }
  };

  return (
    <div className="gift-section">
      <div
        ref={stageRef}
        className={`gift-stage${isOpen ? " open" : ""}`}
        role="button"
        tabIndex={0}
        aria-label="Mở hộp quà"
        onClick={toggleGift}
        onKeyDown={handleKeyDown}
      >
        <div className="bouquet">
          <Bouquet />
        </div>
        <div className="gift-box">
          <div className="box-lid" />
          <div className="box-body">
            <div className="ribbon-v" />
            <div className="ribbon-h" />
          </div>
          <div className="bow">🎀</div>
        </div>
      </div>
      <div className="hint">{hint}</div>
    </div>
  );
}
