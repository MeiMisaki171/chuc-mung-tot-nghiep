import { CONFIG } from "./config";
import { useConfetti } from "./hooks/useConfetti";
import GiftBox from "./components/GiftBox";
import vnuLogo from "./assets/vnu-hus-logo.jpg";
import gradPhoto from "./assets/graduation-photo.jpg";
import "./App.css";

const FLOAT_DECOS = [
  { emoji: "🎉", style: { top: "6%", left: "2%", animationDelay: "0s" } },
  { emoji: "✨", style: { top: "2%", right: "4%", animationDelay: "0.8s" } },
  { emoji: "🎊", style: { top: "38%", left: "-2%", animationDelay: "1.4s" } },
  { emoji: "📜", style: { top: "60%", right: "0%", animationDelay: "2s" } },
];

function App() {
  const { canvasRef, spawnParticles } = useConfetti();
  const { tenBan, nganhHoc, lop, tenNguoiGui } = CONFIG;

  const handleGiftOpen = (originXRatio) => {
    spawnParticles(originXRatio, 30);
  };

  return (
    <>
      <canvas ref={canvasRef} className="confetti-canvas" />

      <div className="stage">
        {FLOAT_DECOS.map((deco) => (
          <span
            key={deco.emoji + deco.style.animationDelay}
            className="float-deco"
            style={deco.style}
          >
            {deco.emoji}
          </span>
        ))}

        <header className="school-header">
          <img
            src={vnuLogo}
            alt="Logo Trường ĐHKH Tự nhiên - VNU-HUS"
            className="school-logo"
          />
          <div className="school-info">
            <span className="school-name">TRƯỜNG ĐH KHOA HỌC TỰ NHIÊN</span>
            <span className="school-sub">VNU-HUS · {lop}</span>
          </div>
        </header>

        <div className="hero">
          <div className="photo-wrap">
            <img
              src={gradPhoto}
              alt={`${tenBan} trong ngày tốt nghiệp`}
              className="grad-photo"
            />
            <span className="photo-badge">🎓</span>
          </div>
          <p className="major-tag">{nganhHoc}</p>
        </div>

        <div className="eyebrow">Lễ tốt nghiệp</div>

        <h1>
          Chúc mừng <span className="highlight">{tenBan}</span>
          <br />
          tốt nghiệp!
        </h1>
        <p className="subtitle">
          Bao đêm thức khuya, bao kỳ thi căng thẳng — hôm nay cuối cùng cũng đã
          hái được trái ngọt. Một chương mới, thật rực rỡ, đang chờ phía trước!
        </p>

        <div className="badges">
          <span className="badge b1">🎯 Nỗ lực không ngừng</span>
          <span className="badge b2">💪 Vượt qua mọi thử thách</span>
          <span className="badge b3">🌟 Xứng đáng tự hào</span>
        </div>

        <div className="card">
          <p>
            Gửi <strong>{tenBan}</strong>,
          </p>
          <p>
            Chúc em luôn giữ vững sự nhiệt huyết, tự tin bước tiếp trên những
            chặng đường phía trước, và gặt hái thật nhiều thành công trong công
            việc cũng như cuộc sống. 🎉
          </p>
          <div className="signature">— From {tenNguoiGui}! 💐</div>
        </div>

        <GiftBox onOpen={handleGiftOpen} />
      </div>
    </>
  );
}

export default App;
