import { useState, useEffect, useRef } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const themes = {
  light: {
    bg: "#F7F6F3",
    surface: "#FFFFFF",
    surfaceAlt: "#F0EEE9",
    border: "rgba(0,0,0,0.08)",
    borderMed: "rgba(0,0,0,0.13)",
    text: "#1A1A1A",
    textSub: "#5A5A5A",
    textMuted: "#9A9A9A",
    accent: "#2E8B7A",
    accentBg: "#E6F5F2",
    accentText: "#1D6B5C",
    warn: "#92400E",
    warnBg: "#FEF3C7",
    warnBorder: "#F59E0B",
    red: "#991B1B",
    redBg: "#FEF2F2",
    redBorder: "#FCA5A5",
    amber: "#78350F",
    amberBg: "#FFFBEB",
    amberBorder: "#FCD34D",
    purple: "#4C1D95",
    purpleBg: "#F5F3FF",
    purpleBorder: "#C4B5FD",
    blue: "#1E3A5F",
    blueBg: "#EFF6FF",
    blueBorder: "#BFDBFE",
    green: "#14532D",
    greenBg: "#F0FDF4",
    greenBorder: "#86EFAC",
    amber2: "#7C2D12",
    amber2Bg: "#FFF7ED",
    amber2Border: "#FDBA74",
    teal: "#134E4A",
    tealBg: "#F0FDFA",
    tealBorder: "#99F6E4",
    navBg: "rgba(247,246,243,0.92)",
    tagBg: "rgba(0,0,0,0.06)",
    tagText: "#444",
    toggleBg: "#E5E3DE",
    toggleText: "#444",
    timelineLine: "#D1D5DB",
    progressTrack: "#E5E7EB",
  },
  dark: {
    bg: "#0D0F14",
    surface: "#161A23",
    surfaceAlt: "#1E2330",
    border: "rgba(255,255,255,0.08)",
    borderMed: "rgba(255,255,255,0.14)",
    text: "#EDEAE4",
    textSub: "#9CA3AF",
    textMuted: "#6B7280",
    accent: "#4ECDC4",
    accentBg: "#0F2E2C",
    accentText: "#5FD9D0",
    warn: "#FCD34D",
    warnBg: "#1C1505",
    warnBorder: "#92400E",
    red: "#FCA5A5",
    redBg: "#1C0A0A",
    redBorder: "#7F1D1D",
    amber: "#FCD34D",
    amberBg: "#1C1200",
    amberBorder: "#78350F",
    purple: "#C4B5FD",
    purpleBg: "#1A1030",
    purpleBorder: "#4C1D95",
    blue: "#93C5FD",
    blueBg: "#0A1628",
    blueBorder: "#1E3A5F",
    green: "#86EFAC",
    greenBg: "#071810",
    greenBorder: "#14532D",
    amber2: "#FDBA74",
    amber2Bg: "#1A0E00",
    amber2Border: "#7C2D12",
    teal: "#5EEAD4",
    tealBg: "#051A18",
    tealBorder: "#134E4A",
    navBg: "rgba(13,15,20,0.92)",
    tagBg: "rgba(255,255,255,0.08)",
    tagText: "#C0BAB0",
    toggleBg: "#1E2330",
    toggleText: "#9CA3AF",
    timelineLine: "#374151",
    progressTrack: "#1E2330",
  },
};

const phaseColors = {
  teal:   (t) => ({ bg: t.tealBg,   border: t.tealBorder,   text: t.teal,   dot: t.accent }),
  purple: (t) => ({ bg: t.purpleBg, border: t.purpleBorder, text: t.purple, dot: "#8B5CF6" }),
  amber:  (t) => ({ bg: t.amber2Bg, border: t.amber2Border, text: t.amber2, dot: "#F97316" }),
  blue:   (t) => ({ bg: t.blueBg,   border: t.blueBorder,   text: t.blue,   dot: "#3B82F6" }),
  green:  (t) => ({ bg: t.greenBg,  border: t.greenBorder,  text: t.green,  dot: "#22C55E" }),
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const WARNING = {
  heading: "Read this before anything else",
  body: "Most people come to psychology looking for a shortcut — a framework that explains someone else's behavior in a neat package. What it actually gives you is something better: the ability to understand individual people — their emotional states, unspoken needs, and communication patterns. That skill is more useful, more accurate, and more lasting than any 'decode them in 10 steps' approach.",
};

const SKILL_AREAS = [
  { icon: "◎", label: "Emotional Intelligence", desc: "Recognizing & responding to emotions" },
  { icon: "◈", label: "Active Listening",        desc: "Hearing intent, not just words" },
  { icon: "◉", label: "Body Language",           desc: "Reading what isn't said" },
  { icon: "◍", label: "Human Motivation",        desc: "Why people do what they do" },
];

const PHASES = [
  {
    id: "foundation", phase: "Phase 1", title: "Foundation", subtitle: "Start here — all free", color: "teal",
    resources: [
      { type: "course", free: true, title: "Yale — Introduction to Psychology", platform: "Coursera / Open Yale", rating: 5, ratingLabel: "35k+ enrolled", desc: "Covers perception, communication, learning, memory, decision-making, persuasion, emotions, and social behavior — including how these differ across people and break down under stress. One of the highest-rated free psychology courses online.", link: "https://www.coursera.org/learn/introduction-psychology", tags: ["Beginner", "Structured", "Certificate available"] },
      { type: "course", free: true, title: "Yale — Human Emotions", platform: "YouTube (Open Yale)", rating: 4, ratingLabel: "Highly acclaimed", desc: "Prof. June Gruber explores what emotions are, what purpose they serve, how they relate to thoughts and memories, and how emotions shape social relationships. Covers evolutionary origins of love, anger, fear, and disgust — directly relevant to understanding real people.", link: "https://www.youtube.com/results?search_query=Yale+Human+Emotions+June+Gruber", tags: ["Emotions focus", "Free", "Deep dive"] },
      { type: "course", free: true, title: "MIT OpenCourseWare — Intro to Psychology", platform: "ocw.mit.edu", rating: 4, ratingLabel: "University grade", desc: "Covers cognitive function, emotion, perception, memory, learning, childhood development, and personality. Includes a free textbook, reading assignments, and exams with answer keys so you can test yourself properly.", link: "https://ocw.mit.edu/courses/9-00sc-introduction-to-psychology-fall-2011/", tags: ["Self-paced", "Academic depth", "Free textbook"] },
      { type: "course", free: true, title: "OpenLearn — Investigating Psychology", platform: "open.edu/openlearn", rating: 4, ratingLabel: "The Open University", desc: "Explores psychology's history and core questions using interactive material. One of the best on-ramps for complete beginners — no jargon wall, well-structured, and takes roughly 8 hours total.", link: "https://www.open.edu/openlearn/health-sports-psychology/introduction-psychology", tags: ["Beginner friendly", "Interactive", "~8 hours"] },
    ],
  },
  {
    id: "books-free", phase: "Phase 2A", title: "Core Books — Free", subtitle: "Library / open source", color: "purple",
    resources: [
      { type: "book", free: true, title: "How to Win Friends & Influence People", author: "Dale Carnegie", rating: 4, ratingLabel: "1.1M+ Goodreads ratings", desc: "The classic on human nature, listening, and making people feel genuinely understood. Consistently top-recommended across Reddit, Goodreads, and every psychology community surveyed. Not a manipulation manual — it's fundamentally about empathy. Available free at any public library.", tags: ["Classic", "Library / free", "Human nature"] },
      { type: "book", free: true, title: "Nonviolent Communication", author: "Marshall Rosenberg", rating: 4, ratingLabel: "Widely recommended", desc: "Teaches you to hear needs and feelings behind what people say — incredibly useful for understanding indirect communication. The core framework: Observation → Feeling → Need → Request. Directly applicable to every confusing conversation you've ever had.", tags: ["Communication", "Empathy", "Library / free"] },
      { type: "book", free: true, title: "Games People Play", author: "Eric Berne", rating: 4, ratingLabel: "40,000+ Goodreads ratings", desc: "Foundational text on Transactional Analysis — understanding the hidden psychological scripts and recurring patterns driving human interaction. Eye-opening for recognizing why conversations go the same frustrating way over and over.", tags: ["Behavior patterns", "Classic", "Library / free"] },
      { type: "book", free: true, title: "Man's Search for Meaning", author: "Viktor Frankl", rating: 5, ratingLabel: "Essential reading", desc: "Not directly about relationships, but teaches the most important psychological skill: understanding that behavior is driven by the need for meaning, not just logic or emotion. Changes how you interpret why people do what they do at the deepest level.", tags: ["Motivation", "Meaning", "Library / free"] },
    ],
  },
  {
    id: "books-paid", phase: "Phase 2B", title: "Core Books — Worth Buying", subtitle: "High signal-to-noise ratio, no fluff", color: "amber",
    resources: [
      { type: "book", free: false, price: "~₹800", title: "What Every Body Is Saying", author: "Joe Navarro (Ex-FBI Agent)", rating: 4, ratingLabel: "35,000+ Goodreads ratings", desc: "The most consistently recommended body language book across every community — teaches you to read posture, gestures, comfort/discomfort signals, and micro-expressions. Science-backed, written by someone who spent 25 years reading people professionally. No pop-psych fluff.", tags: ["Body language", "Science-backed", "FBI field tested"] },
      { type: "book", free: false, price: "~₹1,200", title: "Emotions Revealed", author: "Paul Ekman", rating: 4, ratingLabel: "7,600+ ratings · 4.03 avg", desc: "The science-backed guide to recognizing real emotions on faces. Ekman's work is the basis of the show 'Lie to Me'. Teaches micro-expressions and how people mask what they feel — a direct window into emotional states that words don't reveal.", tags: ["Micro-expressions", "Science", "Emotions"] },
      { type: "book", free: false, price: "~₹1,500", title: "The Laws of Human Nature", author: "Robert Greene", rating: 5, ratingLabel: "27,000+ ratings · 4.35 avg", desc: "Comprehensive and not dumbed down — 18 laws of human behavior drawn from history, psychology, and philosophy. Dense but consistently among the highest-rated 'understanding people' books across every platform and community surveyed. A long-term reference, not a one-time read.", tags: ["Deep dive", "Behavior", "Reference"] },
      { type: "book", free: false, price: "~₹600", title: "Emotional Intelligence", author: "Daniel Goleman", rating: 4, ratingLabel: "Foundational text", desc: "The book that defined EQ. Explains why emotional awareness matters more than IQ in relationships and communication — and how to build it. Essential theoretical grounding for everything else on this list.", tags: ["EQ", "Foundational", "Relationships"] },
      { type: "book", free: false, price: "~₹900", title: "Attached", author: "Levine & Heller", rating: 4, ratingLabel: "100,000+ ratings · 4.12 avg", desc: "The most practical and readable book on Attachment Theory (the single most useful framework for understanding relationship behavior). Explains why people act anxious, avoidant, or secure — and what to do about it. Reddit's r/relationships recommends this more than almost any other book.", tags: ["Attachment theory", "Practical", "Relationships"] },
    ],
  },
  {
    id: "frameworks", phase: "Phase 3", title: "Key Frameworks", subtitle: "Concepts that change how you interpret interactions", color: "blue",
    resources: [
      { type: "concept", title: "Attachment Theory", author: "John Bowlby / Mary Ainsworth", desc: "Your earliest caregiving relationships shape how you bond as an adult. The four styles — Secure (comfortable with closeness), Anxious (fears abandonment, needs reassurance), Avoidant (pulls away from intimacy), Disorganized (oscillates unpredictably) — explain a massive portion of communication behavior. Once you can identify these, you stop taking reactions personally.", tags: ["Core framework", "Relationships", "Behavior patterns"] },
      { type: "concept", title: "The Five Love Languages", author: "Gary Chapman", desc: "Words of Affirmation · Acts of Service · Receiving Gifts · Quality Time · Physical Touch. People give and receive love in different channels — someone who needs Quality Time will feel unloved no matter how many gifts you give them. This framework removes a huge class of miscommunication that isn't about what was said, but about which emotional channel was used.", tags: ["Communication", "Relationships", "Practical"] },
      { type: "concept", title: "The Four Horsemen (Gottman Method)", author: "John Gottman — relationship researcher", desc: "Four behaviors that predict relationship failure with 90%+ accuracy in Gottman's research: Criticism (attacking character), Contempt (superiority/disgust — the most destructive), Defensiveness (counter-attacking), Stonewalling (emotional shutdown). Knowing these lets you identify exactly when and why communication collapses.", tags: ["Relationships", "Conflict", "Research-backed"] },
      { type: "concept", title: "Active Listening vs. Passive Hearing", author: "Core clinical psychology skill", desc: "Fully engage without interrupting or planning your response. Practical techniques: nodding and eye contact, reflecting back ('What I'm hearing is…'), 'I' statements instead of 'you' statements, asking 'what do you need right now?' rather than jumping to solutions. Research shows couples who use 'we' language during disagreements resolve conflicts significantly more often.", tags: ["Communication", "Skill", "Practical"] },
      { type: "concept", title: "Cognitive Distortions (CBT)", author: "Aaron Beck", desc: "Patterns of thinking that distort how people interpret situations — catastrophizing, mind-reading, black-and-white thinking, personalization, emotional reasoning. Understanding these helps you recognize when someone's reaction is about their internal world, not you. Also helps you spot your own distortions in how you interpret what others say.", tags: ["CBT", "Thinking patterns", "Self-awareness"] },
      { type: "concept", title: "Nonviolent Communication Framework", author: "Marshall Rosenberg", desc: "A four-step model: Observation (what specifically happened, without evaluation) → Feeling (what emotion arose) → Need (what underlying need is unmet) → Request (a concrete ask, not a demand). The key insight: almost all conflict comes from unmet needs, not character flaws. Once you learn to hear the need behind the complaint, communication transforms.", tags: ["Framework", "Conflict", "Communication"] },
    ],
  },
  {
    id: "communities", phase: "Ongoing", title: "Communities & Free Resources", subtitle: "Stay current, apply what you learn", color: "green",
    resources: [
      { type: "community", title: "r/psychology", platform: "Reddit", desc: "Focuses on scientific findings and legitimate peer-reviewed research. One of the best places to stay current with real studies without pop-psych noise. Use it to ask questions and cross-check anything you read elsewhere.", link: "https://reddit.com/r/psychology", tags: ["Science-focused", "Active", "Free"] },
      { type: "community", title: "r/socialskills", platform: "Reddit", desc: "Real-world social scenarios, communication breakdowns, and practical advice. Useful for applying psychology concepts to actual situations — read threads like case studies.", link: "https://reddit.com/r/socialskills", tags: ["Practical", "Q&A", "Free"] },
      { type: "community", title: "r/relationship_advice + r/AITA", platform: "Reddit", desc: "Observe real interpersonal dynamics at scale. Reading these threads with a psychological lens — identifying attachment styles, cognitive distortions, communication patterns — is surprisingly educational. Treat them as live case studies.", link: "https://reddit.com/r/relationship_advice", tags: ["Case studies", "Patterns", "Free"] },
      { type: "community", title: "Science of People — Vanessa Van Edwards", platform: "YouTube / scienceofpeople.com", desc: "Behavioral scientist who breaks down body language, charisma, and social cues in short, research-backed videos. Genuinely well-sourced and practical without being dumbed down. One of the few YouTube channels psychology academics don't cringe at.", link: "https://www.scienceofpeople.com", tags: ["Video", "Body language", "Free"] },
      { type: "community", title: "Psychology Today", platform: "psychologytoday.com", desc: "Free articles on relationships, communication, emotions, and behavior — contributor-written and editor-reviewed. Use the search bar to deep-dive specific topics. Quality varies by contributor but the platform curates well.", link: "https://www.psychologytoday.com", tags: ["Articles", "Deep dives", "Free"] },
      { type: "community", title: "Psych2Go", platform: "YouTube", desc: "Short, accessible psychology explainers. Lower depth than Van Edwards but useful for quickly grasping a concept before reading deeper. Good for commutes and passive learning.", link: "https://www.youtube.com/@Psych2go", tags: ["Beginner", "Short-form", "Free"] },
    ],
  },
];

const RED_FLAGS = [
  { title: '"Decode Their Mind" / "Unlock Their Secrets" type products', severity: "avoid", detail: "Search results are flooded with Gumroad ebooks ($5–$37) with zero scientific basis, no author credentials, and titles designed to exploit exactly the frustration you're feeling. They are content mills. None of them will teach you anything a good psychology book won't do ten times better for free at a library." },
  { title: "Men Are From Mars, Women Are From Venus — John Gray", severity: "caution", detail: "Extremely popular but the entire premise relies on gender binaries that don't hold up under research. Science shows far more overlap than difference between male and female psychology. Useful as a cultural artifact, not as a scientific guide." },
  { title: "The Female Brain — Louann Brizendine", severity: "avoid", detail: "Criticized by the NYT, Washington Post, and multiple scientists for lacking solid research backing. The book's central claims about brain differences were widely disputed, and modern research consistently shows more psychological overlap between people than the book implies. Popularity significantly outpaces scientific credibility." },
  { title: "Dark Psychology / Manipulation content", severity: "avoid", detail: "Understanding someone is not the same as controlling them. Content framed around 'psychological warfare,' 'covert manipulation,' or 'making people chase you' will damage every relationship you try to build. It is the opposite of what this guide is for — and the opposite of what actually works long-term." },
  { title: "Freud-heavy approaches to understanding people", severity: "caution", detail: "Freud's views on gender and behavior were controversial in 1925 and have been thoroughly discredited since. His associate Karen Horney's rebuttal — that observed differences between people are largely social, not innate — was far closer to what modern research supports. Useful historically, not as a practical guide." },
  { title: "'Read minds in 10 minutes' body language books", severity: "caution", detail: "Body language reading is real but wildly overhyped in popular books. Accuracy from untrained single-gesture observation is low. Joe Navarro's work is the exception. Everything else in the genre should be treated as supplementary signal, never as definitive proof of what someone is feeling." },
];

const ROADMAP = [
  { weeks: "Wk 1–2",  focus: "Psychology foundations",        resource: "Yale Intro to Psych — Coursera",        color: "#2E8B7A" },
  { weeks: "Wk 3–4",  focus: "Emotions & how they work",     resource: "Yale Human Emotions — YouTube",         color: "#2E8B7A" },
  { weeks: "Wk 5–6",  focus: "Listening & communication",    resource: "Nonviolent Communication — Rosenberg",  color: "#8B5CF6" },
  { weeks: "Wk 7–8",  focus: "Body language basics",         resource: "What Every Body Is Saying — Navarro",   color: "#8B5CF6" },
  { weeks: "Wk 9–10", focus: "Attachment & relationships",   resource: "Attached — Levine & Heller",            color: "#F97316" },
  { weeks: "Wk 11–12",focus: "Human motivation & behavior",  resource: "Laws of Human Nature — Robert Greene",  color: "#F97316" },
  { weeks: "Ongoing", focus: "EQ theory + apply daily",      resource: "Emotional Intelligence + journaling",   color: "#22C55E" },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Stars({ count }) {
  return (
    <span style={{ letterSpacing: 1, fontSize: 11 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= count ? "#F59E0B" : "#D1D5DB" }}>★</span>
      ))}
    </span>
  );
}

function Tag({ label, t }) {
  return (
    <span style={{
      display: "inline-block",
      fontSize: 10,
      fontWeight: 500,
      padding: "2px 8px",
      borderRadius: 20,
      background: t.tagBg,
      color: t.tagText,
      marginRight: 4,
      marginBottom: 4,
    }}>{label}</span>
  );
}

function ResourceCard({ resource, c, t }) {
  const [open, setOpen] = useState(false);

  const typeLabel = { course: "Course", book: "Book", concept: "Framework", community: "Community" }[resource.type];

  return (
    <div
      onClick={() => setOpen(v => !v)}
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 14,
        padding: "14px 16px",
        cursor: "pointer",
        transition: "transform 0.15s, box-shadow 0.15s",
        marginBottom: 8,
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* Card header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 6, background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
              {typeLabel}
            </span>
            {resource.free === true && (
              <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 6, background: t.greenBg, border: `1px solid ${t.greenBorder}`, color: t.green }}>
                Free
              </span>
            )}
            {resource.free === false && resource.price && (
              <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 6, background: t.surfaceAlt, color: t.textMuted }}>
                {resource.price}
              </span>
            )}
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, lineHeight: 1.35, marginBottom: 2 }}>
            {resource.title}
          </div>
          {(resource.author || resource.platform) && (
            <div style={{ fontSize: 11, color: t.textMuted }}>
              {resource.author || resource.platform}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
          {resource.rating && <Stars count={resource.rating} />}
          <span style={{ fontSize: 12, color: t.textMuted, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
        </div>
      </div>

      {/* Expanded detail */}
      {open && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}` }}>
          <p style={{ fontSize: 12, color: t.textSub, lineHeight: 1.7, marginBottom: 8 }}>{resource.desc}</p>
          {resource.ratingLabel && (
            <p style={{ fontSize: 11, color: t.textMuted, marginBottom: 8 }}>{resource.ratingLabel}</p>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 6 }}>
            {(resource.tags || []).map(tag => <Tag key={tag} label={tag} t={t} />)}
          </div>
          {resource.link && (
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ display: "inline-block", marginTop: 10, fontSize: 12, fontWeight: 600, color: c.text, textDecoration: "none" }}
            >
              Open resource →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function PhaseSection({ phase, t, expanded, onToggle }) {
  const c = phaseColors[phase.color](t);
  return (
    <div style={{ marginBottom: 24 }}>
      {/* Phase header — clickable */}
      <button
        onClick={onToggle}
        style={{
          width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 12, marginBottom: expanded ? 14 : 0,
          padding: "10px 14px",
          borderRadius: 12,
          background: expanded ? c.bg : "transparent",
          border: `1px solid ${expanded ? c.border : "transparent"}`,
          transition: "background 0.2s, border 0.2s",
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: c.text, marginBottom: 2 }}>
            {phase.phase}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>
            {phase.title}
          </div>
          <div style={{ fontSize: 11, color: t.textMuted }}>{phase.subtitle}</div>
        </div>
        <span style={{
          fontSize: 13, color: t.textMuted,
          transition: "transform 0.25s",
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)"
        }}>▾</span>
      </button>

      {expanded && (
        <div>
          {phase.resources.map((r, i) => (
            <ResourceCard key={i} resource={r} c={c} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState("guide");
  const [openPhase, setOpenPhase] = useState("foundation");
  const t = dark ? themes.dark : themes.light;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const reset = { margin: "0", padding: "0", background: t.bg, transition: "background 0.3s", overflowX: "hidden" };
    Object.assign(html.style, reset);
    Object.assign(body.style, reset);
  }, [t.bg]);

  const togglePhase = (id) => setOpenPhase(prev => prev === id ? null : id);

  const s = {
    root: {
      minHeight: "100vh",
      width: "100%",
      margin: 0,
      padding: 0,
      background: t.bg,
      color: t.text,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      transition: "background 0.3s, color 0.3s",
      boxSizing: "border-box",
    },
    nav: {
      position: "sticky", top: 0, zIndex: 10,
      background: t.navBg,
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${t.border}`,
      padding: "12px 20px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    },
    navTitle: { fontSize: 15, fontWeight: 800, letterSpacing: "-0.3px", color: t.text },
    toggleBtn: {
      fontSize: 11, fontWeight: 600, padding: "6px 12px",
      borderRadius: 20,
      border: `1px solid ${t.borderMed}`,
      background: t.toggleBg,
      color: t.toggleText,
      cursor: "pointer",
      transition: "background 0.2s",
      display: "flex", alignItems: "center", gap: 5,
    },
    container: { maxWidth: 640, margin: "0 auto", padding: "24px 16px" },
    heroLabel: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: t.accent, marginBottom: 6 },
    heroTitle: { fontSize: 30, fontWeight: 800, lineHeight: 1.15, marginBottom: 8, color: t.text, letterSpacing: "-0.5px" },
    heroSub: { fontSize: 13, color: t.textSub, lineHeight: 1.6, marginBottom: 24 },
    warnCard: {
      borderRadius: 14, border: `1px solid ${t.warnBorder}`,
      background: t.warnBg, padding: "14px 16px",
      marginBottom: 24, display: "flex", gap: 10, alignItems: "flex-start",
    },
    warnIcon: { fontSize: 16, color: t.warnBorder, flexShrink: 0, marginTop: 1 },
    warnHead: { fontSize: 12, fontWeight: 700, color: t.warn, marginBottom: 4 },
    warnBody: { fontSize: 11, color: t.warn, lineHeight: 1.7, opacity: 0.9 },
    sectionLabel: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.textMuted, marginBottom: 12 },
    skillGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 28 },
    skillCard: {
      display: "flex", alignItems: "center", gap: 10,
      background: t.surface, border: `1px solid ${t.border}`,
      borderRadius: 12, padding: "10px 12px",
    },
    skillIcon: { fontSize: 18, color: t.accent, flexShrink: 0, fontWeight: 300 },
    skillLabel: { fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 1 },
    skillDesc: { fontSize: 10, color: t.textMuted },
    tabRow: {
      display: "flex", gap: 4, marginBottom: 24,
      background: t.surfaceAlt, borderRadius: 12, padding: 4,
    },
    tab: (active) => ({
      flex: 1, fontSize: 11, fontWeight: 600, padding: "8px 4px",
      borderRadius: 9, border: "none", cursor: "pointer",
      transition: "background 0.15s, color 0.15s",
      background: active ? t.surface : "transparent",
      color: active ? t.text : t.textMuted,
      boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
      textTransform: "capitalize",
    }),
    hint: { fontSize: 11, color: t.textMuted, marginBottom: 20, lineHeight: 1.6 },
    timelineWrap: { position: "relative", marginBottom: 24 },
    timelineLine: { position: "absolute", left: 70, top: 16, bottom: 16, width: 1, background: t.timelineLine },
    timelineRow: { display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 8 },
    timelineWeek: { width: 58, textAlign: "right", fontSize: 10, fontWeight: 600, color: t.textMuted, paddingTop: 10, flexShrink: 0 },
    timelineDot: (color) => ({
      width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0,
      marginTop: 10, border: `2px solid ${t.bg}`, position: "relative", zIndex: 1,
    }),
    timelineCard: {
      flex: 1, background: t.surface, border: `1px solid ${t.border}`,
      borderRadius: 12, padding: "8px 12px",
    },
    timelineFocus: { fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 2 },
    timelineRes: { fontSize: 11, color: t.textSub },
    insightCard: {
      background: t.accentBg, border: `1px solid ${t.accent}33`,
      borderRadius: 14, padding: "16px",
      marginTop: 24,
    },
    insightHead: { fontSize: 12, fontWeight: 700, color: t.accentText, marginBottom: 6 },
    insightBody: { fontSize: 11, color: t.accentText, lineHeight: 1.8, opacity: 0.9 },
    rfCard: (sev) => ({
      borderRadius: 14,
      border: `1px solid ${sev === "avoid" ? t.redBorder : t.amberBorder}`,
      background: sev === "avoid" ? t.redBg : t.amberBg,
      padding: "14px 16px",
      marginBottom: 10,
    }),
    rfBadge: (sev) => ({
      fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em",
      padding: "2px 8px", borderRadius: 20, flexShrink: 0,
      background: sev === "avoid" ? t.redBg : t.amberBg,
      border: `1px solid ${sev === "avoid" ? t.redBorder : t.amberBorder}`,
      color: sev === "avoid" ? t.red : t.amber,
    }),
    rfTitle: { fontSize: 13, fontWeight: 700, color: t.text, lineHeight: 1.3 },
    rfDetail: { fontSize: 11, color: t.textSub, lineHeight: 1.7, marginTop: 6 },
    progressSection: { marginBottom: 32 },
    progressLabel: { fontSize: 11, fontWeight: 600, color: t.textSub, marginBottom: 4 },
    progressTrack: { height: 4, borderRadius: 2, background: t.progressTrack, marginBottom: 16, overflow: "hidden" },
    progressFill: (pct, color) => ({
      height: "100%", width: `${pct}%`, borderRadius: 2, background: color, transition: "width 0.6s ease",
    }),
    divider: { height: 1, background: t.border, margin: "24px 0" },
  };

  return (
    <div style={s.root}>
      {/* ── Nav ── */}
      <div style={s.nav}>
        <span style={s.navTitle}>Psych Guide</span>
        <button style={s.toggleBtn} onClick={() => setDark(d => !d)}>
          <span>{dark ? "☀" : "☾"}</span>
          <span>{dark ? "Light mode" : "Dark mode"}</span>
        </button>
      </div>

      <div style={s.container}>

        {/* ── Hero ── */}
        <div style={s.heroLabel}>Understanding people</div>
        <h1 style={s.heroTitle}>
          Psychology<br />
          <span style={{ color: t.textMuted, fontWeight: 400 }}>for real connection</span>
        </h1>
        <p style={s.heroSub}>
          Free-first, science-backed. Built for people who want depth, not shortcuts.
          Covers courses, books, frameworks, communities, and what to avoid.
        </p>

        {/* ── Warning ── */}
        <div style={s.warnCard}>
          <span style={s.warnIcon}>⚠</span>
          <div>
            <div style={s.warnHead}>{WARNING.heading}</div>
            <div style={s.warnBody}>{WARNING.body}</div>
          </div>
        </div>

        {/* ── Skill areas ── */}
        <div style={s.sectionLabel}>What you'll develop</div>
        <div style={s.skillGrid}>
          {SKILL_AREAS.map(sk => (
            <div key={sk.label} style={s.skillCard}>
              <span style={s.skillIcon}>{sk.icon}</span>
              <div>
                <div style={s.skillLabel}>{sk.label}</div>
                <div style={s.skillDesc}>{sk.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div style={s.tabRow}>
          {["guide", "roadmap", "red flags"].map(name => (
            <button key={name} style={s.tab(tab === name)} onClick={() => setTab(name)}>
              {name}
            </button>
          ))}
        </div>

        {/* ══ TAB: GUIDE ══ */}
        {tab === "guide" && (
          <div>
            <p style={s.hint}>Tap a phase to expand · tap any card for full details and links</p>
            {PHASES.map(phase => (
              <PhaseSection
                key={phase.id}
                phase={phase}
                t={t}
                expanded={openPhase === phase.id}
                onToggle={() => togglePhase(phase.id)}
              />
            ))}
          </div>
        )}

        {/* ══ TAB: ROADMAP ══ */}
        {tab === "roadmap" && (
          <div>
            <p style={s.hint}>A 12-week sequence. Depth over speed — adjust the pace freely.</p>

            {/* Progress bars */}
            <div style={s.progressSection}>
              <div style={s.sectionLabel}>Learning arc overview</div>
              {[
                { label: "Theory foundations", pct: 30, color: "#2E8B7A" },
                { label: "Communication skills", pct: 60, color: "#8B5CF6" },
                { label: "Relationship frameworks", pct: 80, color: "#F97316" },
                { label: "Applied practice", pct: 100, color: "#22C55E" },
              ].map(bar => (
                <div key={bar.label}>
                  <div style={s.progressLabel}>{bar.label}</div>
                  <div style={s.progressTrack}>
                    <div style={s.progressFill(bar.pct, bar.color)} />
                  </div>
                </div>
              ))}
            </div>

            <div style={s.divider} />

            {/* Timeline */}
            <div style={s.sectionLabel}>Week-by-week plan</div>
            <div style={s.timelineWrap}>
              <div style={s.timelineLine} />
              <div style={{ paddingLeft: 0 }}>
                {ROADMAP.map((row, i) => (
                  <div key={i} style={s.timelineRow}>
                    <div style={s.timelineWeek}>{row.weeks}</div>
                    <div style={s.timelineDot(row.color)} />
                    <div style={s.timelineCard}>
                      <div style={s.timelineFocus}>{row.focus}</div>
                      <div style={s.timelineRes}>{row.resource}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insight card */}
            <div style={s.insightCard}>
              <div style={s.insightHead}>The single most useful thing psychology will teach you</div>
              <div style={s.insightBody}>
                Most of what someone "means" is about their <em>emotional state</em>, not the literal words.
                Learning to ask "what is this person feeling right now?" instead of "what does this message mean?"
                is the real unlock. Once you can hold that question, communication stops feeling like a puzzle
                and starts feeling like a conversation.
              </div>
            </div>
          </div>
        )}

        {/* ══ TAB: RED FLAGS ══ */}
        {tab === "red flags" && (
          <div>
            <p style={s.hint}>
              Things to avoid — ranked by how much time and money people waste on them.
              Researched across Reddit communities, Goodreads reviews, and academic criticism.
            </p>

            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <span style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.red, display: "inline-block" }} />
                <span style={{ color: t.textSub }}>Skip entirely</span>
              </span>
              <span style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.warnBorder, display: "inline-block" }} />
                <span style={{ color: t.textSub }}>Approach with caution</span>
              </span>
            </div>

            {RED_FLAGS.map((rf, i) => (
              <div key={i} style={s.rfCard(rf.severity)}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
                  <span style={s.rfBadge(rf.severity)}>
                    {rf.severity === "avoid" ? "Skip" : "Caution"}
                  </span>
                  <span style={s.rfTitle}>{rf.title}</span>
                </div>
                <p style={s.rfDetail}>{rf.detail}</p>
              </div>
            ))}

            <div style={s.insightCard}>
              <div style={s.insightHead}>The pattern behind all of these</div>
              <div style={s.insightBody}>
                Every item on this list either (a) treats people as a monolith to be decoded,
                (b) relies on broad generalizations that science doesn't support, or (c) is
                selling you control instead of connection. The research is consistent:
                genuine curiosity about the individual in front of you — their specific history,
                needs, and emotional state — is more predictive of understanding them than
                any framework that reduces them to a category.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
