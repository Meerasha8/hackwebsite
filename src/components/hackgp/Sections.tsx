import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

export function About() {
  const stats = [
    { v: "48h", l: "Of nonstop building" },
    { v: "$250K", l: "In prizes & swag" },
    { v: "120+", l: "Mentors on the grid" },
    { v: "9", l: "Tracks to compete in" },
  ];
  return (
    <section id="about" className="py-28 px-5 max-w-7xl mx-auto relative">
      <SectionHeader num="01" kicker="THE BRIEFING" title="A hackathon at racing speed." />
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <p className="font-body text-lg text-silver leading-relaxed">
          HACKGP is the world's most intense engineering grand prix. For 48 hours, teams of four engineers, designers
          and dreamers compete to ship the boldest software in motorsport, mobility and human performance. There are no
          pit stops. Only chequered flags.
        </p>
        <div className="grid grid-cols-2 gap-px bg-racing/20">
          {stats.map((s) => (
            <div key={s.l} className="bg-background p-6">
              <div className="font-display text-4xl text-foreground">{s.v}</div>
              <div className="font-ui text-[11px] text-silver mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const tracks = [
  { n: "01", t: "Telemetry & AI", d: "Real-time race data, predictive analytics, ML on the edge.", c: "racing-red" },
  { n: "02", t: "Aerodynamics Sim", d: "CFD in the browser, generative wing design, drag visualizers.", c: "gold" },
  { n: "03", t: "Pit Wall Tools", d: "Strategy dashboards, tyre models, fuel optimization.", c: "silver" },
  { n: "04", t: "Fan Experience", d: "Second-screen apps, AR overlays, community platforms.", c: "racing-red" },
  { n: "05", t: "Sustainable Mobility", d: "EV charging, alt fuels, carbon-aware logistics.", c: "gold" },
  { n: "06", t: "Driver Performance", d: "Wearables, biometrics, training simulators.", c: "silver" },
  { n: "07", t: "Autonomous Racing", d: "Self-driving in milliseconds. Sim-to-real RL agents.", c: "racing-red" },
  { n: "08", t: "Open Innovation", d: "Surprise us. The wildest ideas win at HACKGP.", c: "gold" },
  { n: "09", t: "Hardware Garage", d: "Embedded, IoT, robotics for the paddock of tomorrow.", c: "silver" },
];

export function Tracks() {
  return (
    <section id="tracks" className="py-28 px-5 max-w-7xl mx-auto relative">
      <SectionHeader num="02" kicker="9 CIRCUITS" title="Pick your track." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((t, i) => (
          <motion.div
            key={t.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
            className="f1-card f1-card-hover p-6 group"
          >
            <div className="flex items-start justify-between mb-6">
              <span className={`font-display text-2xl text-${t.c}`}>{t.n}</span>
              <div className="checker-pattern w-6 h-6 opacity-30 group-hover:opacity-100 transition" />
            </div>
            <h3 className="font-display-md text-lg mb-2">{t.t}</h3>
            <p className="font-body text-sm text-silver leading-relaxed">{t.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const schedule = [
  { day: "Day 1 — Lights out", time: "Sept 12", events: [
    { t: "09:00", e: "Paddock opens · Check-in" },
    { t: "11:00", e: "Opening ceremony · Race director's brief" },
    { t: "13:00", e: "🟢 Hacking begins" },
    { t: "20:00", e: "Pit stop — dinner & networking" },
  ]},
  { day: "Day 2 — Full throttle", time: "Sept 13", events: [
    { t: "08:00", e: "Mentor sessions across all 9 tracks" },
    { t: "14:00", e: "Mid-race technical inspections" },
    { t: "19:00", e: "Surprise sponsor challenge unlocks" },
    { t: "23:00", e: "Midnight ramen & lightning talks" },
  ]},
  { day: "Day 3 — Chequered flag", time: "Sept 14", events: [
    { t: "09:00", e: "Final hour — code freeze imminent" },
    { t: "13:00", e: "🏁 Submissions close" },
    { t: "15:00", e: "Demo expo — judges on the grid" },
    { t: "19:00", e: "Podium ceremony · Champagne shower" },
  ]},
];

export function Schedule() {
  return (
    <section id="schedule" className="py-28 px-5 max-w-5xl mx-auto relative">
      <SectionHeader num="03" kicker="RACE WEEKEND" title="The 48-hour grand prix." />
      <div className="space-y-10">
        {schedule.map((d, i) => (
          <motion.div
            key={d.day}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="flex items-baseline justify-between mb-4 border-b border-racing/30 pb-3">
              <h3 className="font-display text-xl">{d.day}</h3>
              <span className="font-ui text-[11px] text-gold">{d.time}</span>
            </div>
            <div className="space-y-2">
              {d.events.map((ev) => (
                <div key={ev.t} className="flex gap-6 items-baseline group">
                  <span className="font-display text-sm text-racing-red w-14 tabular-nums">{ev.t}</span>
                  <span className="font-body text-silver group-hover:text-foreground transition">{ev.e}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const podium = [
  { pos: "P1", title: "Pole position", prize: "$120,000", perks: ["Garage tour at a real F1 team", "Direct intro to top VCs", "Featured in Autosport Magazine"], color: "gold", height: "h-64" },
  { pos: "P2", title: "Front row", prize: "$70,000", perks: ["Paddock club tickets", "Cloud credits ($50K)", "Sponsor mentorship"], color: "silver", height: "h-52" },
  { pos: "P3", title: "Podium finish", prize: "$40,000", perks: ["Premium hardware kit", "Conference passes", "Recruiter spotlight"], color: "racing-red", height: "h-44" },
];

export function Prizes() {
  return (
    <section id="prizes" className="py-28 px-5 max-w-7xl mx-auto relative">
      <SectionHeader num="04" kicker="THE PODIUM" title="Race for $250,000." />
      <div className="grid md:grid-cols-3 gap-6 items-end">
        {[podium[1], podium[0], podium[2]].map((p, i) => (
          <motion.div
            key={p.pos}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="f1-card f1-card-hover p-7 relative"
          >
            <div className={`absolute -top-px left-0 right-0 h-0.5 bg-${p.color}`} />
            <div className="flex items-center justify-between mb-4">
              <span className={`font-display text-4xl text-${p.color}`}>{p.pos}</span>
              <span className="font-ui text-[10px] text-silver">{p.title}</span>
            </div>
            <div className="font-display text-3xl mb-6">{p.prize}</div>
            <ul className="space-y-2">
              {p.perks.map((pk) => (
                <li key={pk} className="font-body text-sm text-silver flex gap-2">
                  <span className="text-racing-red">›</span>
                  {pk}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 f1-card p-6 text-center">
        <p className="font-ui text-xs text-gold">+ $20,000 IN SPECIAL CATEGORY PRIZES — BEST UI · BEST HARDWARE · ROOKIE OF THE YEAR</p>
      </div>
    </section>
  );
}

const sponsorTiers = [
  { tier: "TITLE PARTNER", names: ["VECTOR DYNAMICS"] },
  { tier: "GRID PARTNERS", names: ["APEX CLOUD", "MERIDIAN AI", "OCTANE LABS", "REDLINE OS"] },
  { tier: "PIT CREW", names: ["FORGE", "VELOCITA", "STRATA", "NEBULA", "KAIROS", "PARADIGM", "HELIX", "ATLAS"] },
];

export function Sponsors() {
  return (
    <section id="sponsors" className="py-28 px-5 max-w-7xl mx-auto relative">
      <SectionHeader num="05" kicker="ON THE LIVERY" title="Backed by the paddock." />
      <div className="space-y-10">
        {sponsorTiers.map((tier) => (
          <div key={tier.tier}>
            <div className="font-ui text-[10px] text-gold mb-4">{tier.tier}</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-racing/20">
              {tier.names.map((n) => (
                <div key={n} className="bg-background py-8 px-4 text-center f1-card-hover">
                  <span className="font-display text-sm sm:text-base tracking-widest text-silver hover:text-foreground transition">
                    {n}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const faqs = [
  { q: "Who can enter the race?", a: "Anyone 18+ who can write code, design, or build hardware. Students, professionals, weekend warriors — all welcome on the grid." },
  { q: "Do I need a team?", a: "Teams of 1–4. Solo drivers can find a team at the opening mixer or via our team-matching Discord channel." },
  { q: "How much does it cost?", a: "$0. HACKGP is free for all qualified entrants. Travel grants are available — apply during registration." },
  { q: "What do I need to bring?", a: "Your laptop, charger, and a competitive spirit. Hardware kits are provided for the Garage track." },
  { q: "Is the event remote or in-person?", a: "Primary venue is Monaco, with satellite circuits in São Paulo, Singapore, Austin and Tokyo. Remote teams compete in their own bracket." },
  { q: "What's judged?", a: "Technical execution, originality, design quality, and on-stage demo. Three judges per submission, scored 1–10 across each axis." },
  { q: "Can I start before lights-out?", a: "No code may be written before 13:00 on Day 1. Pre-existing open-source libraries are fair game — claim them in your submission." },
  { q: "I have more questions.", a: "Drop them in the HACKGP Discord — race control answers within 4 hours, 24/7 during race week." },
];

export function FAQ() {
  return (
    <section id="faq" className="py-28 px-5 max-w-4xl mx-auto relative">
      <SectionHeader num="06" kicker="RACE CONTROL" title="Frequently asked." />
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <motion.details
            key={f.q}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="f1-card f1-card-hover p-5 group"
          >
            <summary className="cursor-pointer flex items-center justify-between font-display-md text-base">
              <span className="flex items-center gap-4">
                <span className="font-display text-racing-red text-sm">{String(i + 1).padStart(2, "0")}</span>
                {f.q}
              </span>
              <span className="font-display text-racing-red transition-transform group-open:rotate-45 text-xl leading-none">+</span>
            </summary>
            <p className="font-body text-silver mt-4 leading-relaxed pl-9">{f.a}</p>
          </motion.details>
        ))}
      </div>
    </section>
  );
}

export function Register() {
  return (
    <section id="register" className="py-28 px-5 max-w-4xl mx-auto relative">
      <div className="f1-card p-10 sm:p-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 racing-stripe" />
        <div className="absolute bottom-3 left-3 right-3 checker-pattern h-3 opacity-40" />
        <div className="font-ui text-xs text-gold mb-3">FORMATION LAP STARTS SOON</div>
        <h2 className="font-display text-4xl sm:text-6xl mb-5">
          Take the <span className="text-racing-red">grid.</span>
        </h2>
        <p className="font-body text-silver max-w-lg mx-auto mb-8">
          1,000 spots. 27 nationalities. One chance to write your name on the trophy.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder="driver@team.gp"
            className="flex-1 bg-background border border-racing/30 px-5 py-3 font-ui-reg text-sm focus:outline-none focus:border-racing transition"
          />
          <button type="submit" className="btn-primary-f1">Apply →</button>
        </form>
        <p className="font-ui text-[10px] text-muted-foreground mt-5">APPLICATIONS CLOSE JULY 31, 2026 · ROLLING ADMISSIONS</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative py-14 px-5 border-t border-racing/20 mt-10">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-10 items-start">
        <div>
          <div className="font-display text-2xl mb-3">HACK<span className="text-racing-red">GP</span></div>
          <p className="font-body text-sm text-silver max-w-xs">
            The grand prix of code. Run by engineers, for engineers. Independent · Non-profit · Worldwide.
          </p>
        </div>
        <div>
          <div className="font-ui text-[10px] text-gold mb-3">NAVIGATE</div>
          <ul className="space-y-2 font-ui-reg text-sm text-silver">
            <li><a href="#about" className="hover:text-foreground">About</a></li>
            <li><a href="#tracks" className="hover:text-foreground">Tracks</a></li>
            <li><a href="#schedule" className="hover:text-foreground">Schedule</a></li>
            <li><a href="#prizes" className="hover:text-foreground">Prizes</a></li>
          </ul>
        </div>
        <div>
          <div className="font-ui text-[10px] text-gold mb-3">RACE CONTROL</div>
          <ul className="space-y-2 font-ui-reg text-sm text-silver">
            <li>hello@hackgp.dev</li>
            <li>Discord · Twitter · GitHub</li>
            <li>Code of Conduct</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-racing/15 flex flex-wrap gap-3 justify-between items-center">
        <span className="font-ui text-[10px] text-muted-foreground">© 2026 HACKGP. NOT AFFILIATED WITH ANY RACING SERIES.</span>
        <div className="checker-pattern w-24 h-3 opacity-40" />
      </div>
    </footer>
  );
}
