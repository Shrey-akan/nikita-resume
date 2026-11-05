const bubbles = [
  { size: 88, left: "8%", top: "12%", delay: "0s", duration: "11s" },
  { size: 46, left: "22%", top: "38%", delay: "1.2s", duration: "8s" },
  { size: 120, left: "78%", top: "8%", delay: "0.4s", duration: "13s" },
  { size: 36, left: "68%", top: "32%", delay: "2s", duration: "7s" },
  { size: 70, left: "86%", top: "58%", delay: "0.8s", duration: "10s" },
  { size: 28, left: "14%", top: "72%", delay: "1.6s", duration: "9s" },
  { size: 54, left: "48%", top: "18%", delay: "2.4s", duration: "12s" },
];

export function BubbleField() {
  return (
    <div className="bubble-field pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {bubbles.map((bubble) => (
        <span
          key={`${bubble.left}-${bubble.top}`}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            top: bubble.top,
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
          }}
        />
      ))}
    </div>
  );
}
