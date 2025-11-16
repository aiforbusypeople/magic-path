import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MoreHorizontal, ChevronDown, Play } from 'lucide-react';
type AILandingPageProps = Record<string, never>;
const fadeInUp = {
  initial: {
    opacity: 0,
    y: 30
  },
  whileInView: {
    opacity: 1,
    y: 0
  },
  viewport: {
    once: true,
    margin: "-100px"
  },
  transition: {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1]
  }
};

// Floating video/image breakout component
const FloatingMedia = ({
  type = 'image',
  side = 'left',
  offsetY = 0,
  rotation = 2,
  caption,
  size = 'medium'
}: {
  type?: 'image' | 'video';
  side?: 'left' | 'right';
  offsetY?: number;
  rotation?: number;
  caption?: string;
  size?: 'small' | 'medium' | 'large';
}) => {
  const sizeClasses = {
    small: 'w-[180px] h-[320px]',
    medium: 'w-[220px] h-[391px]',
    large: 'w-[260px] h-[462px]'
  };
  const ref = React.useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  return <motion.div ref={ref} className={`absolute ${side === 'left' ? 'left-8 lg:left-16' : 'right-8 lg:right-16'} hidden lg:block`} style={{
    y,
    opacity,
    top: `${offsetY}px`,
    rotate: rotation,
    display: "none"
  }}>
      <motion.div className={`${sizeClasses[size]} bg-white rounded-lg shadow-xl border-4 border-white overflow-hidden`} whileHover={{
      scale: 1.05,
      rotate: 0,
      transition: {
        duration: 0.3
      }
    }} style={{
      display: "none"
    }}>
        {type === 'video' ? <div className="relative w-full h-full bg-gradient-to-br from-[#F4D16F]/30 to-[#006C41]/20 flex items-center justify-center" style={{
        display: "none"
      }}>
            <div className="absolute inset-0 flex items-center justify-center" style={{
          display: "none"
        }}>
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 text-[#006C41] ml-1" fill="#006C41" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-black/20 backdrop-blur-sm rounded px-2 py-1">
              <p className="text-white text-xs font-medium" style={{
            display: "none"
          }}>video</p>
            </div>
          </div> : <div className="w-full h-full bg-gradient-to-br from-[#F4D16F]/20 to-[#006C41]/10 flex items-center justify-center" style={{
        display: "none"
      }}>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#006C41]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#006C41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              {caption && <p className="text-[10px] text-[#6A6255]/60 px-2">{caption}</p>}
            </div>
          </div>}
      </motion.div>
      {caption && type === 'video' && <p className="text-xs text-[#6A6255]/70 mt-2 text-center font-light max-w-[280px]">{caption}</p>}
    </motion.div>;
};
const CTALink = ({
  children,
  href = '#'
}: {
  children: React.ReactNode;
  href?: string;
}) => {
  return <motion.a href={href} className="inline-flex items-center gap-2 text-[#006C41] font-medium border-b-2 border-[#006C41] pb-1 transition-all duration-300 hover:border-[#005533] hover:text-[#005533]" whileHover={{
    gap: '12px',
    y: -2
  }} transition={{
    duration: 0.3
  }}>
      {children}
      <ArrowRight className="w-4 h-4" />
    </motion.a>;
};
const PolaroidStack = () => {
  const polaroids = [{
    id: 1,
    caption: "Workshop Day 1",
    rotation: -8
  }, {
    id: 2,
    caption: "Team Collaboration",
    rotation: 5
  }, {
    id: 3,
    caption: "Live Training",
    rotation: -3
  }] as any[];
  return <div className="relative w-full max-w-[320px] h-[400px] mx-auto lg:float-right lg:ml-12 mb-8">
      {polaroids.map((polaroid, idx) => {
      const scrollRef = React.useRef(null);
      const {
        scrollYProgress
      } = useScroll({
        target: scrollRef,
        offset: ["start end", "end start"]
      });
      const y = useTransform(scrollYProgress, [0, 1], [100 + idx * 40, -(idx * 60)]);
      const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [polaroid.rotation + 15, polaroid.rotation, polaroid.rotation - 5]);
      const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
      return <motion.div key={polaroid.id} ref={scrollRef} className="absolute top-0 left-0 w-full" style={{
        y,
        rotate,
        opacity,
        zIndex: idx
      }}>
            <motion.div className="bg-white p-4 pb-12 shadow-xl rounded-sm" whileHover={{
          scale: 1.05,
          zIndex: 10,
          rotate: 0,
          transition: {
            duration: 0.3
          }
        }}>
              <div className="w-full aspect-square bg-gradient-to-br from-[#F4D16F]/20 to-[#006C41]/10 rounded-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#006C41]/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#006C41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-[#6A6255]/60">Team Photo</p>
                </div>
              </div>
              <p className="text-center mt-3 text-sm font-medium text-[#6A6255] font-handwriting">
                {polaroid.caption}
              </p>
            </motion.div>
          </motion.div>;
    })}
    </div>;
};

// @component: AILandingPage
export const AILandingPage = (props: AILandingPageProps) => {
  const [moreMenuOpen, setMoreMenuOpen] = React.useState(false);
  const {
    scrollY
  } = useScroll();
  const logoRotate = useTransform(scrollY, [0, 1000], [0, 360]);

  // @return
  return <div className="min-h-screen bg-[#FEFAF1] text-[#6A6255] relative overflow-x-hidden">
      {/* Simple Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FEFAF1]/80 backdrop-blur-sm border-b border-[#6A6255]/10">
        <div className="w-full px-4 sm:px-8 lg:px-16 py-6 flex items-center justify-between">
          <a href="#" className="block hover:opacity-80 transition-opacity">
            <motion.svg width="40" height="40" viewBox="0 0 312 312" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            rotate: logoRotate
          }}>
              <path d="M129 0H183C190.18 0 196 5.82029 196 13V129H299C306.18 129 312 134.82 312 142V170C312 177.18 306.18 183 299 183H196V299C196 306.18 190.18 312 183 312H129C121.82 312 116 306.18 116 299V183H13C5.82029 183 0 177.18 0 170V142C0 134.82 5.82029 129 13 129H116V13C116 5.82029 121.82 0 129 0Z" fill="#F4D16F" />
            </motion.svg>
          </a>
          <div className="flex items-center gap-6">
            <a href="#team-training" className="text-base font-medium hover:text-[#006C41] transition-colors">
              Team Training
            </a>
            <a href="#ai-strategy" className="text-base font-medium hover:text-[#006C41] transition-colors">
              AI Strategy
            </a>
            <a href="#ai-tools" className="text-base font-medium hover:text-[#006C41] transition-colors">
              AI Tools
            </a>
            <a href="#toolbox" className="text-base font-medium hover:text-[#006C41] transition-colors">
              Toolbox
            </a>
            <div className="relative">
              <button onClick={() => setMoreMenuOpen(!moreMenuOpen)} className="flex items-center gap-1 text-base font-medium hover:text-[#006C41] transition-colors">
                <MoreHorizontal className="w-5 h-5" />
                <ChevronDown className={`w-4 h-4 transition-transform ${moreMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {moreMenuOpen && <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#6A6255]/10 py-2">
                  <a href="#about" className="block px-4 py-2 text-base hover:bg-[#F4D16F]/10 hover:text-[#006C41] transition-colors">
                    About Us
                  </a>
                  <a href="#contact" className="block px-4 py-2 text-base hover:bg-[#F4D16F]/10 hover:text-[#006C41] transition-colors">
                    Contact Us
                  </a>
                  <a href="#blog" className="block px-4 py-2 text-base hover:bg-[#F4D16F]/10 hover:text-[#006C41] transition-colors">
                    Blog
                  </a>
                  <a href="#resources" className="block px-4 py-2 text-base hover:bg-[#F4D16F]/10 hover:text-[#006C41] transition-colors">
                    Resources
                  </a>
                </div>}
            </div>
            
            <motion.a href="#message-ben" className="flex items-center gap-2 bg-[#006C41] text-white px-4 py-2 rounded-full font-medium hover:bg-[#005533] transition-colors ml-4" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.98
          }}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F4D16F] to-[#F4A16F] border-2 border-white flex items-center justify-center overflow-hidden shadow-md">
                <span className="text-[#006C41] font-bold text-sm">B</span>
              </div>
              <span>Message Ben</span>
            </motion.a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section className="min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16 pt-32 pb-48 relative" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1]
    }}>
        {/* Floating media elements near hero */}
        <FloatingMedia type="video" side="left" offsetY={200} rotation={-3} caption="See AI in action" size="medium" />
        <FloatingMedia type="image" side="right" offsetY={500} rotation={2} caption="Real results" size="medium" />

        <div className="text-center relative z-10">
          <h1 className="text-[12vw] md:text-[10vw] lg:text-[9vw] font-bold leading-[0.9] tracking-tight mb-12">
            Put AI to
            <br />
            Work
          </h1>
          <motion.p className="text-2xl sm:text-3xl lg:text-4xl leading-[1.4] font-light max-w-[800px] mx-auto mb-4" {...fadeInUp}>
            Use AI to lift your team, improve your operations, and grow your business.
          </motion.p>
          <motion.p className="text-xl sm:text-2xl font-light text-[#006C41]" style={{
          rotate: -2
        }} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }}>
            with AI for Busy People
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content - Positioned relative for absolute floating elements */}
      <main className="w-full px-4 sm:px-8 lg:px-16 pb-32 relative">
        {/* Floating media throughout main content */}
        <FloatingMedia type="video" side="right" offsetY={100} rotation={3} size="large" />
        <FloatingMedia type="image" side="left" offsetY={800} rotation={-2} size="medium" />
        <FloatingMedia type="image" side="right" offsetY={2200} rotation={-3} size="medium" />
        <FloatingMedia type="video" side="right" offsetY={3000} rotation={2} size="medium" />
        <FloatingMedia type="image" side="left" offsetY={3600} rotation={-1} size="large" />

        <div className="max-w-[900px] mx-auto">
          {/* Problem statement through "What we do" */}
          <motion.div {...fadeInUp} className="mb-48 max-w-[600px] mx-auto">
            <div className="text-2xl leading-[1.6] font-light space-y-8 text-left">
              <p className="text-3xl font-bold leading-tight">You know your business should be running smoother than it is.</p>
              <p className="text-3xl leading-tight">You work hard. Your team works hard.</p>
              <p className="text-3xl leading-tight">But the pace has picked up.</p>
              <p className="text-3xl leading-tight">Clients expect more.</p>
              <p className="text-3xl leading-tight">Margins feel tight.</p>
              <p className="text-3xl leading-relaxed">And every month you lose hours to work that should be handled by smarter systems.</p>
              <p className="text-3xl leading-normal">You want more freedom, not more pressure.</p>
              <p className="text-3xl leading-normal">You want a team that moves with confidence.</p>
              <p className="text-3xl leading-normal">You want profit without the grind.</p>
              <p className="text-3xl leading-normal">You want a business that doesn't slow down the moment you step away.</p>
              <p className="text-3xl font-bold text-[#006C41] pt-4">
                This is exactly what we help you build.
              </p>
            </div>
          </motion.div>

          {/* What we do */}
          <motion.div {...fadeInUp} className="mb-32 max-w-[600px] mx-auto">
            <div className="text-2xl leading-[1.6] font-light space-y-8 text-left">
              <p className="text-3xl font-bold">What we do</p>
              <p className="text-3xl">
                We help leaders{' '}
                <span className="inline-flex items-center mx-2 -space-x-3">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-[#FEFAF1] flex items-center justify-center text-white text-sm font-medium shadow-md">
                    A
                  </span>
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-[#FEFAF1] flex items-center justify-center text-white text-sm font-medium shadow-md">
                    B
                  </span>
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-[#FEFAF1] flex items-center justify-center text-white text-sm font-medium shadow-md">
                    C
                  </span>
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-[#FEFAF1] flex items-center justify-center text-white text-sm font-medium shadow-md">
                    D
                  </span>
                </span>{' '}
                modernise their business with practical AI.
              </p>
              <p className="text-3xl">Clear systems. Faster output. Fewer mistakes.</p>
              <p className="text-3xl">Nothing fancy. Nothing confusing.</p>
              <p className="text-3xl">Work becomes lighter and the business becomes easier to run.</p>
              <p className="text-3xl pt-4">We do that through three simple paths:</p>
            </div>
          </motion.div>
        </div>

        {/* Three paths - FULL WIDTH SECTIONS */}
        <motion.div {...fadeInUp} className="mb-32">
          {/* AI Strategy - Full Width */}
          <div className="mb-32 bg-white/30 py-20 px-4 sm:px-8 lg:px-16">
            <div className="max-w-[900px] mx-auto">
              <h3 className="text-5xl leading-[1.1] font-bold mb-8 tracking-tight">AI Strategy</h3>
              <div className="text-2xl leading-[1.6] font-light space-y-6 mb-8">
                <p>A working plan tied to your goals.</p>
                <p>Built on your systems and what your team can use right now.</p>
                <p>The fastest way to get clarity and stop wasting time on guesswork.</p>
              </div>
              <div className="clear-both pt-6">
                <CTALink>Explore AI Strategy</CTALink>
              </div>
            </div>
          </div>

          {/* AI Training - Full Width */}
          <div className="mb-32 py-20 px-4 sm:px-8 lg:px-16 clear-both">
            <div className="max-w-[900px] mx-auto">
              <h3 className="text-5xl leading-[1.1] font-bold mb-8 tracking-tight">AI Training for Teams</h3>
              <PolaroidStack />
              <div className="text-2xl leading-[1.6] font-light space-y-6 mb-8">
                <p>Delegation Days.</p>
                <p>Hands-on training that upgrades how your people work.</p>
                <p>Real tasks. Real improvements.</p>
                <p>Your team leaves faster and more confident.</p>
              </div>
              <div className="clear-both pt-6">
                <CTALink>Explore AI Training</CTALink>
              </div>
            </div>
          </div>

          {/* AI Agents - Full Width */}
          <div className="mb-32 bg-white/30 py-20 clear-both">
            <div className="max-w-[900px] mx-auto px-4 sm:px-8 lg:px-16">
              <h3 className="text-5xl leading-[1.1] font-bold mb-8 tracking-tight">AI Agents and Tools</h3>
              <div className="text-2xl leading-[1.6] font-light space-y-6 mb-12">
                <p>Smart systems that take on the repetitive computer work crushing productivity.</p>
                <p>Pick proven agent templates, customise them, and we build them to fit your workflow.</p>
              </div>
            </div>
            
            {/* Horizontal scrolling agent cards */}
            <div className="w-full overflow-x-auto scrollbar-hide mb-8">
              <div className="flex gap-6 sm:gap-8 min-w-max px-4 sm:px-8 lg:px-16 py-8">
                {[{
                label: 'Email Automation',
                rotation: -2
              }, {
                label: 'Calendar & Schedule Management',
                rotation: 1.5
              }, {
                label: 'Meeting Preparation',
                rotation: -1
              }, {
                label: 'Sales List Building',
                rotation: 2
              }].map((agent, idx) => <motion.div key={idx} className="flex-shrink-0" initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true,
                margin: "-50px"
              }} transition={{
                duration: 0.6,
                delay: idx * 0.1
              }}>
                    <motion.div className="relative" style={{
                  rotate: agent.rotation
                }} whileHover={{
                  rotate: 0,
                  scale: 1.05
                }} transition={{
                  duration: 0.3
                }}>
                      <div className="w-[240px] sm:w-[280px] h-[280px] sm:h-[320px] bg-gradient-to-br from-[#F4D16F]/20 to-[#006C41]/10 rounded-xl border-2 border-[#6A6255]/20 shadow-lg overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
                          <div className="text-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-[#006C41]/20 flex items-center justify-center">
                              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#006C41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                            <p className="text-xs sm:text-sm text-[#6A6255]/60 font-light">Agent Preview</p>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-center text-base sm:text-lg font-medium text-[#6A6255] max-w-[240px] sm:max-w-[280px]" style={{
                    transform: `rotate(${-agent.rotation}deg)`
                  }}>
                        {agent.label}
                      </p>
                    </motion.div>
                  </motion.div>)}
              </div>
            </div>
            
            <div className="max-w-[900px] mx-auto px-4 sm:px-8 lg:px-16 pt-6">
              <CTALink>Browse AI Agents</CTALink>
            </div>
          </div>
        </motion.div>

        <div className="max-w-[900px] mx-auto px-4 sm:px-8 lg:px-16">
          {/* Proof section */}
          <motion.div {...fadeInUp} className="mb-48 clear-both">
            <h2 className="text-6xl leading-[1.1] font-bold mb-16 tracking-tight">Proof</h2>
            <p className="text-2xl leading-[1.6] font-light mb-20">
              Leaders trust us because the work delivers real outcomes.
            </p>

            <div className="space-y-16">
              <motion.blockquote className="relative bg-white/60 rounded-2xl p-10 border border-[#6A6255]/10 shadow-sm" style={{
              rotate: -0.5
            }} whileHover={{
              scale: 1.01,
              rotate: 0
            }} transition={{
              duration: 0.3
            }}>
                <p className="text-xl sm:text-2xl leading-[1.6] font-light mb-6">
                  "Ben helped us move quicker and cleaner across compliance, construction, and operations. He made AI
                  simple for the team and gave us tools we use every day."
                </p>
                <cite className="text-lg font-medium not-italic text-[#006C41]">
                  CEO, Vision Infrastructure Group
                </cite>
              </motion.blockquote>

              <motion.blockquote className="relative bg-white/60 rounded-2xl p-10 border border-[#6A6255]/10 shadow-sm" style={{
              rotate: 0.5
            }} whileHover={{
              scale: 1.01,
              rotate: 0
            }} transition={{
              duration: 0.3
            }}>
                <p className="text-xl sm:text-2xl leading-[1.6] font-light mb-6">
                  "Our team went from unsure to confident in one session. We now have clean workflows and faster
                  turnaround times."
                </p>
                <cite className="text-lg font-medium not-italic text-[#006C41]">
                  Operations Manager, Professional Services
                </cite>
              </motion.blockquote>

              <motion.blockquote className="relative bg-white/60 rounded-2xl p-10 border border-[#6A6255]/10 shadow-sm" style={{
              rotate: -0.5
            }} whileHover={{
              scale: 1.01,
              rotate: 0
            }} transition={{
              duration: 0.3
            }}>
                <p className="text-xl sm:text-2xl leading-[1.6] font-light mb-6">
                  "The agents Ben built replaced hours of admin and improved accuracy across the board. Strong ROI from
                  week one."
                </p>
                <cite className="text-lg font-medium not-italic text-[#006C41]">Director, B2B Services</cite>
              </motion.blockquote>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div {...fadeInUp} className="mb-32">
            <h2 className="text-6xl leading-[1.1] font-bold mb-12 tracking-tight">
              Ready for work to feel lighter?
            </h2>
            <div className="text-2xl leading-[1.6] font-light space-y-8 mb-12">
              <p>
                If you want more freedom, stronger profit, and a team that performs without constant oversight, reach
                out.
              </p>
              <p>Send me a message with your biggest bottleneck and I'll point you in the right direction.</p>
            </div>
            <motion.a href="#" className="inline-flex items-center gap-3 bg-[#006C41] text-white px-8 py-4 rounded-full text-xl font-medium hover:bg-[#005533] transition-colors duration-300" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.98
          }}>
              Message Ben
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#6A6255] text-[#FEFAF1] py-20 px-4 sm:px-8 lg:px-16" style={{
      background: "#006c41"
    }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
            {/* Logo & Tagline */}
            <div className="lg:col-span-1">
              <motion.svg width="48" height="48" viewBox="0 0 312 312" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6">
                <path d="M129 0H183C190.18 0 196 5.82029 196 13V129H299C306.18 129 312 134.82 312 142V170C312 177.18 306.18 183 299 183H196V299C196 306.18 190.18 312 183 312H129C121.82 312 116 306.18 116 299V183H13C5.82029 183 0 177.18 0 170V142C0 134.82 5.82029 129 13 129H116V13C116 5.82029 121.82 0 129 0Z" fill="#F4D16F" />
              </motion.svg>
              <p className="text-[#FEFAF1]/80 text-base leading-relaxed">
                Practical AI for busy people who want to work smarter.
              </p>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-[#F4D16F]">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="text-[#FEFAF1]/80 hover:text-[#F4D16F] transition-colors text-base">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-[#FEFAF1]/80 hover:text-[#F4D16F] transition-colors text-base">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#message-ben" className="text-[#FEFAF1]/80 hover:text-[#F4D16F] transition-colors text-base">
                    Message Ben
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-[#F4D16F]">Services</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#training" className="text-[#FEFAF1]/80 hover:text-[#F4D16F] transition-colors text-base">
                    Training
                  </a>
                </li>
                <li>
                  <a href="#strategy" className="text-[#FEFAF1]/80 hover:text-[#F4D16F] transition-colors text-base">
                    Strategy
                  </a>
                </li>
                <li>
                  <a href="#agents" className="text-[#FEFAF1]/80 hover:text-[#F4D16F] transition-colors text-base">
                    Agents
                  </a>
                </li>
                <li>
                  <a href="#delegate-hq" className="text-[#FEFAF1]/80 hover:text-[#F4D16F] transition-colors text-base">
                    Delegate HQ
                  </a>
                </li>
                <li>
                  <a href="#toolbox" className="text-[#FEFAF1]/80 hover:text-[#F4D16F] transition-colors text-base">
                    Toolbox
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-[#F4D16F]">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#privacy" className="text-[#FEFAF1]/80 hover:text-[#F4D16F] transition-colors text-base">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="text-[#FEFAF1]/80 hover:text-[#F4D16F] transition-colors text-base">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#cookies" className="text-[#FEFAF1]/80 hover:text-[#F4D16F] transition-colors text-base">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#refund" className="text-[#FEFAF1]/80 hover:text-[#F4D16F] transition-colors text-base">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-[#FEFAF1]/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-[#FEFAF1]/60 text-sm">
                © {new Date().getFullYear()} AI for Busy People. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#linkedin" className="text-[#FEFAF1]/60 hover:text-[#F4D16F] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#twitter" className="text-[#FEFAF1]/60 hover:text-[#F4D16F] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};