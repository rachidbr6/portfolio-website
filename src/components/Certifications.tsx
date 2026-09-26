import { useEffect, useRef, useState } from "react";
import { MdArrowOutward, MdClose } from "react-icons/md";
import "./styles/Certifications.css";
import { config } from "../config";
import { lenis } from "./Navbar";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Certifications = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? config.certifications[activeIndex] : null;
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    triggerRef.current = document.activeElement as HTMLElement;
    modalRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      lenis?.start();
      triggerRef.current?.focus();
    };
  }, [active]);

  return (
    <div className="certifications-section section-container" id="certifications">
      <h2>
        Certifications
      </h2>
      <div className="certifications-grid">
        {config.certifications.map((cert, index) => (
          <button
            key={cert.title}
            className="cert-card"
            onClick={() => setActiveIndex(index)}
            data-cursor="disable"
          >
            <div className="cert-card-logo">
              <img src={cert.logo} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="cert-card-info">
              <h4>{cert.title}</h4>
              <p>{cert.issuer}{cert.date ? ` · ${cert.date}` : ""}</p>
            </div>
            <span className="cert-card-icon">
              <MdArrowOutward />
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="cert-modal-overlay"
          onClick={() => setActiveIndex(null)}
          data-cursor="disable"
        >
          <div
            className="cert-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="cert-modal-close"
              onClick={() => setActiveIndex(null)}
              aria-label="Close certificate"
              data-cursor="disable"
            >
              <MdClose />
            </button>
            <img src={active.image} alt={active.title} />
            <div className="cert-modal-footer">
              <div>
                <h4 id="cert-modal-title">{active.title}</h4>
                <p>{active.issuer}{active.date ? ` · ${active.date}` : ""}</p>
              </div>
              {active.verifyUrl && (
                <a
                  href={active.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="disable"
                >
                  Verify <MdArrowOutward />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certifications;
