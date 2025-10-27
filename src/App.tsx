import React from "react";
import { useEffect, useState, useRef } from "react";

function SectionCard({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const delayClass = `fade-delay-${delay}`;
  return (
    <article
      className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30 transition-transform duration-300 card-hover fade-up ${delayClass}`}
    >
      <h3 className="text-xl font-semibold text-slate-800 mb-3">{title}</h3>
      <div className="text-slate-700 prose prose-slate prose-custom">
        {children}
      </div>
    </article>
  );
}

function IconLight() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="lg1" x1="0" x2="1">
          <stop offset="0" stopColor="#FFD54F" />
          <stop offset="1" stopColor="#FFC107" />
        </linearGradient>
      </defs>
      <path d="M9 21h6" stroke="#6b4" strokeWidth="0" fill="none" />
      <path
        d="M12 3a5 5 0 00-3 9v2a1 1 0 001 1h4a1 1 0 001-1v-2a5 5 0 00-3-9z"
        fill="url(#lg1)"
      />
      <circle cx="12" cy="9" r="1.2" fill="#fff" opacity="0.9" />
    </svg>
  );
}

function IconGear() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="lg2" x1="0" x2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <path d="M12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z" fill="url(#lg2)" />
      <path
        d="M19.4 13a7.2 7.2 0 000-2l2.1-1.6a.5.5 0 00.12-.64l-2-3.5a.5.5 0 00-.6-.22l-2.5 1a7.6 7.6 0 00-1.7-.98L14.6 2.4a.5.5 0 00-.5-.4h-4a.5.5 0 00-.5.4L8.6 5.4c-.6.2-1.1.5-1.7.98l-2.5-1a.5.5 0 00-.6.22l-2 3.5a.5.5 0 00.12.64L4.6 11a7.2 7.2 0 000 2L2.5 14.6a.5.5 0 00-.12.64l2 3.5c.14.24.45.34.7.22l2.5-1c.5.4 1.1.7 1.7.98l.9 2.9c.08.25.32.4.58.4h4c.26 0 .5-.15.58-.4l.9-2.9c.6-.2 1.2-.5 1.7-.98l2.5 1c.25.12.56.02.7-.22l2-3.5a.5.5 0 00-.12-.64L19.4 13z"
        fill="#D97706"
        opacity="0.9"
      />
    </svg>
  );
}

function IconChart() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="lg3" x1="0" x2="1">
          <stop offset="0" stopColor="#F87171" />
          <stop offset="1" stopColor="#C62828" />
        </linearGradient>
      </defs>
      <rect x="3" y="12" width="3" height="7" rx="0.5" fill="url(#lg3)" />
      <rect x="9" y="8" width="3" height="11" rx="0.5" fill="url(#lg3)" />
      <rect x="15" y="4" width="3" height="15" rx="0.5" fill="url(#lg3)" />
    </svg>
  );
}

export default function App() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // parallax mouse move
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    function onMove(e: MouseEvent) {
      const el2 = containerRef.current;
      if (!el2) return;
      const rect = el2.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el2.style.setProperty("--gear-x", String(x * 0.03));
        el2.style.setProperty("--gear-y", String(y * 0.02));
      });
    }
    function onScroll() {
      const el2 = containerRef.current;
      if (!el2) return;
      const s = window.scrollY || window.pageYOffset;
      el2.style.setProperty("--gear-scroll", String(s * 0.02));
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // quiz state
  const [answer, setAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  function handleAnswer(a: string) {
    setAnswer(a);
    setShowHint(true);
    setTimeout(() => setShowHint(false), 2200);
  }

  return (
    <div
      ref={containerRef}
      className={`${
        mounted ? "is-mounted" : ""
      } min-h-screen site-hero relative overflow-hidden py-20 px-6 sm:px-8 lg:px-16`}
      style={{
        // expose css vars for parallax
        ["--gear-x" as any]: 0,
        ["--gear-y" as any]: 0,
        ["--gear-scroll" as any]: 0,
      }}
    >
      {/* decorative blobs */}
      {/* animated SVG gears (parallax + rotate) */}
      <div className="hero-gears parallax-transform" aria-hidden>
        <svg
          className="gear-shadow gear--slow"
          width="420"
          height="420"
          viewBox="0 0 420 420"
          style={{
            position: "absolute",
            left: "-6%",
            top: "-8%",
            transform: `translate3d(calc(var(--gear-x) * -1px), calc(var(--gear-y) * -1px),0) rotate(0deg)`,
          }}
        >
          <g>
            <circle cx="210" cy="210" r="100" fill="url(#gGear1)" />
          </g>
          <defs>
            <linearGradient id="gGear1" x1="0" x2="1">
              <stop offset="0" stopColor="#ffd54f" />
              <stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          className="gear--fast"
          width="180"
          height="180"
          viewBox="0 0 180 180"
          style={{
            position: "absolute",
            right: "6%",
            top: "6%",
            transform: `translate3d(calc(var(--gear-x) * 0.5px), calc(var(--gear-y) * 0.6px),0)`,
          }}
        >
          <defs>
            <linearGradient id="gGear2" x1="0" x2="1">
              <stop offset="0" stopColor="#ef4444" />
              <stop offset="1" stopColor="#b91c1c" />
            </linearGradient>
          </defs>
          <g>
            <path
              d="M90 45a45 45 0 100 90 45 45 0 000-90z"
              fill="url(#gGear2)"
            />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg decor-accent flex items-center justify-center text-white font-bold shadow-md">
              ML
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 gradient-text">
                Chương 4 — Cạnh tranh và độc quyền
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Trong nền kinh tế thị trường — nội dung môn MacLenin
              </p>
            </div>
          </div>

          <nav className="text-sm text-slate-600 hidden md:flex gap-6">
            <a href="#key" className="hover:text-slate-900">
              Khái niệm
            </a>
            <a href="#reasons" className="hover:text-slate-900">
              Nguyên nhân
            </a>
            <a href="#state" className="hover:text-slate-900">
              Độc quyền nhà nước
            </a>
          </nav>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <section className="lg:col-span-2">
            <div className="bg-gradient-to-b from-white to-slate-50 p-8 rounded-3xl shadow-xl border border-white/40">
              {/* HERO */}
              <div className="mb-6">
                <div className="rounded-xl p-6 bg-gradient-to-r from-white to-transparent border border-white/30 shadow-sm">
                  <h2 className="text-4xl md:text-5xl font-extrabold gradient-text leading-tight">
                    CẠNH TRANH VÀ ĐỘC QUYỀN
                  </h2>
                  <p className="mt-2 text-sm text-slate-700">
                    Chương 4 — Triết học Mác–Lênin • Tinh thần: mâu thuẫn nhưng
                    thống nhất
                  </p>
                  <blockquote className="mt-6 italic font-medium text-slate-800 text-lg prose-custom">
                    “Cạnh tranh và độc quyền là hai mặt song song trong sự phát
                    triển của kinh tế thị trường.”
                  </blockquote>
                </div>
                {/* subtle gears background (SVG) */}
                <div className="mt-4 pointer-events-none opacity-60">
                  <svg
                    className="w-full h-28"
                    viewBox="0 0 1200 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="g2" x1="0" x2="1">
                        <stop offset="0" stopColor="#ffe9d6" />
                        <stop offset="1" stopColor="#ffd54f" />
                      </linearGradient>
                    </defs>
                    <g transform="translate(0,10)" fill="url(#g2)">
                      <circle cx="80" cy="60" r="18" />
                      <g transform="translate(260,30) rotate(0)">
                        <path
                          d="M0 0c12 0 22 10 22 22s-10 22-22 22-22-10-22-22S-12 0 0 0z"
                          opacity="0.15"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4 fade-up fade-delay-1">
                Tóm tắt nội dung
              </h3>
              <p className="text-slate-700 mb-6 fade-up fade-delay-2">
                Bài viết trình bày bản chất cạnh tranh, nguyên nhân dẫn tới độc
                quyền, hình thái độc quyền nhà nước và tác động hai mặt của độc
                quyền trong nền kinh tế thị trường định hướng xã hội chủ nghĩa.
              </p>

              <SectionCard title="Khái niệm cơ bản" delay={1}>
                <ul className="space-y-2">
                  <li>
                    • <strong>Cạnh tranh</strong>: Sự ganh đua giữa các chủ thể
                    kinh tế nhằm giành thị phần, lợi nhuận và nguồn lực.
                  </li>
                  <li>
                    • <strong>Độc quyền</strong>: Khi một hoặc một nhóm doanh
                    nghiệp kiểm soát phần lớn thị trường, ảnh hưởng đến giá cả
                    và nguồn cung.
                  </li>
                </ul>
              </SectionCard>

              <div className="mt-6 grid gap-6">
                <SectionCard title="Nguyên nhân hình thành độc quyền" delay={2}>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      Phát triển lực lượng sản xuất: xuất hiện doanh nghiệp quy
                      mô lớn, công nghệ cao.
                    </li>
                    <li>
                      Cạnh tranh gay gắt: doanh nghiệp nhỏ bị loại, sáp nhập
                      thành doanh nghiệp lớn.
                    </li>
                    <li>
                      Khủng hoảng kinh tế và hệ thống tín dụng: tập trung tư bản
                      qua mua lại, hợp nhất.
                    </li>
                  </ol>
                </SectionCard>

                <SectionCard title="Độc quyền nhà nước" delay={3}>
                  <p>
                    Đây là mô hình khi Nhà nước nắm giữ hoặc phối hợp với các
                    tập đoàn để chi phối các ngành then chốt, đảm bảo ổn định và
                    phát triển chiến lược (ví dụ: điện lực, đường sắt, dầu khí).
                  </p>
                </SectionCard>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            {/* Section 1 cards (Đổi mới, Năng suất, Tăng trưởng) */}
            <div className="p-6 rounded-2xl bg-white/95 shadow-lg border border-white/30 fade-up fade-delay-1">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">
                Bản chất: Động lực của cạnh tranh
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="p-4 rounded-xl bg-white card-3d card-hover">
                  <div className="text-2xl mb-2">💡</div>
                  <div className="font-semibold">Đổi mới</div>
                  <div className="text-sm text-slate-600">
                    Sáng tạo công nghệ và mô hình kinh doanh.
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white card-3d card-hover">
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="font-semibold">Năng suất</div>
                  <div className="text-sm text-slate-600">
                    Tối ưu hóa quy trình và chi phí.
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white card-3d card-hover">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="font-semibold">Tăng trưởng</div>
                  <div className="text-sm text-slate-600">
                    Mở rộng thị phần, nâng cao mức sống.
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline: Sự hình thành độc quyền */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-white to-gray-50 shadow-lg border border-white/30 fade-up fade-delay-2">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">
                Sự hình thành độc quyền
              </h4>
              <div className="overflow-x-auto timeline -mx-4 px-4 py-2 flex gap-6">
                {[
                  [
                    "Phát triển lực lượng sản xuất",
                    "Khoa học-kỹ thuật, tập trung vốn",
                  ],
                  [
                    "Cạnh tranh gay gắt",
                    "Doanh nghiệp nhỏ bị loại hoặc sáp nhập",
                  ],
                  [
                    "Khủng hoảng kinh tế",
                    "Mua lại, hợp nhất, tập trung tư bản",
                  ],
                  [
                    "Hình thành độc quyền",
                    "Doanh nghiệp lớn kiểm soát thị trường",
                  ],
                ].map((it, idx) => (
                  <div
                    key={idx}
                    className="min-w-[220px] p-4 rounded-2xl bg-white/95 shadow-sm timeline-item"
                  >
                    <div className="font-semibold text-sm mb-2">{it[0]}</div>
                    <div className="text-xs text-slate-600">{it[1]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monopoly State infographic */}
            <div className="p-6 rounded-2xl bg-red-900/6 shadow-lg border border-white/10 fade-up fade-delay-3">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">
                Độc quyền nhà nước
              </h4>
              <div className="rounded-lg p-4 bg-gradient-to-b from-red-50 to-white">
                <svg viewBox="0 0 300 160" className="w-full h-40">
                  <defs>
                    <linearGradient id="rg" x1="0" x2="1">
                      <stop offset="0" stopColor="#C62828" />
                      <stop offset="1" stopColor="#FFD54F" />
                    </linearGradient>
                  </defs>
                  {/* nodes */}
                  <line
                    x1="150"
                    y1="20"
                    x2="80"
                    y2="80"
                    stroke="#C62828"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                  <line
                    x1="150"
                    y1="20"
                    x2="220"
                    y2="80"
                    stroke="#C62828"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                  <circle cx="150" cy="20" r="14" fill="url(#rg)" />
                  <circle
                    cx="80"
                    cy="80"
                    r="10"
                    fill="#C62828"
                    className="net-node"
                  />
                  <circle
                    cx="220"
                    cy="80"
                    r="10"
                    fill="#C62828"
                    className="net-node"
                  />
                  <text
                    x="150"
                    y="18"
                    textAnchor="middle"
                    fontSize="9"
                    fill="#fff"
                    fontFamily="Montserrat"
                  >
                    NHÀ NƯỚC
                  </text>
                </svg>
                <div className="mt-3 text-sm text-slate-700">
                  Mối quan hệ điều tiết: Nhà nước ↔ Doanh nghiệp ↔ Nhân dân
                </div>
              </div>
            </div>

            {/* Interactive quiz prompt */}
            <div className="p-6 rounded-2xl bg-white/95 shadow-lg border border-white/30 fade-up fade-delay-1">
              <h4 className="text-lg font-semibold text-slate-800 mb-3">
                Bài học tư duy — Hỏi & Đáp
              </h4>
              <div className="text-sm text-slate-700 mb-3">
                Nếu một doanh nghiệp kiểm soát toàn bộ thị trường, điều gì sẽ
                xảy ra với người tiêu dùng?
              </div>
              <div className="grid gap-3">
                {[
                  ["Giá giảm nhờ quy mô", "Không đúng"],
                  ["Giá tăng do thiếu cạnh tranh", "Đúng"],
                  ["Chất lượng luôn được cải thiện", "Không chắc"],
                ].map((o, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(o[1])}
                    className={`quiz-option text-left p-3 rounded-lg border ${
                      answer === o[1]
                        ? "bg-red-50 border-red-300"
                        : "bg-white border-gray-100"
                    }`}
                  >
                    <div className="font-medium">{o[0]}</div>
                  </button>
                ))}
              </div>
              {showHint && (
                <div className="mt-3 text-sm text-slate-800 p-3 rounded-md bg-yellow-50 border border-yellow-200">
                  Đáp án: {answer}
                </div>
              )}
            </div>
          </aside>
        </main>
        {/* Split panel: Tác động của độc quyền (positive vs negative) */}
        <section className="mt-10 fade-up fade-delay-2">
          <div className="split-panel">
            <div className="split-left">
              <h4 className="text-lg font-semibold text-slate-800">
                Tác động tích cực ✅
              </h4>
              <ul className="mt-3 text-slate-700 list-disc pl-5 space-y-2">
                <li>Thúc đẩy nghiên cứu & phát triển, đổi mới công nghệ.</li>
                <li>
                  Tăng năng suất lao động, nâng cao năng lực cạnh tranh quốc
                  gia.
                </li>
                <li>
                  Tạo lợi thế cho các ngành chiến lược (năng lượng, viễn thông).
                </li>
              </ul>
            </div>
            <div className="split-right">
              <h4 className="text-lg font-semibold text-slate-800">
                Tác động tiêu cực ❌
              </h4>
              <ul className="mt-3 text-slate-700 list-disc pl-5 space-y-2">
                <li>Giá cả bị đẩy lên do thiếu cạnh tranh.</li>
                <li>Kìm hãm sáng tạo nếu không có đối thủ thúc đẩy.</li>
                <li>Gia tăng bất bình đẳng và tập trung lợi nhuận.</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center text-slate-700 text-sm fade-up fade-delay-3">
          <blockquote
            className="text-xl md:text-2xl font-medium font-serif italic text-slate-800 mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            “Độc quyền không xóa bỏ cạnh tranh, mà chỉ biến đổi hình thức của
            nó.”
          </blockquote>
          <div className="mb-4">
            Nhóm: [Tên nhóm] • Trường: [Tên trường] • Giảng viên hướng dẫn: [Tên
            GV]
          </div>
        </footer>
      </div>
    </div>
  );
}
