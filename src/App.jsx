import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import Lanyard from "./components/Lanyard/Lanyard";
import { listTools, listProyek } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal"; // <-- IMPORT MODAL
import Aurora from "./components/Aurora/Aurora";
import AOS from 'aos';
import emailjs from '@emailjs/browser';
import Lenis from 'lenis'
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const ROLE_LIST = [
  "Full Stack Developer",
  "React Developer",
  "Open to Internships",
];

function App() {
  const [selectedProject, setSelectedProject] = useState(null); // null = modal tertutup

  const formRef = useRef(null);
  const [formStatus, setFormStatus] = useState('');
  const [toast, setToast] = useState({ type: '', message: '', visible: false });

  const [typedText, setTypedText] = useState(ROLE_LIST[0]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    emailjs.sendForm(
      'service_gbb4i2r',
      'template_smzm7m2',
      formRef.current,
      'C3EoV_Cf0iIfRBshS'
    ).then(() => {
      setFormStatus('sent');
      formRef.current.reset();
      setToast({ type: 'success', message: 'Message sent successfully!', visible: true });
    }).catch(() => {
      setFormStatus('error');
      setToast({ type: 'error', message: 'Something went wrong. Try again.', visible: true });
    });
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };
  // -------------------------

  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isReload) {
      // Ambil path tanpa hash
      const baseUrl = window.location.origin + "/";
      window.location.replace(baseUrl);
    }
  }, []);

  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.visible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const revealItems = document.querySelectorAll(".reveal");
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const currentRole = ROLE_LIST[roleIndex];
    const typingSpeed = isDeleting ? 35 : 70;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentRole.slice(0, typedText.length + 1);
        setTypedText(nextText);
        if (nextText === currentRole) {
          setTimeout(() => setIsDeleting(true), 900);
        }
      } else {
        const nextText = currentRole.slice(0, typedText.length - 1);
        setTypedText(nextText);
        if (nextText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLE_LIST.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full -z-10 ">
        <Aurora
          colorStops={["#577870", "#1F97A6", "#127B99"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden page-load">
        <section id="home" className="relative hero grid md:grid-cols-2 items-center pt-28 md:pt-32 xl:gap-0 gap-10 grid-cols-1 min-h-[70vh]" style={{ "--delay": "0.05s" }}>
          <div className="hero-particles" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="relative z-10 animate__animated animate__fadeInUp animate__delay-3s text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 break-words">
              <ShinyText text="Hi I'm Rahul Tanwar" disabled={false} speed={3} className="hero-name-shimmer" />
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#cfeee4] mb-6">
              <span className="text-[#5DCAA5] font-semibold">{typedText}</span>
              <span className="typewriter-cursor" />
            </p>
            <BlurText
              text="A passionate application and web developer dedicated to crafting modern, high-performance digital experiences through innovative and user-friendly solutions."
              delay={150}
              animateBy="words"
              direction="top"
              className="text-sm sm:text-base md:text-lg mb-8 break-words"
            />
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:gap-4 gap-3 w-full">
              <a 
                href="./assets/CV.pdf" 
                download="Faris_Edrik_Prayoga_CV.pdf" 
                className="btn-teal-glow font-semibold bg-transparent p-4 px-6 rounded-full w-full sm:w-auto text-center"
              >
                <span>Download CV</span>
              </a>

              <a href="#project" className="btn-ghost font-semibold p-4 px-6 rounded-full w-full sm:w-auto text-center inline-flex items-center justify-center gap-2">
                <span>View Projects</span>
                <span className="btn-arrow">→</span>
              </a>
            </div>

          </div>
          <div className="relative z-10 flex justify-center md:justify-end animate__animated animate__fadeInUp animate__delay-4s">
            <div className="hero-avatar-glow">
              <ProfileCard
                className="w-full max-w-xs sm:max-w-sm md:max-w-md"
                name="Rahul Tanwar"
                title="Full Stack Developer"
                handle="rahultanwar"
                status="Online"
                contactText="Contact Me"
                avatarUrl="./assets/rahul.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => window.location.href = '#contact'}
              />
            </div>
          </div>
        </section>
        {/* tentang */}
        <section className="mt-15 mx-auto w-full max-w-[1600px] rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(93,202,165,0.18)] bg-gradient-to-br from-[#0a0a0f] via-[#11151a] to-[#0c1314] p-6" id="about" style={{ "--delay": "0.15s" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-0 px-4 sm:px-8" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-[#5DCAA5]/30">
              {/* Kolom kiri */}
              <div className="flex-1 text-left">
                <h2 className="section-title text-3xl md:text-4xl font-bold text-white mb-5">
                  About Me
                </h2>

                <BlurText
                  text="I’m Rahul Tanwar, a full-stack developer passionate about building modern, high-performance applications with an intuitive user experience. I enjoy working with the latest technologies like Artificial Intelligence, Machine Learning, and cloud-based development, blending creativity with precision to deliver impactful solutions. With over three years of experience and more than 20 completed projects, I’m committed to helping users and businesses grow in the digital era through functional, aesthetic, and scalable digital products."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-base md:text-lg leading-relaxed mb-10 text-gray-300"
                />

                <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-y-8 sm:gap-y-0 mb-4 w-full">
                  <div>
                    <h1 className="text-3xl md:text-4xl mb-1">
                      4<span className="text-[#5DCAA5]">+</span>
                    </h1>
                    <p>Project Finished</p>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl mb-1">
                      2<span className="text-[#5DCAA5]">+</span>
                    </h1>
                    <p>Years of Experience</p>
                  </div>
                </div>


                <ShinyText
                  text="Working with heart, creating with mind."
                  disabled={false}
                  speed={3}
                  className="text-sm md:text-base text-[#5DCAA5]"
                />
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="basis-full md:basis-5/12 pl-0 md:pl-8 overflow-hidden max-w-full flex justify-center">
              <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
            </div>
          </div>

        </section>
        <section className="tools mt-32" style={{ "--delay": "0.25s" }}>
          <h1 className="section-title text-3xl sm:text-4xl/snug font-bold mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" >Tools & Technologies</h1>
          <p className="w-full sm:w-3/5 md:w-2/5 text-base/loose opacity-60 break-words" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">My Profesional Skills</p>
          <div className="tools-box mt-14 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {listTools.map((tool) => (
              <div
                key={tool.id} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={tool.dad} data-aos-once="true"
                className="reveal flex items-center gap-4 p-4 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group shadow-lg hover:shadow-[0_0_24px_rgba(93,202,165,0.25)]"
              >
                <img
                  src={tool.gambar}
                  alt="Tools Image"
                  className="w-14 h-14 object-contain bg-black/40 p-2 rounded-xl group-hover:bg-black/60 transition-all duration-300"
                  loading="lazy"
                />
                <div className="flex flex-col overflow-hidden min-w-0">
                  <div className="truncate">
                    <ShinyText
                      text={tool.nama}
                      disabled={false}
                      speed={3}
                      className="text-base sm:text-lg font-semibold block"
                    />
                  </div>
                  <p className="text-sm text-zinc-400 truncate">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* tentang */}

        {/* Proyek */}
        <section className="proyek mt-32 py-10" id="project" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" style={{ "--delay": "0.35s" }}>
          <h1 className="section-title justify-center w-full text-center text-3xl sm:text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">Project</h1>
          <p className="text-base/loose text-center opacity-60 break-words" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">Showcasing a selection of projects that reflect my skills, creativity, and passion for building meaningful digital experiences.</p>
          <div className="proyek-box mt-14" >
            <div style={{ height: 'auto', position: 'relative' }} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true" >
              <ChromaGrid
                items={listProyek}
                onItemClick={handleProjectClick} // Kirim fungsi untuk handle klik
                radius={500}
                damping={0.45}
                fadeOut={0.6}
                ease="power3.out"
              />
            </div>
          </div>
        </section>
        {/* Proyek */}


        {/* Kontak */}
        <section className="kontak mt-32 sm:p-10 p-0" id="contact" style={{ "--delay": "0.45s" }}>
          <h1
            className="section-title justify-center w-full text-3xl sm:text-4xl mb-2 font-bold text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            Contact Me
          </h1>
          <p
            className="text-base/loose text-center mb-10 opacity-50"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
            data-aos-once="true"
          >
            Open to internship opportunities. Let's work together!
          </p>

          {/* Container dua kolom */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Contact Form di kanan */}
            <div className="flex-1">
              <form
                ref={formRef}
                onSubmit={sendEmail}
                className="bg-white/5 border border-white/10 p-6 sm:p-10 w-full rounded-2xl backdrop-blur-md shadow-lg"
                autoComplete="off"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="500"
                data-aos-once="true"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Input Name..."
                      className="border border-white/10 bg-black/40 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#5DCAA5]/60"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Input Email..."
                      className="border border-white/10 bg-black/40 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#5DCAA5]/60"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-semibold">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      cols="45"
                      rows="7"
                      placeholder="Message..."
                      className="border border-white/10 bg-black/40 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#5DCAA5]/60"
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="font-semibold bg-gradient-to-r from-[#5DCAA5] to-[#7be7c2] text-black p-4 px-6 rounded-full w-full cursor-pointer border border-transparent hover:opacity-90 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      {formStatus === 'sending' && (
                        <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      )}
                      {formStatus === 'sending' ? 'Sending...' : 
                       formStatus === 'sent' ? 'Message Sent! ✓' : 
                       formStatus === 'error' ? 'Error. Try Again' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="https://github.com/TanwarRahul21"
              className="h-11 w-11 rounded-full border border-white/10 bg-white/5 inline-flex items-center justify-center hover:border-[#5DCAA5] hover:text-[#5DCAA5] transition-colors"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.36 1.12 2.93.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.32 9.32 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.64 1.03 2.76 0 3.92-2.34 4.78-4.57 5.03.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .26.18.59.69.48A10.27 10.27 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/rahultanwar"
              className="h-11 w-11 rounded-full border border-white/10 bg-white/5 inline-flex items-center justify-center hover:border-[#5DCAA5] hover:text-[#5DCAA5] transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5c0 1.38-1.1 2.5-2.48 2.5S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4zM8.5 8.5h3.8v2.1h.05c.53-1 1.82-2.1 3.75-2.1 4 0 4.74 2.68 4.74 6.16V24h-4v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.96-2.88 3.98V24h-4z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/rahultanwar__/"
              className="h-11 w-11 rounded-full border border-white/10 bg-white/5 inline-flex items-center justify-center hover:border-[#5DCAA5] hover:text-[#5DCAA5] transition-colors"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm5.75-3.1a1.15 1.15 0 1 0 1.15 1.15A1.15 1.15 0 0 0 17.75 6.4z" />
              </svg>
            </a>
          </div>
        </section>
        {/* Kontak */}
      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />

      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`px-5 py-3 rounded-full shadow-lg border text-sm font-semibold backdrop-blur-md
              ${toast.type === 'success' ? 'bg-[#0f2a20] border-[#5DCAA5]/40 text-[#c7f4e4]' : 'bg-[#2a1010] border-red-500/40 text-red-200'}`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </>
  )
}

export default App
