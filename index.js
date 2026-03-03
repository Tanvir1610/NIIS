/**
 * NIIS 2026 - Index Page Script
 * scoped to index.html interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- Modal Logic (Topic Cards) ---
    const modal = document.getElementById('topic-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalList = document.getElementById('modal-list');
    const closeModal = document.querySelector('.modal__close');

    // Topic Data (Preserved from original)
    const topicDetails = {
        energy: {
            title: "Integrated Systems in Energy, Communication and Sensing",
            topics: [
                "Optical & Microwave Communication", "Satellite Communication Systems", "Antenna Design & RF Propagation",
                "Wireless Power Transfer", "Terahertz Communication", "VLSI Design", "Nanoelectronics",
                "System-on-Chip (SoC)", "MEMS/NEMS Sensors", "Biomedical Instrumentation", "IoT Sensor Networks",
                "Electric Vehicles & BMS", "Solar & Photovoltaics", "Smart Grid & Microgrids", "Power Electronics",
                "Renewable Energy Integration", "HVDC & FACTS", "Green Electronics", "Radar & Remote Sensing"
            ]
        },
        embedded: {
            title: "Embedded Systems, IoT and Robotics",
            topics: [
                "Embedded Systems Design", "Real-Time Systems", "Wireless Sensor Networks", "IoT Architectures & Protocols",
                "IoT Security", "Fog/Edge Computing", "Autonomous Robots", "Industry 5.0", "Automation",
                "Wearable Health Monitoring", "Cyber-Physical Systems", "Smart Cities", "Drone Networks",
                "Underwater Robotics"
            ]
        },
        ai: {
            title: "Artificial Intelligence and Computing",
            topics: [
                "AI, ML & Deep Learning", "Explainable AI (XAI)", "NLP & LLMs", "Generative AI",
                "Reinforcement Learning", "Big Data & Predictive Modeling", "Computer Vision",
                "Fuzzy Logic & Swarm Intelligence", "Audio & Speech Processing", "Brain-Computer Interfaces",
                "Biomedical Signal Processing", "AI in Healthcare", "Cybersecurity AI"
            ]
        },
        secure: {
            title: "Secure and Emerging Technologies",
            topics: [
                "Cyber Security & Threat Intel", "Network Security", "Privacy-Preserving ML",
                "SDN & NFV", "Blockchain & dApps", "Cloud & Edge Computing", "Quantum Cryptography",
                "Digital Twins", "AR/VR/XR", "Nano-Communication", "5G/6G Networks",
                "Green Computing", "Decentralized Identity"
            ]
        }
    };

    // Open Modal
    document.querySelectorAll('.topic-card').forEach(card => {
        card.addEventListener('click', () => {
            const topicKey = card.getAttribute('data-topic');
            const data = topicDetails[topicKey];
            if (data) {
                modalTitle.textContent = data.title;
                modalList.innerHTML = data.topics.map(t => `<li>${t}</li>`).join('');
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close Modal
    function closeAppModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeModal) closeModal.addEventListener('click', closeAppModal);

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeAppModal();
    });

    // --- Countdown Timer ---
    const deadline = new Date("June 30, 2026 23:59:59").getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const t = deadline - now;

        if (t < 0) return;

        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((t % (1000 * 60)) / 1000);

        const dEl = document.getElementById('days');
        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('minutes');
        const sEl = document.getElementById('seconds');

        if (dEl) dEl.innerText = days;
        if (hEl) hEl.innerText = hours;
        if (mEl) mEl.innerText = minutes;
        if (sEl) sEl.innerText = seconds;
    }

    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call

    // --- Intersection Observer for Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-title, .feature-card, .topic-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add the class for the animation
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
    .fade-in-up {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
    document.head.appendChild(styleSheet);
});
