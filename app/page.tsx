'use client';

import SideMenu from './components/SideMenu';
import Cursor from './components/cursor';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SnapPlugin from 'gsap';
import { Frameworks } from './components/Frameworks';
import { Globe } from './components/globe';
import SplitType from 'split-type';
import { Timeline } from './components/timeline';
import { experiences } from './components/constants'; // Adjust path if needed
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin';


gsap.registerPlugin(ScrollTrigger, SnapPlugin);
gsap.registerPlugin(ScrambleTextPlugin);


export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
const [isActive, setIsActive] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(true);
  const grid2Container = useRef<HTMLDivElement>(null);

  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef2 = useRef<HTMLDivElement>(null);
  const videoContainerRef3 = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);





  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const onLoaded = () => {
      vid.currentTime = 7;
      vid.play();
    };
    const onTimeUpdate = () => {
      if (vid.currentTime >= 15) {
        vid.currentTime = 7;
      }
    };

    vid.addEventListener('loadedmetadata', onLoaded);
    vid.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      vid.removeEventListener('loadedmetadata', onLoaded);
      vid.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);


  useEffect(() => {
    if (!videoContainerRef.current) return;

    gsap.from(videoContainerRef.current, {
      scrollTrigger: {
        trigger: videoContainerRef.current,
        start: 'top 75%',      // when top of element hits 80% down the viewport
        end: 'top 20%',        // optional: 60% down the viewport
        scrub: true,           // tie the animation to scroll position
      },
      x: '100%',               // start offscreen to the right
      rotation: 30,            // start rotated
      opacity: 0,              // fade in
      ease: 'power4.out',
    });
  }, []);

  useEffect(() => {
    if (!videoContainerRef2.current) return;
    gsap.from(videoContainerRef2.current, {
      scrollTrigger: {
        trigger: videoContainerRef2.current,
        start: 'top 75%',
        end: 'top 20%',
        scrub: true,
      },
      x: '-100%',      // slide in from left
      rotation: -30,   // rotate in from the left
      opacity: 0,
      ease: 'power4.out',
    });
  }, []);
  
  // copy for #3
  useEffect(() => {
    if (!videoContainerRef3.current) return;
    gsap.from(videoContainerRef3.current, {
      scrollTrigger: {
        trigger: videoContainerRef3.current,
        start: 'top 75%',
        end:   'top 20%',
        scrub: true,
      },
      x: '100%',
      rotation: 30,
      opacity: 0,
      ease: 'power4.out',
    });
  }, []);



  useEffect(() => {
    const lenis = new Lenis();
  
    function raf(time: number) {
      if (!scrollLocked) lenis.raf(time);
      requestAnimationFrame(raf);
    }
  
    requestAnimationFrame(raf);
  
    const unlockScroll = setTimeout(() => {
      setScrollLocked(false);
    }, 0);
  
    return () => {
      lenis.destroy();
      clearTimeout(unlockScroll);
    };
  }, [scrollLocked]);

  useEffect(() => {
    gsap.to('.fade-overlay', {
      scrollTrigger: {
        trigger: '.next-section',
        start: 'top 85%',
        end: 'top 50%',
        scrub: true,
      },
      opacity: 1,
      ease: 'none',
    });
  }, []);

  useEffect(() => {
    if (scrollLocked) {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }
  }, [scrollLocked]);

  useEffect(() => {
    gsap.from('.letter', {
      duration: 2,
      top: '100px',
      ease: 'power4.inOut',
      stagger: { amount: 0.5 },
    });

    gsap.to('.a2', {
      duration: 1,
      top: '20px',
      ease: 'power2.inOut',
      delay: 3,
    });

    gsap.to('.header', {
      duration: 4,
      scale: 2,
      ease: 'power2.inOut',
      delay: 4,
    });

    gsap.to('.circle', {
      duration: 1,
      opacity: 1,
      ease: 'power1.inOut',
      delay: 4,
    });

    gsap.to('.letter span', {
      duration: 1.5,
      opacity: 0,
      ease: 'power1.inOut',
      delay: 4.5,
    });

    const tl = gsap.timeline({ delay: 6 });
    tl.to('.circle', {
      duration: 2,
      scale: 10,
      backgroundColor: '#747472',
      ease: 'power1.inOut',
      stagger: 0.1,
    });
    tl.to(
      '.a .circle',
      {
        duration: 2,
        top: '48px',
        left: '-180px',
        ease: 'power1.inOut',
      },
      0
    );
    tl.to(
      ['.a .circle', '.a2 .circle'],
      {
        duration: 1,
        opacity: 0,
        ease: 'power1.inOut',
      },
      '-=0.5'
    );

    gsap.from('.nav-items > *, .menu-toggle, .bottom-nav > *', {
      duration: 1.4,
      opacity: 0,
      x: 40,
      ease: 'power3.inOut',
      delay: 7,
      stagger: 0.2,
    });

    gsap.from('.side-menu-container', {
      duration: 1.4,
      opacity: 0,
      x: 40,
      ease: 'power3.inOut',
      delay: 7,
    });

    gsap.to('.side-svg', {
      duration: 1,
      opacity: 1,
      ease: 'power1.inOut',
      delay: 7.2,
    });
    
  }, []);

  useEffect(() => {
    const split = new SplitType('.grid-1 p', { types: 'words' });
  
    gsap.fromTo(
      '.grid-1 .word',
      { color: '#4b5563' },
      {
        color: '#ffffff',
        scrollTrigger: {
          trigger: '.grid-1',
          start: 'top 100%',
          end: 'bottom 20%',
          scrub: 0.5,
          invalidateOnRefresh: true
        },
        stagger: 0.1,
        ease: 'none',
      }
    );
  
    return () => {
      split.revert();
    };
  }, []);

  useEffect(() => {
    // one timeline: slide + mask
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.grid-2',
        start:  'top 100%',
        end:    'top 20%',
        scrub:  1.2,
      }
    });
  
    // 1) slide in from right + fade up opacity
    tl.fromTo(
      '.about-me-text',
      { x: window.innerWidth, opacity: 0 },
      { x: 0,               opacity: 1, ease: 'none' },
      0 // both start at time‑0 of the timeline
    );
  
    // 2) mask reveal from 0% → 100%
    tl.to(
      '.about-me-text',
      { '--mask': '100%', ease: 'none' },
      0 // also at time‑0, scrubs in perfect lockstep with slide
    );
  
    // cleanup
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);
  useEffect(() => {
    const marqueeEl = document.querySelector('.experience-track');
    if (!marqueeEl) return;
  
    const tl = gsap.timeline({ repeat: -1, paused: true });
    tl.to(marqueeEl, {
      xPercent: -100,
      duration: 50,
      ease: 'linear',
    });
  
    tl.play(); // start in default direction
  
    let lastScroll = window.scrollY;
  
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDown = currentScroll > lastScroll;
      lastScroll = currentScroll;
  
      // scrollDown → forward (right)
      // scrollUp → reverse (left)
      tl.timeScale(scrollDown ? 1 : -1);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      tl.kill();
    };
  }, []);



  const letterConfig = [
    { char: 'v', cls: 'v', hasCircle: false },
    { char: 'a', cls: 'a', hasCircle: true },
    { char: 'a', cls: 'a2', hasCircle: true },
    { char: 'r', cls: 'r', hasCircle: false },
    { char: 'i', cls: 'i', hasCircle: false },
    { char: 'n', cls: 'n', hasCircle: false },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500); // give the DOM time to fully render the new section
  
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const gpaEl = document.querySelector('.gpa-number');
    const container = document.querySelector('.grid-4');
  
    if (!gpaEl || !container) return;
  
    let counter = { val: 0 };
    let tween: gsap.core.Tween | null = null;
  
    const playAnimation = () => {
      counter = { val: 0 }; // reset each time
      tween?.kill();
  
      tween = gsap.to(counter, {
        val: 3.7,
        duration: 2,
        ease: 'power2.out',
        snap: { val: 0.1 },
        onUpdate: () => {
          gpaEl.textContent = counter.val.toFixed(1) + '+ GPA';
        },
      });
    };
  
    container.addEventListener('mouseenter', playAnimation);
  
    return () => {
      container.removeEventListener('mouseenter', playAnimation);
      tween?.kill();
    };
  }, []);

  

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }, []);

  useEffect(() => {
    const tween = gsap.to('.projects-title', {
      /* animate our CSS variable from 0% → 100% */
      '--reveal': '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.projects-title-container',
        start: 'top 80%',
        end:   'top 20%',
        scrub: true,
      },
    });
  
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  useEffect(() => {
    // slide in from 50px right → 0 as you scroll
    const slideTween = gsap.fromTo(
      '.projects-title',
      { x: 60 },      // start 50px to the right
      {
        x: 0,         // end at natural position
        ease: 'none',
        scrollTrigger: {
          trigger: '.projects-title-container',
          start: 'top 80%',
          end:   'top 30%',
          scrub: true,
        },
      }
    );

    return () => {
      slideTween.scrollTrigger?.kill();
      slideTween.kill();
    };
  }, []);

  
  useEffect(() => {
    const track = document.getElementById("image-track");
    if (!track) return;
  
    const handleOnDown = (e: MouseEvent | Touch) =>
      (track.dataset.mouseDownAt = `${e.clientX}`);
  
    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage || "0";
    };
  
    const handleOnMove = (e: MouseEvent | Touch) => {
      if (track.dataset.mouseDownAt === "0") return;
    
      const mouseDelta = parseFloat(track.dataset.mouseDownAt || "0") - e.clientX;
      const maxDelta = window.innerWidth / 2;
    
      const percentage = (mouseDelta / maxDelta) * -100;
      const prevPercentage = parseFloat(track.dataset.prevPercentage || "0");
      const nextPercentageUnconstrained = prevPercentage + percentage;
    
      // Limit based on how much track overflows the screen
      const trackWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      const maxScroll = ((trackWidth - windowWidth) / trackWidth) * -100;
    
      const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), maxScroll);
    
      track.dataset.percentage = `${nextPercentage}`;
    
      track.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
      );
    
      for (const image of track.getElementsByClassName("image") as any) {
        image.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
            width: '40vmin',
            height: '56vmin',
            borderRadius: '1rem',
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    };
  
    // Event bindings
    window.addEventListener("mousedown", handleOnDown as any);
    window.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]));
    window.addEventListener("mouseup", handleOnUp);
    window.addEventListener("touchend", (e) => handleOnUp());
    window.addEventListener("mousemove", handleOnMove as any);
    window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
  
    return () => {
      window.removeEventListener("mousedown", handleOnDown as any);
      window.removeEventListener("touchstart", (e) => handleOnDown(e.touches[0]));
      window.removeEventListener("mouseup", handleOnUp);
      window.removeEventListener("touchend", (e) => handleOnUp());
      window.removeEventListener("mousemove", handleOnMove as any);
      window.removeEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
    };
  }, []);

    useEffect(() => {
          // use the imported SplitType at the top of the file
          gsap.registerPlugin(ScrollTrigger);
          new SplitType(".item h1", { types: "chars" });
    const chars = document.querySelectorAll(".item h1 .char");
  
    gsap.fromTo(
      chars,
      { fontWeight: 100 },
      {
        fontWeight: 900,
        duration: 1,
        ease: "none",
        stagger: {
          each: 0.35,
          from: "end",
          ease: "linear",
        },
        scrollTrigger: {
          trigger: ".marquee-container",
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );
  }, []);
  
  useEffect(() => {
    const svg = document.querySelector("#contact-svg") as SVGSVGElement;
    if (!svg) return;
  
    const mouse = svg.createSVGPoint();
    const leftEye = createEye("#left-eye");
    const rightEye = createEye("#right-eye");
  
    function onFrame() {
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const point = mouse.matrixTransform(ctm.inverse());
      leftEye.rotateTo(point);
      rightEye.rotateTo(point);
    }
  
    function onMouseMove(event: MouseEvent) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      requestAnimationFrame(onFrame);
    }
  
    function createEye(selector: string) {
      const element = document.querySelector(selector) as SVGGElement;
      gsap.set(element, { transformOrigin: "center" });
  
      const bbox = element.getBBox();
      const centerX = bbox.x + bbox.width / 2;
      const centerY = bbox.y + bbox.height / 2;
  
      function rotateTo(point: DOMPoint) {
        const dx = point.x - centerX;
        const dy = point.y - centerY;
        const angle = Math.atan2(dy, dx);
        gsap.to(element, { rotation: angle + "_rad_short", duration: 0.3 });
      }
  
      return { rotateTo };
    }
  
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);


  useEffect(() => {
    const textElements = document.querySelectorAll(".text");
  
    textElements.forEach((element) => {
      const innerText = element.textContent || '';
      element.innerHTML = '';
  
      const container = document.createElement('div');
      container.classList.add('block');
  
      for (const char of innerText) {
        const span = document.createElement('span');
        span.innerText = char.trim() === '' ? '\u00A0' : char;
        span.classList.add('letter');
        container.appendChild(span);
      }
  
      element.appendChild(container);
      element.appendChild(container.cloneNode(true));
    });
  
    textElements.forEach((el) => {
      el.addEventListener("mouseover", () => {
        el.classList.remove("play");
      });
    });
  
    return () => {
      textElements.forEach((el) => {
        el.removeEventListener("mouseover", () => {
          el.classList.remove("play");
        });
      });
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'none' }, delay: 8.5 });
  
    // Fade in the spans instantly at 7s
    tl.to(['#scramble-text-1', '#scramble-text-2'], {
      opacity: 1,
      duration: 0.01, // instant fade-in
    });
  
    // Start the scramble effect
    tl.to('#scramble-text-1', {
      scrambleText: {
        text: 'Software Engineer',
        chars: 'upperAndLowerCase',
        speed: 0.8,
      },
      duration: 1,
    }).to('#scramble-text-2', {
      scrambleText: {
        text: 'Data Scientist',
        chars: 'upperAndLowerCase',
        speed: 0.8,
      },
      duration: 1,
    });
  }, []);

  useEffect(() => {
    const blocker = document.getElementById('initial-blocker');
    if (!blocker) return;
  
    const timeout = setTimeout(() => {
      blocker.classList.add('opacity-0');
      setTimeout(() => {
        blocker.style.display = 'none';
      }, 600); // match fade duration to hide element fully
    }, 400); // fade starts after 1 second
  
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const refs = [textRef1, textRef2, textRef3];
  
    refs.forEach((ref) => {
      if (!ref.current) return; // ✅ skip if ref is not ready
  
      const split = new SplitType(ref.current, {
        types: 'lines',
        lineClass: 'lineChild',
      });
  
      gsap.from(split.lines, {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
          end: 'bottom top',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        stagger: 0.07,
        duration: 1,
        ease: 'power4.out',
      });
    });
  }, []);

  return (

    
    
<div data-lenis-scroll className="scroll-wrapper overflow-x-hidden">
<div
  id="initial-blocker"
  className="fixed inset-0 bg-black z-[9999] pointer-events-none opacity-100"
></div>
      <section className="landing">
      <div className="side-menu-container fixed top-0 left-0 z-[999]">
  <SideMenu />
</div>
        <Cursor />
        <div className="svg-wrapper">
          <img
            src="/Untitled design.svg"
            alt="Decorative SVG"
            className="side-svg parallax"
            style={{ opacity: 0 }}
          />
          <div className="fade-overlay" />
        </div>
        <div className="absolute top-[35%] right-[10vw] z-0 text-white leading-[1.1] space-y-4 text-right pointer-events-auto">
  <h2 className="text-[5.5vw] font-semibold">
    <span id="scramble-text-1" className="inline-block opacity-0">Software Engineer</span>
  </h2>
  <h2 className="text-[5.5vw] font-semibold">
    <span id="scramble-text-2" className="inline-block opacity-0">Data Scientist</span>
  </h2>
</div>



        <div className="container">
          <nav>
            <div className="x">
              <div className="nav-items">
                <div id="logo">
                  <a href="#">
                    Vaarin
                    <br />
                    Jain
                  </a>
                </div>
                <div className="portfolio">
                  <a href="#">PORTFOLIO</a>
                </div>
              </div>
            </div>
          </nav>
          <div
            className="header z-9998"
            style={{ justifyContent: 'center', transform: 'translateX(90px)'}}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
          >
            {letterConfig.map(({ char, cls, hasCircle }, i) => (
              <div className="letter-wrap" key={i}>
                <div className={`letter ${cls}`}>
                  <span>{char}</span>
                  {hasCircle && <div className="circle" />}
                </div>
                <div className="letter-reveal" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-section section-spacing c-space">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[14rem] mt-12">
          <div className="grid-1 relative overflow-hidden p-6  rounded-2xl bg-[#161719]">

            <div className="z-10">
              
              <p className="text-2xl text-gray-500">
              A computer science student at Rutgers University with a  passion for building scalable software and data-driven solutions. I’ve worked on everything from full-stack web apps to machine learning pipelines, combining tools like Java, Python, React, and Spring Boot to turn ideas into real products. Whether it’s improving a prediction model, deploying a responsive UI, or mentoring peers as a teaching assistant, I love solving problems that make an impact. I’m always looking to learn, build, and collaborate on meaningful tech.
              </p>
            </div>
            <div className="absolute inset-x-0 pointer-events-none  -z-10 -bottom-4 h-1/2 sm:h-1/3 bg-[#161719]" />
          </div>

          <div className="grid-2 relative pointer-events-none bg-black !bg-black">
  <div
    ref={grid2Container}
    className="absolute inset-0 flex items-center justify-center"
  >
    <p className="about-me-text text-8xl font-bold text-white opacity-0">
      ABOUT ME
    </p>
  </div>
</div>

          <div className="grid-black-color grid-3">
            <div className="z-10 w-[50%]">
              <p className="headtext">Time Zone</p>
              <p className="subtext">
                I am Based In New Jersey, And Open To Travel Or Work Remote Nation-Wide!
              </p>
            </div>
            <figure className="absolute left-[30%] top-[10%]">
              <Globe />
            </figure>
          </div>

          <div className="grid-4 group relative overflow-hidden ">
  <div className="w-full h-full flex items-center justify-center text-center">
    <div className="relative w-full">
      {/* Default text */}
      <p className="text-2xl text-gray-500 group-hover:opacity-0 transition-opacity duration-300">
        MAJOR - COMPUTER SCIENCE
        <br />
        MINOR - DATA SCIENCE
      </p>

      {/* GPA text on hover */}
      <p
        className="gpa-number text-7xl font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex items-center justify-center tracking-[-0.04em]"
        style={{ fontFamily: 'DM Mono, monospace' }}
      >
        0.0+ GPA
      </p>
    </div>
  </div>
</div>
          <div className="grid-default-color grid-5">
            <div className="z-10 w-[50%]">
              <p className="headtext">Tech Stack</p>
              <p className="subtext">
                I am Profiecient In Java, Python, Spring Boot, JavaScript/React.Js/Node.Js/Next.Js, Python—Tools For 
                Machine Learning, R, SQL and many more!
              </p>
            </div>
            <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-110">
              <Frameworks />
            </div>
          </div>
        </div>
      </section>

       {/* Experience Section */}
       <section id="experience" className="experience-section bg-[black] ">
       <div className="experience-marquee-wrapper mt-20 overflow-hidden w-full h-[80px] relative">
          <div className="experience-track flex gap-10 text-6xl font-bold whitespace-nowrap will-change-transform px-10 text-white">
            EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE
          </div>
        </div>
        <div className="pt-32 pb-[100vh]">
          <Timeline data={experiences} />
        </div>
      </section>

      
      
{/* Projects Section */}
    <section id= "projects" className="project-section px-8">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row items-start">
        <div className="projects-title-container w-full md:w-1/2 overflow-hidden pt-20 pl-24">
          <h1 className="projects-title" data-text="PROJECTS">
            PROJECTS
          </h1>
        </div>
        <div className="w-full md:w-1/2" />
      </div>

      {/* Project 1 */}
      <div className="md:flex md:flex-row w-full">
        <div className="w-full md:w-1/2 flex items-center justify-center px-8">
          <div ref={textRef1} className="text-center pt-32 force-margin max-w-2xl text-white overflow-hidden">
            <h2 className="text-3xl mb-4">Skn Spark</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              A responsive and user-friendly skincare questionnaire built with React, designed to collect personalized
              skin data for ML-based prediction on Quantum Frequency Skin Care. The interface guides users through
              dynamic questions and seamlessly integrates with a Python backend to suggest skincare items using the
              recommendation model.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 py-40 mt-[150px] overflow-visible">
          <div ref={videoContainerRef} className="video-offset translate-x-[-20px]">
            <video
              ref={videoRef}
              loop
              autoPlay
              muted
              playsInline
              className="rounded-2xl w-full h-auto object-contain transition-all duration-500 hover:shadow-[0_0_40px_#a8d1cd]"
            >
              <source src="/video 2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Project 2 */}
      <div className="md:flex md:flex-row w-full">
        <div className="w-full md:w-1/2 py-40 mt-[220px] overflow-visible">
          <div ref={videoContainerRef2} className="video-offset translate-x-[20px]">
            <video
              ref={videoRef2}
              loop
              autoPlay
              muted
              playsInline
              className="rounded-2xl w-full h-auto object-contain transition-all duration-500 hover:shadow-[0_0_40px_#a8d1cd]"
            >
              <source src="/2nd.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center px-8">
          <div ref={textRef2} className="text-center pt-32 force-margin max-w-2xl text-white overflow-hidden">
            <h2 className="text-3xl mb-4">EnterJain Social Media</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              A full-stack social media platform built using Java Spring Boot and React. Features include user
              authentication via Firebase, post creation, and real-time feed updates. Deployed on Heroku with a MySQL
              backend, the app showcases end-to-end system design from REST APIs to responsive UI components.
            </p>
          </div>
        </div>
      </div>

      {/* Project 3 */}
      <div className="md:flex md:flex-row w-full">
        <div className="w-full md:w-1/2 flex items-center justify-center px-8">
          <div ref={textRef3} className="text-center pt-32 force-margin max-w-2xl text-white overflow-hidden">
            <h2 className="text-3xl mb-4">Nutrition LLM App</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              An AI-powered assistant that answers user nutrition questions using Retrieval-Augmented Generation (RAG).
              Built with Python, LangChain, spaCy, and Hugging Face LLMs, the app performs semantic search over
              domain-specific datasets to generate contextually relevant responses and improve precision by 25%.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 py-40 mt-[290px] overflow-visible">
          <div ref={videoContainerRef3} className="video-offset translate-x-[-20px]">
            <img
              src="/rag.png"
              alt="Nutrition LLM App screenshot"
              className="image pointer-events-auto transition-all duration-500 hover:shadow-[0_0_40px_#a8d1cd]"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '100% center',
                borderRadius: '1rem',
                display: 'block',
              }}
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
{/* Intrests Section */}
<section id= "interests" className="interest-section section-spacing relative z-10 overflow-hidden" style={{ backgroundColor: 'black' }}>
<div className="marquee-container flex  justify-center absolute top-[5%] left-0 w-full h-full pointer-events-none z-10">
    <div className="marquee">
      <div className="item with-text">
        <h1 className="interest-title">INTERESTS</h1>
      </div>
    </div>
  </div>
  <div className="w-full flex justify-center pl-[5vw]">
  <div
  id="image-track"
  data-mouse-down-at="0"
  data-prev-percentage="0"
  className="absolute left-0 top-1/2 flex gap-[4vmin] select-none translate-y-[-1/2]"
  style={{ transform: "translate(0%, -50%)" }}
>
  {[
    { src: '/photo1.jpg', label: 'Table Tennis' },
    { src: '/photo2.webp', label: 'Stock Day Trading' },
    { src: '/photo3.webp', label: 'Soccer' },
    { src: '/photo4.jpg', label: 'Pizza Making' },
    { src: '/photo5.webp', label: 'Photography' },
    { src: '/photo6.avif', label: 'Driving' },
    { src: '/6.jpg', label: 'WeightLifting' },
    { src: '/photo80.jpg', label: 'Expresso' },
  ].map(({ src, label }, i) => (
    <div
      key={i}
      className="flex flex-col items-center justify-start overflow-hidden"
      style={{
        width: "40vmin",
        height: "56vmin",
      }}
    >
      <img
        src={src}
        alt={label}
        className="image pointer-events-none"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "100% center",
          borderRadius: "1rem",
          display: "block",
        }}
        draggable="false"
      />
      <p
        className="mt-4 text-center text-white text-base  tracking-wide"
        style={{
          fontFamily: "'Satoshi', sans-serif",
          textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </p>
    </div>
  ))}
</div>

  </div>
</section>

<section id="contact" className="contact-section bg-[#a8d1cd] text-black relative z-10 min-h-screen w-full flex items-center justify-center px-[4vw]">
  <div className="flex flex-col items-center space-y-[2vw]">
    {/* Top Row - LinkedIn */}
    <div className="text-[7.5vw] font-bold uppercase font-[Confillia] text-[#0f0f0f] leading-none text-center">
      <a  href="https://www.linkedin.com/in/vaarinjain"
  target="_blank"
  rel="noopener noreferrer"
  className="relative overflow-hidden h-[7.5vw] group block">
        <span className="block transition-transform duration-300 group-hover:-translate-y-full will-change-transform">
          LinkedIn
        </span>
        <span className="absolute top-full left-0 w-full block transition-transform duration-300 group-hover:-translate-y-full will-change-transform">
          LinkedIn
        </span>
      </a>
    </div>

    {/* Middle Row - Github & Gmail */}
    <div className="relative z-10 flex gap-[4vw] text-[7.5vw] font-bold uppercase font-[Confillia] text-[#0f0f0f] leading-none text-center">
    {["Github", "Gmail"].map((label) => {
  const href =
    label === "Github"
      ? "https://github.com/Vaarin-J"
      : "mailto:vaarinjain@gmail.com";

  return (
    <a
      key={label}
      href={href}
      target={label === "Gmail" ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className="relative overflow-hidden h-[7.5vw] group block"
    >
      <span className="block transition-transform duration-300 group-hover:-translate-y-full will-change-transform">
        {label}
      </span>
      <span className="absolute top-full left-0 w-full block transition-transform duration-300 group-hover:-translate-y-full will-change-transform">
        {label}
      </span>
    </a>
  );
})}
    </div>
   
    {/* Bottom Row - Instagram */}
    <div className="text-[7.5vw] font-bold uppercase font-[Confillia] text-[#0f0f0f] leading-none text-center">
      <a href=" https://www.instagram.com/jain_street/"
  target="_blank"
  rel="noopener noreferrer" className="relative overflow-hidden h-[7.5vw] group block">
        <span className="block transition-transform duration-300 group-hover:-translate-y-full will-change-transform">
          Instagram
        </span>
        <span className="absolute top-full left-0 w-full block transition-transform duration-300 group-hover:-translate-y-full will-change-transform">
          Instagram
        </span>
      </a>
    </div>
  </div>

  {/* SVG Eyes */}
  <svg
    id="contact-svg"
    viewBox="0 0 1000 1000"
    className="absolute w-full max-w-[800px] h-auto pointer-events-none z-20"
  >
    <g id="left-eye">
    <circle
  className="eye-outer"
  cx="400"
  cy="500"
  r="100"
  stroke="#0f0f0f"
  strokeWidth="2"
  fill="rgba(255, 255, 255, 0.95)"
/>
      <circle className="eye-inner" cx="480" cy="500" r="20" fill="#0f0f0f" />
    </g>
    <g id="right-eye">
      <circle
        className="eye-outer"
        cx="600"
        cy="500"
        r="100"
        stroke="#0f0f0f"
        strokeWidth="2"
        fill="rgba(255, 255, 255, 0.95)"
        />
      <circle className="eye-inner" cx="680" cy="500" r="20" fill="#0f0f0f" />
    </g>
  </svg>
</section>
</div>
  );
}
