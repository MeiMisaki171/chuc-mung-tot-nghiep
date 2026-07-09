import { CONFIG } from './config'
import { useConfetti } from './hooks/useConfetti'
import GiftBox from './components/GiftBox'
import GraduationCap from './components/GraduationCap'
import './App.css'

const FLOAT_DECOS = [
  { emoji: '🎉', style: { top: '6%', left: '2%', animationDelay: '0s' } },
  { emoji: '✨', style: { top: '2%', right: '4%', animationDelay: '0.8s' } },
  { emoji: '🎊', style: { top: '38%', left: '-2%', animationDelay: '1.4s' } },
  { emoji: '📜', style: { top: '60%', right: '0%', animationDelay: '2s' } },
]

function App() {
  const { canvasRef, burst, spawnParticles } = useConfetti()
  const { tenBan } = CONFIG

  const handleGiftOpen = (originXRatio) => {
    spawnParticles(originXRatio, 30)
  }

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

        <div className="eyebrow">Lễ tốt nghiệp</div>

        <div className="cap-wrap">
          <GraduationCap />
        </div>

        <h1>
          Chúc mừng <span className="highlight">{tenBan}</span>
          <br />
          tốt nghiệp! 🎓
        </h1>
        <p className="subtitle">
          Bao đêm thức khuya, bao kỳ thi căng thẳng — hôm nay cuối cùng cũng đã hái
          được trái ngọt. Một chương mới, thật rực rỡ, đang chờ phía trước!
        </p>

        <div className="badges">
          <span className="badge b1">🎯 Nỗ lực không ngừng</span>
          <span className="badge b2">💪 Vượt qua mọi thử thách</span>
          <span className="badge b3">🌟 Xứng đáng tự hào</span>
        </div>

        <div className="card">
          <p>
            Gửi em <strong>{tenBan}</strong>,
          </p>
          <p>
            Nghe tin em tốt nghiệp đại học, mình thật lòng rất vui và tự hào thay
            cho em. Đây là một cột mốc không hề dễ dàng, và em đã hoàn thành nó thật
            xứng đáng.
          </p>
          <p>
            Chúc em luôn giữ vững sự nhiệt huyết, tự tin bước tiếp trên những chặng
            đường phía trước, và gặt hái thật nhiều thành công trong công việc cũng
            như cuộc sống. 🎉
          </p>
          <div className="signature">— Chúc mừng em nhé! 💐</div>
        </div>

        <GiftBox onOpen={handleGiftOpen} />

        <button type="button" className="celebrate-btn" onClick={burst}>
          🎊 Bắn thêm pháo hoa!
        </button>
        <div className="hint">
          Trang đã tự bắn pháo hoa rồi, bấm thêm cho vui cũng được 😄
        </div>

        <footer>Trang này được làm thủ công với thật nhiều tình cảm.</footer>
      </div>
    </>
  )
}

export default App
