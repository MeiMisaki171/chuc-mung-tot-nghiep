import bouquetImg from '../assets/bouquet.png'

export default function Bouquet() {
  return (
    <img
      src={bouquetImg}
      alt=""
      aria-hidden="true"
      className="bouquet-img"
      draggable={false}
    />
  )
}
