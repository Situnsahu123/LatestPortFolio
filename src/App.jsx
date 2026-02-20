import { useState, useEffect, useRef, useCallback } from "react";
import profileImg from "./assets/profile.jpeg";

/* ─── DATA ──────────────────────────────────────────────────────────────────── */
const DATA = {
    name: "Situn Sahu",
    title: "Full Stack Developer",
    email: "sahusitun92@gmail.com",
    phone: "+91 9321496195",
    location: "Mumbai, India",
    bio: "Passionate full-stack developer crafting beautiful, performant web applications. Specialised in creating responsive solutions that users love.",
    github: "https://github.com/Situnsahu123",
    linkedin: "https://www.linkedin.com/in/situn-sahu/",
    skills: {
        Frontend: ["React", "Angular", "TypeScript", "CSS3", "Responsive Design"],
        Backend: ["Node.js", "Express", "MongoDB", "RESTful APIs", "Authentication"],
        "Tools & DevOps": ["Git", "Docker", "AWS", "Webpack", "Figma"],
    },
    projects: [
        { id: 1, title: "Uber Clone", description: "Revolutionary ride-sharing platform with real-time tracking, payment integration, and intelligent routing algorithms.", tech: ["React", "Node.js", "MongoDB", "Google Maps API"], link: "#" },
        { id: 2, title: "Real-Time Chat App", description: "Modern messaging platform with end-to-end encryption, group chats, and rich media support.", tech: ["Angular", "Socket.io", "Express", "MongoDB"], link: "https://github.com/Situnsahu123/ChatApp" },
        { id: 3, title: "Task Management", description: "Collaborative productivity tool with drag-and-drop boards, real-time updates, and team analytics.", tech: ["React", "Redux", "Node.js", "MongoDB"], link: "https://github.com/Situnsahu123/taskManagement" },
        { id: 4, title: "E-Commerce Platform", description: "Full-featured online store with advanced filtering, personalised recommendations, and secure checkout.", tech: ["React", "Node.js", "Stripe API", "MongoDB"], link: "#" },
        { id: 5, title: "Social Media Dashboard", description: "Analytics powerhouse for monitoring metrics, engaging with audience, and optimising content strategy.", tech: ["React", "Chart.js", "Node.js", "PostgreSQL"], link: "#" },
    ],
    blogs: [
        { id: 1, title: "Building Scalable Apps with React & Node.js", excerpt: "Architecture patterns, state management, and performance optimisation for enterprise apps.", date: "Dec 15, 2024", readTime: "8 min", category: "Backend" },
        { id: 2, title: "Web Performance Optimisation Techniques", excerpt: "Code splitting, lazy loading, caching strategies, and performance monitoring.", date: "Dec 10, 2024", readTime: "6 min", category: "Performance" },
        { id: 3, title: "Authentication & Authorisation in Modern Web Apps", excerpt: "JWT, OAuth 2.0, session management, and multi-factor authentication.", date: "Dec 5, 2024", readTime: "10 min", category: "Security" },
        { id: 4, title: "Getting Started with MongoDB: A Complete Guide", excerpt: "Schema design, indexing strategies, aggregation pipeline, and real-world patterns.", date: "Nov 28, 2024", readTime: "9 min", category: "Database" },
        { id: 5, title: "React Hooks: Simplify Your Component Logic", excerpt: "useState, useEffect, useContext, useReducer, and powerful custom hooks.", date: "Nov 20, 2024", readTime: "7 min", category: "Frontend" },
        { id: 6, title: "CSS Grid vs Flexbox: When to Use Each", excerpt: "Master modern CSS layout techniques and create responsive designs.", date: "Nov 12, 2024", readTime: "5 min", category: "Frontend" },
    ],
};

/* ════════════════════════════════════════════════
   SINGLETON MOUSE TRACKER
════════════════════════════════════════════════ */
const mouse = { x: -9999, y: -9999 };
window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
window.addEventListener("touchmove", e => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }, { passive: true });

/* ════════════════════════════════════════════════
   HOOKS
════════════════════════════════════════════════ */
function useReveal(threshold = 0.08) {
    const ref = useRef(null);
    const [v, setV] = useState(false);
    useEffect(() => {
        const o = new IntersectionObserver(([e]) => setV(e.isIntersecting), { threshold });
        if (ref.current) o.observe(ref.current);
        return () => o.disconnect();
    }, [threshold]);
    return [ref, v];
}

function useInfiniteTypewriter(text, tSpeed = 85, eSpeed = 42, pauseMs = 1800) {
    const [disp, setDisp] = useState("");
    const phase = useRef("typing");
    useEffect(() => {
        let t;
        const tick = () => {
            if (phase.current === "typing") {
                setDisp(p => {
                    const next = text.slice(0, p.length + 1);
                    if (next === text) { phase.current = "pausing"; t = setTimeout(() => { phase.current = "erasing"; tick(); }, pauseMs); return next; }
                    t = setTimeout(tick, tSpeed);
                    return next;
                });
            } else if (phase.current === "erasing") {
                setDisp(p => {
                    const next = p.slice(0, -1);
                    if (next === "") { phase.current = "typing"; t = setTimeout(tick, 400); return next; }
                    t = setTimeout(tick, eSpeed);
                    return next;
                });
            }
        };
        t = setTimeout(tick, 500);
        return () => clearTimeout(t);
    }, [text]);
    return disp;
}

/* ════════════════════════════════════════════════
   FLEE TAG — runs away from cursor with physics
════════════════════════════════════════════════ */
function FleeTag({ children, fleeR = 100, fleeD = 70, className = "" }) {
    const ref = useRef(null);
    const raf = useRef(null);
    const cur = useRef({ x: 0, y: 0 });
    const tgt = useRef({ x: 0, y: 0 });
    const [near, setNear] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const loop = () => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = cx - mouse.x;
            const dy = cy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const isNear = dist < fleeR;
            setNear(isNear);
            if (isNear && dist > 0) {
                const f = (fleeR - dist) / fleeR;
                tgt.current = { x: (dx / dist) * fleeD * f, y: (dy / dist) * fleeD * f };
            } else {
                tgt.current = { x: 0, y: 0 };
            }
            cur.current.x += (tgt.current.x - cur.current.x) * 0.15;
            cur.current.y += (tgt.current.y - cur.current.y) * 0.15;
            if (Math.abs(cur.current.x) > 0.1 || Math.abs(cur.current.y) > 0.1 || isNear) {
                el.style.transform = `translate(${cur.current.x.toFixed(1)}px,${cur.current.y.toFixed(1)}px)`;
            }
            raf.current = requestAnimationFrame(loop);
        };
        raf.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf.current);
    }, [fleeR, fleeD]);

    return (
        <span ref={ref} className={`inline-block will-change-transform select-none font-mono2 text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 cursor-default ${className}`}
            style={{
                background: near ? "rgba(230,57,70,.18)" : "rgba(255,255,255,.03)",
                color: near ? "#ff4d5e" : "#4b5563",
                boxShadow: near
                    ? "0 0 0 1px rgba(230,57,70,.7), 0 0 20px rgba(230,57,70,.4), 0 0 40px rgba(230,57,70,.15)"
                    : "0 0 0 1px rgba(255,255,255,.06)",
                textShadow: near ? "0 0 12px rgba(230,57,70,.9)" : "none",
                transition: "color .15s, background .15s, box-shadow .15s, text-shadow .15s",
            }}
        >
            {children}
        </span>
    );
}

/* ════════════════════════════════════════════════
   REVEAL BLOCK
════════════════════════════════════════════════ */
function Reveal({ children, delay = 0, from = "bottom" }) {
    const [ref, v] = useReveal();
    const map = { bottom: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)" };
    return (
        <div ref={ref} style={{
            opacity: v ? 1 : 0,
            transform: v ? "none" : map[from],
            transition: `opacity .8s ${delay}ms cubic-bezier(.16,1,.3,1), transform .8s ${delay}ms cubic-bezier(.16,1,.3,1)`,
        }}>{children}</div>
    );
}

/* ════════════════════════════════════════════════
   SECTION HEAD
════════════════════════════════════════════════ */
function Head({ num, title }) {
    const [ref, v] = useReveal();
    return (
        <div ref={ref} className="mb-16" style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: "all .7s cubic-bezier(.16,1,.3,1)" }}>
            <div className="font-mono2 text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color: "#e63946" }}>{num}</div>
            <h2 className="font-bebas text-5xl md:text-6xl leading-none tracking-wide text-white"
                style={{ textShadow: "0 0 60px rgba(230,57,70,.12)" }}>{title}</h2>
            <div className="mt-3 h-[1px] w-16" style={{ background: "linear-gradient(90deg,#e63946,transparent)" }} />
        </div>
    );
}

/* ════════════════════════════════════════════════
   PROJECT CARD — dramatic neon, flee tech tags
════════════════════════════════════════════════ */
function ProjectCard({ p, i }) {
    const [rv, setRv] = useState(false);
    const revRef = useRef(null);
    const cardRef = useRef(null);
    const raf = useRef(null);
    const cur = useRef({ x: 0, y: 0 });
    const tgt = useRef({ x: 0, y: 0 });
    const [hov, setHov] = useState(false);
    const [rot, setRot] = useState({ x: 0, y: 0 });
    const isLink = p.link && p.link !== "#";

    useEffect(() => {
        const o = new IntersectionObserver(([e]) => setRv(e.isIntersecting), { threshold: 0.08 });
        if (revRef.current) o.observe(revRef.current);
        return () => o.disconnect();
    }, []);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        const loop = () => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = cx - mouse.x;
            const dy = cy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const R = 180, D = 16;
            tgt.current = dist < R && dist > 0
                ? { x: (dx / dist) * D * ((R - dist) / R), y: (dy / dist) * D * ((R - dist) / R) }
                : { x: 0, y: 0 };
            cur.current.x += (tgt.current.x - cur.current.x) * 0.08;
            cur.current.y += (tgt.current.y - cur.current.y) * 0.08;
            // Only update transform if moving
            if (Math.abs(cur.current.x) > 0.05 || Math.abs(cur.current.y) > 0.05) {
                el.style.transform = `translate(${cur.current.x.toFixed(1)}px,${cur.current.y.toFixed(1)}px) rotateY(${rot.x}deg) rotateX(${rot.y}deg)`;
            }
            raf.current = requestAnimationFrame(loop);
        };
        raf.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf.current);
    }, [rot]);

    const onMM = useCallback((e) => {
        const r = cardRef.current?.getBoundingClientRect();
        if (!r) return;
        const rx = ((e.clientX - r.left) / r.width - 0.5) * 14;
        const ry = ((e.clientY - r.top) / r.height - 0.5) * -14;
        setRot({ x: rx, y: ry });
    }, []);

    return (
        <div ref={revRef} style={{
            opacity: rv ? 1 : 0,
            transform: rv ? "none" : "translateY(32px)",
            transition: `opacity .7s ${i * 90}ms cubic-bezier(.16,1,.3,1), transform .7s ${i * 90}ms cubic-bezier(.16,1,.3,1)`,
        }}>
            <div ref={cardRef}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => { setHov(false); setRot({ x: 0, y: 0 }); }}
                onMouseMove={onMM}
                className="relative p-7 md:p-8 cursor-default overflow-hidden will-change-transform"
                style={{
                    background: hov ? "#0f0f0f" : "#0a0a0a",
                    boxShadow: hov
                        ? "0 0 0 1px rgba(230,57,70,.8), 0 0 50px rgba(230,57,70,.2), 0 25px 80px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.04)"
                        : "0 0 0 1px rgba(255,255,255,.04), 0 4px 24px rgba(0,0,0,.3)",
                    transformStyle: "preserve-3d",
                    transition: "background .2s, box-shadow .2s",
                }}>
                {/* sweeping top glow line */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: "linear-gradient(90deg,transparent 0%,#e63946 40%,#ff6b35 60%,transparent 100%)",
                    opacity: hov ? 1 : 0, transition: "opacity .25s",
                    boxShadow: hov ? "0 0 20px rgba(230,57,70,.8)" : "none",
                }} />
                {/* corner glow */}
                <div style={{
                    position: "absolute", top: 0, right: 0,
                    width: hov ? "120px" : "0px", height: hov ? "120px" : "0px",
                    background: "radial-gradient(circle at top right, rgba(230,57,70,.12) 0%, transparent 70%)",
                    transition: "width .4s, height .4s",
                    pointerEvents: "none",
                }} />

                <div className="font-mono2 text-[9px] tracking-widest uppercase mb-3" style={{ color: "rgba(230,57,70,.5)" }}>
                    {String(i + 1).padStart(2, "0")} / Project
                </div>

                <h3 className="font-bebas text-[2rem] md:text-[2.2rem] tracking-wide leading-none mb-3 transition-all duration-200"
                    style={{ color: hov ? "#e63946" : "#fff", textShadow: hov ? "0 0 30px rgba(230,57,70,.5)" : "none" }}>
                    {p.title}
                </h3>

                <p className="text-sm leading-relaxed mb-6" style={{ color: "#4b5563" }}>{p.description}</p>

                {/* FLEE TECH TAGS */}
                <div className="flex flex-wrap gap-2 mb-7" style={{ minHeight: "2.2rem" }}>
                    {p.tech.map((t, ti) => (
                        <FleeTag key={t} fleeR={90} fleeD={65}>{t}</FleeTag>
                    ))}
                </div>

                {isLink ? (
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono2 text-[10px] font-bold tracking-widest uppercase transition-all duration-200 group"
                        style={{ color: hov ? "#e63946" : "#374151", textShadow: hov ? "0 0 14px rgba(230,57,70,.7)" : "none" }}>
                        View Project
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3" style={{ marginLeft: hov ? "6px" : "2px", transition: "margin .2s" }}>
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </a>
                ) : (
                    <span className="font-mono2 text-[10px] tracking-widest uppercase" style={{ color: "#1f2937" }}>Coming Soon</span>
                )}

                {/* ghost index */}
                <span className="font-bebas absolute bottom-3 right-4 leading-none select-none pointer-events-none"
                    style={{ fontSize: "5.5rem", color: hov ? "rgba(230,57,70,.05)" : "rgba(255,255,255,.02)" }}>
                    {String(i + 1).padStart(2, "0")}
                </span>
            </div>
        </div>
    );
}

/* ════════════════════════════════════════════════
   BLOG CARD
════════════════════════════════════════════════ */
function BlogCard({ b, i }) {
    const [ref, v] = useReveal();
    const [hov, setHov] = useState(false);
    return (
        <article ref={ref}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            className="relative overflow-hidden p-6 cursor-pointer"
            style={{
                opacity: v ? 1 : 0,
                transform: v ? (hov ? "translateY(-5px)" : "none") : "translateY(32px)",
                transition: `opacity .7s ${i * 65}ms cubic-bezier(.16,1,.3,1), transform .3s cubic-bezier(.16,1,.3,1), box-shadow .2s`,
                background: hov ? "#0f0f0f" : "#0a0a0a",
                boxShadow: hov
                    ? "0 0 0 1px rgba(230,57,70,.6), 0 0 36px rgba(230,57,70,.14), 0 16px 48px rgba(0,0,0,.5)"
                    : "0 0 0 1px rgba(255,255,255,.04)",
            }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", opacity: hov ? 1 : 0, transition: "opacity .2s", background: "linear-gradient(90deg,transparent,#e63946,transparent)", boxShadow: "0 0 16px rgba(230,57,70,.7)" }} />
            <div className="font-mono2 text-[9px] tracking-widest uppercase mb-3" style={{ color: "#e63946" }}>{b.category}</div>
            <h3 className="font-bold text-[0.95rem] leading-snug mb-3 transition-all duration-200"
                style={{ color: hov ? "#e63946" : "#e5e7eb", textShadow: hov ? "0 0 20px rgba(230,57,70,.4)" : "none" }}>{b.title}</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#4b5563" }}>{b.excerpt}</p>
            <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                <span className="font-mono2 text-[9px]" style={{ color: "#374151" }}>{b.date} · {b.readTime} read</span>
                <span className="font-mono2 text-[9px] font-bold tracking-widest uppercase flex items-center"
                    style={{ color: "#e63946", gap: hov ? "10px" : "4px", transition: "gap .2s", textShadow: hov ? "0 0 10px rgba(230,57,70,.7)" : "none" }}>
                    Read
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ width: "14px", height: "14px" }}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </span>
            </div>
        </article>
    );
}

/* ════════════════════════════════════════════════
   NEON SKILL TAG (about section, also flees)
════════════════════════════════════════════════ */
function SkillTag({ children }) {
    return <FleeTag fleeR={85} fleeD={55}>{children}</FleeTag>;
}

/* ════════════════════════════════════════════════
   ICON BUTTON
════════════════════════════════════════════════ */
function IconBtn({ href, children }) {
    const [hov, setHov] = useState(false);
    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            className="w-10 h-10 flex items-center justify-center transition-all duration-150 active:scale-90"
            style={{
                color: hov ? "#e63946" : "#374151",
                boxShadow: hov ? "0 0 0 1px rgba(230,57,70,.6), 0 0 20px rgba(230,57,70,.25)" : "0 0 0 1px rgba(255,255,255,.05)",
                background: hov ? "rgba(230,57,70,.07)" : "transparent",
                textShadow: "none",
                transform: hov ? "scale(1.1)" : "scale(1)",
            }}>
            {children}
        </a>
    );
}

/* ════════════════════════════════════════════════
   SVG ICONS
════════════════════════════════════════════════ */
const Github = () => <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11.05 11.05 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.79.55C20.71 21.38 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5z" /></svg>;
const Linkedin = () => <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>;
const Mail = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 18, height: 18 }}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" /></svg>;
const Phone = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 18, height: 18 }}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 2.69l3-.01a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 10.1a16 16 0 006 6l1.57-1.85a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>;
const Pin = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 18, height: 18 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
const Send = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>;
const Menu = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 24, height: 24 }}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
const Close = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 24, height: 24 }}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;

/* ════════════════════════════════════════════════
   GLOBAL CSS
════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
html{scroll-behavior:smooth}
*,*::before,*::after{box-sizing:border-box}
::-webkit-scrollbar{width:2px}
::-webkit-scrollbar-track{background:#050505}
::-webkit-scrollbar-thumb{background:#e63946;border-radius:1px;box-shadow:0 0 6px rgba(230,57,70,.8)}
.font-bebas{font-family:'Bebas Neue',sans-serif}
.font-mono2{font-family:'DM Mono',monospace}
.font-dm{font-family:'DM Sans',sans-serif}

/* clip btn */
.clip-btn{clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))}

/* image clips */
.img-clip{clip-path:polygon(0 0,83% 0,100% 10%,100% 100%,17% 100%,0 90%)}
.img-bord{clip-path:polygon(0 0,83% 0,100% 10%,100% 100%,17% 100%,0 90%)}

/* hero text anims */
.line-outer{overflow:hidden;display:block}
@keyframes slideUp{from{transform:translateY(110%);opacity:0}to{transform:translateY(0);opacity:1}}
.s1{animation:slideUp .9s .05s cubic-bezier(.16,1,.3,1) both}
.s2{animation:slideUp .9s .2s  cubic-bezier(.16,1,.3,1) both}
.s3{animation:slideUp .9s .35s cubic-bezier(.16,1,.3,1) both}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.f1{animation:fadeUp .9s .55s both}
.f2{animation:fadeUp .9s .7s  both}
.f3{animation:fadeUp .9s .85s both}

/* blink */
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.dot-blink{animation:blink 1.4s infinite}
@keyframes cblink{0%,100%{opacity:1}50%{opacity:0}}
.cur{animation:cblink .75s infinite}

/* grid bg */
.grid-bg{
  background-image:
    linear-gradient(rgba(230,57,70,.018) 1px,transparent 1px),
    linear-gradient(90deg,rgba(230,57,70,.018) 1px,transparent 1px);
  background-size:60px 60px;
}

/* film grain */
body::after{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:9998;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.03'/%3E%3C/svg%3E");
}

/* custom cursor dot */
.cur-dot{
  position:fixed;top:0;left:0;width:6px;height:6px;border-radius:50%;
  background:#e63946;pointer-events:none;z-index:9997;
  box-shadow:0 0 10px rgba(230,57,70,.8),0 0 20px rgba(230,57,70,.4);
  transform:translate(-50%,-50%);
  transition:transform .08s,box-shadow .15s;
}
.cur-ring{
  position:fixed;top:0;left:0;width:36px;height:36px;border-radius:50%;
  border:1px solid rgba(230,57,70,.35);pointer-events:none;z-index:9996;
  transform:translate(-50%,-50%);
  box-shadow:0 0 10px rgba(230,57,70,.1);
}

/* nav link */
.nav-lnk{transition:color .15s,text-shadow .15s}
.nav-lnk:hover{color:#fff!important;text-shadow:0 0 16px rgba(230,57,70,.8)!important}

/* neon input */
.neon-in{outline:none;border:none}
.neon-in:focus{box-shadow:0 0 0 1px rgba(230,57,70,.65),0 0 20px rgba(230,57,70,.18)!important}

/* scroll bounce */
@keyframes bounce{0%,100%{transform:translateY(0) translateX(-50%);opacity:.3}50%{transform:translateY(8px) translateX(-50%);opacity:.8}}
.bounce{animation:bounce 2s infinite}

/* menu anim */
@keyframes mdown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
.manim{animation:mdown .2s cubic-bezier(.16,1,.3,1)}

/* glow pulse on red text */
@keyframes glowPulse{0%,100%{text-shadow:0 0 30px rgba(230,57,70,.4)}50%{text-shadow:0 0 60px rgba(230,57,70,.7),0 0 100px rgba(230,57,70,.3)}}
.glow-pulse{animation:glowPulse 3s infinite}

/* red scan line sweep */
@keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
`;

/* ════════════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════════════ */
function CursorFX() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const ringPos = useRef({ x: -99, y: -99 });
    const raf = useRef(null);

    useEffect(() => {
        const move = (e) => {
            const x = e.clientX, y = e.clientY;
            if (dotRef.current) { dotRef.current.style.left = x + "px"; dotRef.current.style.top = y + "px"; }
        };
        const loop = () => {
            ringPos.current.x += (mouse.x - ringPos.current.x) * 0.1;
            ringPos.current.y += (mouse.y - ringPos.current.y) * 0.1;
            if (ringRef.current) { ringRef.current.style.left = ringPos.current.x + "px"; ringRef.current.style.top = ringPos.current.y + "px"; }
            raf.current = requestAnimationFrame(loop);
        };
        window.addEventListener("mousemove", move, { passive: true });
        raf.current = requestAnimationFrame(loop);
        return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cur-dot" />
            <div ref={ringRef} className="cur-ring" />
        </>
    );
}

/* ════════════════════════════════════════════════
   APP
════════════════════════════════════════════════ */
export default function App() {
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState("");
    const typedName = useInfiniteTypewriter(DATA.name, 80, 42, 1800);

    useEffect(() => {
        const fn = () => {
            setScrolled(window.scrollY > 40);
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
        };
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        try {
            await new Promise(r => setTimeout(r, 1400));
            setStatus("success");
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch { setStatus("error"); }
        setTimeout(() => setStatus(""), 5000);
    };

    const navs = ["Home", "About", "Projects", "Blog", "Contact"];

    return (
        <>
            <style>{CSS}</style>
            <CursorFX />

            <div className="font-dm min-h-screen overflow-x-hidden" style={{ background: "#060606", color: "#fff", cursor: "none" }}>

                {/* PROGRESS */}
                <div className="fixed top-0 left-0 h-[2px] z-[100]"
                    style={{ width: `${progress}%`, background: "linear-gradient(90deg,#e63946,#ff6b35,#e63946)", boxShadow: "0 0 12px rgba(230,57,70,.9), 0 0 24px rgba(230,57,70,.4)", transition: "width .1s" }} />

                {/* NAV */}
                <nav className="fixed top-0 w-full z-50 transition-all duration-300"
                    style={{ background: scrolled ? "rgba(6,6,6,.95)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(230,57,70,.08)" : "none" }}>
                    <div className="max-w-6xl mx-auto px-5 md:px-6 flex items-center justify-between" style={{ height: "64px" }}>
                        <a href="#home" className="font-bebas text-[1.7rem] tracking-widest text-white glow-pulse" style={{ textShadow: "0 0 24px rgba(230,57,70,.6)" }}>
                            SS<span style={{ color: "#e63946" }}>.</span>
                        </a>
                        <ul className="hidden md:flex gap-1 list-none">
                            {navs.map(n => (
                                <li key={n}>
                                    <a href={`#${n.toLowerCase()}`} className="nav-lnk font-mono2 block px-4 py-2 text-[10px] tracking-[0.18em] uppercase" style={{ color: "#4b5563" }}>{n}</a>
                                </li>
                            ))}
                        </ul>
                        <button className="md:hidden p-1 active:scale-90 transition-transform" style={{ color: "#6b7280" }} onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <Close /> : <Menu />}
                        </button>
                    </div>
                    {menuOpen && (
                        <div className="manim md:hidden px-5 pb-4 flex flex-col" style={{ background: "rgba(8,8,8,.98)", borderTop: "1px solid rgba(230,57,70,.07)" }}>
                            {navs.map(n => (
                                <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                                    className="font-mono2 py-3 px-2 text-[10px] tracking-[0.18em] uppercase transition-all"
                                    style={{ color: "#4b5563", borderBottom: "1px solid rgba(255,255,255,.03)" }}
                                    onMouseEnter={e => e.currentTarget.style.color = "#e63946"}
                                    onMouseLeave={e => e.currentTarget.style.color = "#4b5563"}>
                                    {n}
                                </a>
                            ))}
                        </div>
                    )}
                </nav>

                {/* ══ HERO ══ */}
                <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 px-5 md:px-6 grid-bg">
                    {/* ambient glow blob */}
                    <div style={{ position: "absolute", top: "20%", right: "10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(230,57,70,.06) 0%, transparent 70%)", pointerEvents: "none", borderRadius: "50%" }} />

                    <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
                        <div>
                            {/* badge */}
                            <div className="f1 inline-flex items-center gap-2 px-4 py-2 mb-7"
                                style={{ background: "rgba(230,57,70,.06)", boxShadow: "0 0 0 1px rgba(230,57,70,.2)", borderRadius: "0" }}>
                                <span className="w-2 h-2 rounded-full bg-green-400 dot-blink flex-shrink-0" style={{ boxShadow: "0 0 8px rgba(74,222,128,.6)" }} />
                                <span className="font-mono2 text-[10px] tracking-[0.18em] uppercase" style={{ color: "#e63946" }}>Available for work</span>
                            </div>

                            {/* INFINITE TYPEWRITER */}
                            <div className="mb-4" style={{ minHeight: "3.8rem" }}>
                                <span className="font-bebas tracking-widest leading-none glow-pulse"
                                    style={{ fontSize: "clamp(2.2rem,5.5vw,3.5rem)", color: "#e63946" }}>
                                    {typedName}
                                    <span className="cur inline-block ml-1 align-middle" style={{ width: "3px", height: "0.8em", background: "#e63946", boxShadow: "0 0 10px rgba(230,57,70,.9), 0 0 20px rgba(230,57,70,.5)" }} />
                                </span>
                            </div>

                            {/* headline */}
                            <h1 className="font-bebas leading-none tracking-wide mb-7">
                                <span className="line-outer"><span className="s1 block text-white" style={{ fontSize: "clamp(3rem,7.5vw,6.5rem)" }}>Full Stack</span></span>
                                <span className="line-outer"><span className="s2 block" style={{ fontSize: "clamp(3rem,7.5vw,6.5rem)", color: "#e63946", textShadow: "0 0 50px rgba(230,57,70,.5)" }}>Developer</span></span>
                                <span className="line-outer"><span className="s3 block text-white" style={{ fontSize: "clamp(3rem,7.5vw,6.5rem)" }}>&amp; Builder</span></span>
                            </h1>

                            <p className="f1 text-[1rem] md:text-[1.05rem] leading-[1.9] max-w-[460px] mb-10" style={{ color: "#4b5563" }}>{DATA.bio}</p>

                            {/* CTAs */}
                            <div className="f2 flex flex-wrap gap-3 mb-12">
                                <HeroBtn href="#projects" solid>View My Work →</HeroBtn>
                                <HeroBtn href="#contact">Let's Talk</HeroBtn>
                            </div>

                            {/* stats */}
                            <div className="f3 flex gap-8">
                                {[{ n: "5", s: "+", l: "Projects" }, { n: "3", s: "+", l: "Tech Stacks" }, { n: "6", s: "mo", l: "Experience" }].map(({ n, s, l }) => (
                                    <div key={l}>
                                        <div className="font-bebas leading-none tracking-wide" style={{ fontSize: "clamp(2rem,4vw,2.8rem)", color: "#fff" }}>
                                            {n}<span style={{ color: "#e63946" }}>{s}</span>
                                        </div>
                                        <div className="font-mono2 text-[9px] tracking-[0.16em] uppercase mt-1" style={{ color: "#374151" }}>{l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* profile desktop */}
                        <div className="hidden md:flex justify-center items-center relative">
                            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(230,57,70,.07) 0%, transparent 70%)", pointerEvents: "none" }} />
                            <span className="font-bebas absolute -top-4 -right-4 leading-none select-none pointer-events-none" style={{ fontSize: "9rem", color: "rgba(230,57,70,.04)" }}>01</span>
                            <div className="relative" style={{ width: "350px", height: "420px" }}>
                                <div className="absolute img-bord" style={{ inset: "-10px", boxShadow: "0 0 0 1px rgba(230,57,70,.2), 0 0 40px rgba(230,57,70,.08)" }} />
                                <img src={profileImg} alt={DATA.name} className="img-clip w-full h-full object-cover object-top"
                                    style={{ filter: "grayscale(20%) contrast(1.05)", transition: "filter .5s" }}
                                    onMouseEnter={e => e.currentTarget.style.filter = "grayscale(0%) contrast(1.05)"}
                                    onMouseLeave={e => e.currentTarget.style.filter = "grayscale(20%) contrast(1.05)"} />
                                {/* name badge */}
                                <div className="absolute flex items-center gap-3 px-4 py-3"
                                    style={{ bottom: "-22px", left: "-24px", background: "#101010", boxShadow: "0 0 0 1px rgba(255,255,255,.06), 0 0 30px rgba(0,0,0,.8), 0 0 20px rgba(230,57,70,.05)" }}>
                                    <span className="w-2 h-2 rounded-full bg-green-400 dot-blink" style={{ boxShadow: "0 0 8px rgba(74,222,128,.7)" }} />
                                    <div>
                                        <div className="font-bold text-xs tracking-wide text-white">{DATA.name}</div>
                                        <div className="font-mono2 text-[9px] tracking-widest uppercase mt-0.5" style={{ color: "#374151" }}>{DATA.title}</div>
                                    </div>
                                </div>
                                {/* city */}
                                <div className="absolute px-3 py-1.5" style={{ top: "-16px", right: "-16px", background: "rgba(230,57,70,.08)", boxShadow: "0 0 0 1px rgba(230,57,70,.25), 0 0 20px rgba(230,57,70,.08)" }}>
                                    <span className="font-mono2 text-[9px] tracking-widest uppercase" style={{ color: "#e63946" }}>📍 Mumbai, IN</span>
                                </div>
                            </div>
                        </div>

                        {/* profile mobile */}
                        <div className="md:hidden flex justify-center">
                            <div className="relative" style={{ width: "220px", height: "260px" }}>
                                <div className="absolute img-bord" style={{ inset: "-6px", boxShadow: "0 0 0 1px rgba(230,57,70,.18)" }} />
                                <img src={profileImg} alt={DATA.name} className="img-clip w-full h-full object-cover object-top" />
                            </div>
                        </div>
                    </div>

                    {/* scroll indicator */}
                    <div className="bounce absolute bottom-8" style={{ left: "50%", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                        <span className="font-mono2 text-[8px] tracking-widest uppercase" style={{ color: "#1f2937" }}>Scroll</span>
                        <svg style={{ width: 16, height: 16, color: "#374151" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                    </div>
                </section>

                {/* ══ ABOUT ══ */}
                <section id="about" className="py-24 md:py-28 px-5 md:px-6" style={{ background: "#070707" }}>
                    <div className="max-w-6xl mx-auto">
                        <Head num="02" title="About Me" />
                        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                            <Reveal delay={0} from="left">
                                <div className="space-y-5 text-[1rem] leading-[1.9]" style={{ color: "#4b5563" }}>
                                    <p>I'm <strong className="text-white font-semibold">Situn Sahu</strong>, a full-stack developer based in <strong className="text-white font-semibold">Mumbai, India</strong>. I build end-to-end web applications with a focus on clean architecture, smooth UX, and performance.</p>
                                    <p>My stack spans React, Angular, Node.js, and MongoDB — I move between frontend pixel work and backend API design without missing a beat.</p>
                                    <p>Passionate about open source and sharing knowledge through articles and side projects.</p>
                                    <div className="flex gap-2 pt-2">
                                        <IconBtn href={DATA.github}><Github /></IconBtn>
                                        <IconBtn href={DATA.linkedin}><Linkedin /></IconBtn>
                                        <IconBtn href={`mailto:${DATA.email}`}><Mail /></IconBtn>
                                    </div>
                                </div>
                            </Reveal>
                            <Reveal delay={120} from="right">
                                <div className="space-y-8">
                                    {Object.entries(DATA.skills).map(([cat, tags]) => (
                                        <div key={cat}>
                                            <div className="font-mono2 text-[9px] tracking-[0.2em] uppercase mb-3 flex items-center gap-3" style={{ color: "#e63946" }}>
                                                {cat}
                                                <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg,rgba(230,57,70,.25),transparent)" }} />
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {tags.map(t => <SkillTag key={t}>{t}</SkillTag>)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* ══ PROJECTS ══ */}
                <section id="projects" className="py-24 md:py-28 px-5 md:px-6 grid-bg" style={{ background: "#060606" }}>
                    <div className="max-w-6xl mx-auto">
                        <Head num="03" title="Selected Projects" />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {DATA.projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
                        </div>
                    </div>
                </section>

                {/* ══ BLOG ══ */}
                <section id="blog" className="py-24 md:py-28 px-5 md:px-6" style={{ background: "#070707" }}>
                    <div className="max-w-6xl mx-auto">
                        <Head num="04" title="Writing" />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {DATA.blogs.map((b, i) => <BlogCard key={b.id} b={b} i={i} />)}
                        </div>
                    </div>
                </section>

                {/* ══ CONTACT ══ */}
                <section id="contact" className="py-24 md:py-28 px-5 md:px-6 grid-bg" style={{ background: "#060606" }}>
                    <div className="max-w-6xl mx-auto">
                        <Head num="05" title="Get in Touch" />
                        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
                            <Reveal delay={0} from="left">
                                <p className="text-[1rem] leading-relaxed mb-10" style={{ color: "#4b5563" }}>
                                    Have a project in mind? I'm always open to discussing new opportunities, collaborations, or interesting ideas.
                                </p>
                                <div className="flex flex-col gap-3 mb-9">
                                    {[
                                        { Icon: Mail, label: "Email", value: DATA.email, href: `mailto:${DATA.email}` },
                                        { Icon: Phone, label: "Phone", value: DATA.phone, href: `tel:${DATA.phone}` },
                                        { Icon: Pin, label: "Location", value: DATA.location },
                                    ].map(({ Icon, label, value, href }) => (
                                        <ContactRow key={label} Icon={Icon} label={label} value={value} href={href} />
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <IconBtn href={DATA.github}><Github /></IconBtn>
                                    <IconBtn href={DATA.linkedin}><Linkedin /></IconBtn>
                                    <IconBtn href={`mailto:${DATA.email}`}><Mail /></IconBtn>
                                </div>
                            </Reveal>

                            <Reveal delay={120} from="right">
                                <form onSubmit={submit} className="flex flex-col gap-4">
                                    {status === "success" && <StatusMsg color="#4ade80" bg="rgba(74,222,128,.06)">✓ Message sent — I'll get back to you soon.</StatusMsg>}
                                    {status === "error" && <StatusMsg color="#e63946" bg="rgba(230,57,70,.06)">✕ Something went wrong. Please try again.</StatusMsg>}
                                    {[
                                        { id: "name", label: "Name", type: "text", ph: "Your name" },
                                        { id: "email", label: "Email", type: "email", ph: "you@example.com" },
                                        { id: "subject", label: "Subject", type: "text", ph: "Project inquiry" },
                                    ].map(({ id, label, type, ph }) => (
                                        <div key={id} className="flex flex-col gap-1.5">
                                            <label className="font-mono2 text-[9px] tracking-widest uppercase" style={{ color: "#374151" }}>{label}</label>
                                            <input type={type} required placeholder={ph} value={form[id]} disabled={status === "sending"}
                                                onChange={e => setForm({ ...form, [id]: e.target.value })}
                                                className="neon-in w-full text-white text-sm px-4 py-3"
                                                style={{ background: "#0e0e0e", boxShadow: "0 0 0 1px rgba(255,255,255,.05)", color: "#fff", fontFamily: "'DM Sans',sans-serif" }} />
                                        </div>
                                    ))}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="font-mono2 text-[9px] tracking-widest uppercase" style={{ color: "#374151" }}>Message</label>
                                        <textarea required rows={5} placeholder="Tell me about your project..." value={form.message} disabled={status === "sending"}
                                            onChange={e => setForm({ ...form, message: e.target.value })}
                                            className="neon-in w-full text-white text-sm px-4 py-3 resize-none"
                                            style={{ background: "#0e0e0e", boxShadow: "0 0 0 1px rgba(255,255,255,.05)", fontFamily: "'DM Sans',sans-serif" }} />
                                    </div>
                                    <SubmitBtn sending={status === "sending"} />
                                </form>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="py-6 px-5 md:px-6" style={{ borderTop: "1px solid rgba(255,255,255,.03)" }}>
                    <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
                        <p className="font-mono2 text-[9px] tracking-widest uppercase" style={{ color: "#1f2937" }}>
                            © 2024 <span style={{ color: "#e63946" }}>Situn Sahu</span>. Built with React &amp; Tailwind.
                        </p>
                        <a href="#home" className="font-mono2 text-[9px] tracking-widest uppercase transition-all duration-150 active:scale-95"
                            style={{ color: "#1f2937" }}
                            onMouseEnter={e => { e.currentTarget.style.color = "#e63946"; e.currentTarget.style.textShadow = "0 0 12px rgba(230,57,70,.7)"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "#1f2937"; e.currentTarget.style.textShadow = "none"; }}>
                            Back to top ↑
                        </a>
                    </div>
                </footer>
            </div>
        </>
    );
}

/* ════════════════════════════════════════════════
   SMALL HELPER COMPONENTS
════════════════════════════════════════════════ */
function HeroBtn({ href, children, solid = false }) {
    const [hov, setHov] = useState(false);
    return (
        <a href={href}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            className="clip-btn inline-flex items-center gap-2 px-7 py-3.5 font-bold text-[11px] tracking-[0.14em] uppercase transition-all duration-150 active:scale-95"
            style={{
                background: solid ? "#e63946" : "transparent",
                color: "#fff",
                boxShadow: solid
                    ? hov ? "0 0 0 1px #e63946, 0 0 40px rgba(230,57,70,.7), 0 0 80px rgba(230,57,70,.3)" : "0 0 0 1px rgba(230,57,70,.5), 0 0 20px rgba(230,57,70,.2)"
                    : hov ? "0 0 0 1px rgba(230,57,70,.7), 0 0 24px rgba(230,57,70,.2)" : "0 0 0 1px rgba(255,255,255,.08)",
                transform: hov ? "translateY(-2px)" : "none",
                textShadow: (solid && hov) ? "0 0 12px rgba(255,255,255,.5)" : "none",
            }}>
            {children}
        </a>
    );
}

function ContactRow({ Icon, label, value, href }) {
    const [hov, setHov] = useState(false);
    const content = (
        <>
            <span style={{ color: "#e63946" }}><Icon /></span>
            <div>
                <div className="font-mono2 text-[9px] tracking-widest uppercase" style={{ color: "#374151" }}>{label}</div>
                <div className="font-medium text-sm mt-0.5 text-white">{value}</div>
            </div>
        </>
    );
    const s = {
        display: "flex", alignItems: "flex-start", gap: "16px", padding: "16px", cursor: href ? "pointer" : "default",
        background: hov ? "rgba(230,57,70,.05)" : "#0e0e0e",
        boxShadow: hov ? "0 0 0 1px rgba(230,57,70,.55), 0 0 28px rgba(230,57,70,.12)" : "0 0 0 1px rgba(255,255,255,.04)",
        transition: "all .15s",
    };
    return href
        ? <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={s}>{content}</a>
        : <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={s}>{content}</div>;
}

function StatusMsg({ children, color, bg }) {
    return (
        <div className="p-4 text-sm font-medium font-mono2"
            style={{ color, background: bg, boxShadow: `0 0 0 1px ${color}44` }}>
            {children}
        </div>
    );
}

function SubmitBtn({ sending }) {
    const [hov, setHov] = useState(false);
    return (
        <button type="submit" disabled={sending}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            className="clip-btn self-start inline-flex items-center gap-2 px-7 py-3.5 font-bold text-[11px] tracking-[0.14em] uppercase transition-all duration-150 active:scale-95 disabled:opacity-50"
            style={{
                background: "#e63946",
                color: "#fff",
                boxShadow: hov ? "0 0 0 1px #e63946, 0 0 40px rgba(230,57,70,.7), 0 0 80px rgba(230,57,70,.3)" : "0 0 0 1px rgba(230,57,70,.4), 0 0 16px rgba(230,57,70,.2)",
                transform: hov ? "translateY(-2px)" : "none",
                textShadow: hov ? "0 0 10px rgba(255,255,255,.4)" : "none",
            }}>
            {sending ? "Sending…" : <><span>Send Message</span><Send /></>}
        </button>
    );
}