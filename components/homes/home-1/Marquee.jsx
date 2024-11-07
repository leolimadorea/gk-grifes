import { marqueeItems } from "@/data/marquees";

export default function Marquee() {
  return (
    <div className="tf-marquee" style={{ backgroundColor: "#DA781F" }}>
      <div className="wrap-marquee">
        {marqueeItems.map((item, index) => (
          <div className="marquee-item" key={index}>
            <div className="icon">
              <img src="/videos/small.svg" alt="" style={{ width: "80px" }} />
            </div>
            <p className="text">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
