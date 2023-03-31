import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { Screen } from '@/components/Screen'
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { ProjectBackground } from '@/components/ProjectBackground'

type Section = {
  id: string
  layout?: 'main' | 'section' | 'footer' | 'about'
  title: string
  description: string
  link?: string
  hidden?: boolean
  backgroundClass: string
  logo?: {
    w: number
    h: number
  }
}

const useScrollDirection = (
    activeSection: number, setActiveSection: React.Dispatch<React.SetStateAction<number>>, 
    caretPosition: number, setCaretPosition: React.Dispatch<React.SetStateAction<number>>,
    isScrolling: boolean, setIsScrolling: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const isInsideSections = (element: Element | null): boolean => {
    while (element) {
      if (element.classList && element.classList.contains('sections') || element.classList.contains('mobile_nav')) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  };
  useEffect(() => {
    let scrollTimeout: any = null;
    const handleScroll = (event: WheelEvent) => {
      if (isScrolling 
        // || isInsideSections(event.target as HTMLElement)
        ) {
        return;
      }
      caretPosition += event.deltaY / 3;
      // caretPosition min 0 max 34*sections.length
      if (caretPosition < 0) {
        caretPosition = 0;
      } else if (caretPosition > 34*(sections.length - 2)) {
        caretPosition = 34*(sections.length - 2);
      }
      setCaretPosition(caretPosition);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        let section: number = Math.round(caretPosition/34);
        // let leftOver = caretPosition%34;
        // if (leftOver > 23) {
        //   section += 1;
        // }

        setCaretPosition(section*34);
        setActiveSection(section);
      }, 200);
    };

    const handleTouchStart = (event: TouchEvent) => {
      setTouchStartY(event.touches[0].clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!touchStartY || isInsideSections(event.target as HTMLElement)) return;
      if (!touchStartY) return;

      const touchEndY = event.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > 50) { // Adjust this value for sensitivity
        if (deltaY > 0) {
          handleScrollDown();
        } else {
          handleScrollUp();
        }
        setTouchStartY(null);
        setIsScrolling(true);
        setTimeout(() => {
          setIsScrolling(false);
        }, 2000);
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      setTouchStartY(null);
    };

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, isScrolling, touchStartY]);


  // on change of activeSection, change caret position
  useEffect(() => {
    setCaretPosition(activeSection*34);
  }, [activeSection]);
  
  const handleScrollUp = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    } else {
      setActiveSection(sections.length - 2);
    }
  };

  const handleScrollDown = () => {
    if (activeSection < sections.length - 2) {
      setActiveSection(activeSection + 1);
    } else {
      setActiveSection(0);
    }
  };
};




const sections: Section[] = [
  {
    id: 'Delv',
    layout: 'main',
    title: 'The Factory for DeFi',
    description: 'Delv is developing the complete suite of decentralized finance. From core infrastructure to structured products, our protocols work together to help create and usher in the new financial system.',
    backgroundClass: 'bg-white',
  },
  {
    id: 'Element',
    title: 'Fixed rate protocol',
    description: 'It all began with Element, an open-source decentralized protocol for fixed and variable yield markets.',
    link: 'https://element.fi',
    backgroundClass: 'bg-white',
    logo: {
      w: 325,
      h: 64,
    }
  },
  {
    id: 'Council',
    title: 'Council protocol',
    description: 'Council is a decentralized governance system and suite of tools that allows a community to deploy and manage a DAO. It represents a new era of governance innovation, allowing anyone to build adaptable governance systems using the security of on-chain governance while allowing for unprecedented modularity and flexibility.',
    link: 'https://council.element.fi/',
    backgroundClass: 'bg-black',
    logo: {
      w: 400,
      h: 52,
    }
  },
  {
    id: 'Elfiverse',
    title: 'NFTs meet DeFi',
    description: 'The lore of the Element DAO was born with Elfiverse – an endeavor to intersect the DeFi and NFT worlds while catalyzing network effects and community building. Elfiverse pushes the boundaries of on-chain governance allowing communities to look beyond the 1-token-1-vote system, driving inclusive governance participation for all.',
    link: 'https://elfiverse.element.fi/',
    backgroundClass: 'bg-black',
    logo: {
      w: 384,
      h: 72,
    }
  },
  {
    id: 'Hyperdrive',
    title: 'A new way to trade rates',
    description: 'Hyperdrive is the next research leap from Delv on variable and fixed rate primitives. It is an advanced AMM featuring no preset expiration dates, no fragmented liquidity, and no LP rollovers — aka everlasting liquidity.',
    backgroundClass: 'bg-black',
    link: 'https://hyperdrive.element.fi/',
    logo: {
      w: 400,
      h: 174,
    }
  },
  {
    id: 'Echo',
    title: 'Browser-Layer P2P',
    description: 'Echo is a new P2P protocol that focuses on the browser-layer. It enables visitors of web3 applications to peer/host infrastructure needed to power the application. Echo is a natural progression for Council, allowing DAOs to run frontends and data services. It enables a world of truly decentralized protocols and DAOs.',
    backgroundClass: 'bg-black',
    logo: {
      w: 286,
      h: 101,
    }
  },
  {
    id: 'Agent_0',
    title: 'Data Simulation',
    description: 'Agent_0 is a data simulation framework to aid progress on the new Hyperdrive AMM design before implementing it in Solidity. The models include smart agents that allow us to graph/stress test against all scenarios. It will also leverage reinforcement machine learning to further our research endeavors.',
    backgroundClass: 'bg-black',
    logo: {
      w: 400,
      h: 97,
    }
  },
  {
    id: 'About',
    hidden: true,
    layout: 'about',
    title: 'Build with us',
    description: 'Let’s reimagine the future of finance together.',
    backgroundClass: 'bg-black',
  }
]

const Links: {
  [key: string]: {
    name: string;
    url: string;
  }[];
} = {
  "Build": [
    {
      "name": "Documentation",
      "url": "https://docs.element.fi/"
    },
    {
      "name": "White paper",
      "url": "https://paper.element.fi//"
    },
    {
      "name": "Tutorial",
      "url": "https://medium.com/element-finance/how-to-access-high-fixed-apr-on-usd-eth-and-btc-in-4-minutes-641f057e283b"
    },
    {
      "name": "Fixed interest",
      "url": "https://medium.com/element-finance/fixed-rate-interest-markets-a-casual-users-journey-through-fixed-rate-interest-using-element-50f420df1859"
    },
    {
      "name": "Bug bounty",
      "url": "https://immunefi.com/bounty/elementfinance/"
    },
    {
      "name": "Brand assets",
      "url": "https://github.com/element-fi/brand-assets"
    },
    {
      "name": "Jobs",
      "url": "tbc"
    }
  ],
  "Community": [
    {
      "name": "Twitter",
      "url": "https://twitter.com/element_fi"
    },
    {
      "name": "Discord",
      "url": "https://discord.gg/EEfKmfQdtx"
    },
    {
      "name": "Blog",
      "url": "https://blog.element.fi/"
    },
    {
      "name": "Github",
      "url": "https://github.com/element-fi"
    },
    {
      "name": "YouTube",
      "url": "https://www.youtube.com/channel/UCwxX4xrw-AZF_7dB7gVMaSw"
    }
  ]
}

// preload images using head and link preload
const preloadImages = () => {
  return sections.map((section) => {
    if (section.logo) {
      return (
        <>
          <link
            key={section.id + 'logo'}
            rel="preload"
            href={`/assets/${section.id.toLowerCase()}.png`}
            as="image"
          />
          <link
            key={section.id + 'arc'}
            rel="preload"
            href={`/assets/${section.id.toLowerCase()}.svg`}
            as="image"
          />
          <link
            key={section.id + 'back'}
            rel="preload"
            href={`/assets/delv-${section.id.toLowerCase()}.svg`}
            as="image"
          />
        </>
      )
    }
  })
}





export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const [caretPosition, setCaretPosition] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  // for every group of footer create toggles
  const [footerToggles, setFooterToggles] = useState(Object.keys(Links).reduce((acc: Record<string, boolean>, key: string) => {
    acc[key] = false
    return acc
  }, {}))
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true)
        setIsTablet(false)
        setIsDesktop(false)
      } else if (window.innerWidth < 1024) {
        setIsMobile(false)
        setIsTablet(true)
        setIsDesktop(false)
      } else {
        setIsMobile(false)
        setIsTablet(false)
        setIsDesktop(true)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobile, isTablet, isDesktop])

  const projectNavRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (projectNavRef.current) {
      const sectionHeight = 34; // The height of each section in the project navigation
      const targetScrollTop = activeSection * sectionHeight;
      const duration = 500; // The duration of the animation in milliseconds

      const startTime = performance.now();
      const startScrollTop = projectNavRef.current.scrollTop;

      const animateScroll = (currentTime: number) => {  
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        projectNavRef.current.scrollTop = startScrollTop + (targetScrollTop - startScrollTop) * progress;

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, [activeSection]);

  useEffect(() => {
    if (projectNavRef.current) {
      const sectionHeight = 34; // The height of each section in the project navigation
      const duration = 500; // The duration of the animation in milliseconds
      let scrollTimeout: any = null;
  
      const handleScroll = () => {
        // Clear any previous timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
  
        // Set a new timeout to update the active section after the scroll ends
        scrollTimeout = setTimeout(() => {
          const scrollTop = projectNavRef.current.scrollTop;
          const activeSection = Math.floor(scrollTop / sectionHeight);
  
          // Set the active section, but don't animate the scroll
          setActiveSection(activeSection);
        }, 100); // Set the timeout to 100ms (adjust as needed)
      };
  
      // Add the scroll event listener
      projectNavRef.current.addEventListener("scroll", handleScroll);
  
      // Remove the scroll event listener on cleanup
      return () => {
        projectNavRef.current.removeEventListener("scroll", handleScroll);
        // Clear any pending timeout on cleanup
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      };
    }
  }, []);
  
  

  useScrollDirection(
    activeSection, setActiveSection,
    caretPosition, setCaretPosition, 
    isScrolling, setIsScrolling)

  return (
    <>
      <Head>
        <title>Delv</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {preloadImages()}
      </Head>
      <main className={styles.main + ' ' + (mobileMenuOpen ? "has_open_menu" : '') + "section_" + sections[activeSection]?.id || ""}>
        <div className={styles.sidebar_left}>
          <div className="delv_logo" onClick={() => setActiveSection(0)}>
            <motion.div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'flex-start',
                // background: 'url(/assets/logo.png)',// debug logo size
                // backgroundSize: '120px 48px',
                // backgroundRepeat: 'no-repeat',
                // backgroundPositionY: '-3px',
                // width: '120px',
                // height: '48px',
              }}

              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: [0, 0.8, 1],
                y: [30, 0, 0],
                transition: {
                  duration: 2,
                  ease: 'easeInOut'
                }
              }}
              exit={{
                opacity: 0,
                y: -30,
                transition: {
                  duration: 0.3,
                  delay: 0
                }
              }}
            >

              <Image
                width={86}
                height={22}
                src={`/assets/delv.svg`}
                alt={sections[activeSection]?.title || 'Delv'}
                style={{
                  marginTop: '-5px'
                }}
              />
              {sections.map((section, index) => {
                return (
                  <motion.div
                    key={section?.id || index}
                    style={{
                      outline: 'none',
                      position: 'absolute',
                      left: '96px',
                    }}
                    initial={{
                      opacity: 0.1,
                      // x: 5
                    }}
                    animate={{
                      opacity: (activeSection === index) ? 1 : 0,
                      y: 0,
                      x: 0,
                      transition: {
                        duration: 0.6,
                        ease: 'easeInOut',
                        // delay
                      }
                    }}
                    exit={{
                      opacity: 0.1,
                      // x:5,
                      transition: {
                        duration: 0.3,
                      }
                    }}
                  >

                    <Image
                      src={`/assets/delv-${(section?.id !== 'About') && section?.id.toLowerCase() || 'delv'}.svg`}
                      width={24}
                      height={47}
                      alt={section?.id}
                    />
                  </motion.div>
                )
              })}


            </motion.div>
          </div>
          <div className="mobile-only">
            <div className={"mobile_nav_toggle" + ' ' + (mobileMenuOpen ? "mobile_nav_toggle__open" : '')}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <div className="dash"></div>
              <div className="dash"></div>
            </div>
            <div className={"mobile_nav"} style={{ display: mobileMenuOpen ? 'block' : 'none' }}>
              <div className="delv_logo" onClick={() => setActiveSection(0)}>
                <motion.div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    position: 'relative',
                    justifyContent: 'flex-start',
                    // background: 'url(/assets/logo.png)',// debug logo size
                    // backgroundSize: '120px 48px',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundPositionY: '-3px',
                    // width: '120px',
                    // height: '48px',
                  }}

                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: [0, 0.8, 1],
                    y: [30, 0, 0],
                    transition: {
                      duration: 2,
                      ease: 'easeInOut'
                    }
                  }}
                  exit={{
                    opacity: 0,
                    y: -30,
                    transition: {
                      duration: 0.3,
                      delay: 0
                    }
                  }}
                >

                  <Image
                    width={86}
                    height={22}
                    src={`/assets/delv.svg`}
                    alt={sections[activeSection]?.title || 'Delv'}
                    style={{
                      marginTop: '-5px'
                    }}
                  />
                  {sections.map((section, index) => {
                    return (
                      <motion.div
                        key={section?.id+index}
                        style={{
                          outline: 'none',
                          position: 'absolute',
                          left: '96px',
                        }}
                        initial={{
                          opacity: 0.1,
                          // x: 5
                        }}
                        animate={{
                          opacity: (activeSection === index) ? 1 : 0,
                          y: 0,
                          x: 0,
                          transition: {
                            duration: 0.6,
                            ease: 'easeInOut',
                            // delay
                          }
                        }}
                        exit={{
                          opacity: 0.1,
                          // x:5,
                          transition: {
                            duration: 0.3,
                          }
                        }}
                      >

                        <Image
                          src={`/assets/delv-${(section?.id !== 'About') && section?.id.toLowerCase() || 'delv'}.svg`}
                          width={24}
                          height={47}
                          alt={section?.id}
                        />
                      </motion.div>
                    )
                  })}


                </motion.div>
              </div>
              <div className="mobile_nav_projects">
                {sections.map((section, index) => (
                  <div className={styles.mobile_nav_item} onClick={() => { setActiveSection(index); setMobileMenuOpen(false) }} key={"nav-"+section.id+index}>
                    {section.id}
                  </div>
                ))}
              </div>
              <div className="mobile_nav_links">
                {Object.keys(Links).map((group, index) => (
                  <div key={group}>
                    <span className="mobile_nav_links_heading">
                      {group}
                    </span>
                    <div className={styles.links}>
                      {Links[group].map((link, index) => (
                        <div key={index}>
                          <a href={link.url}>{link.name}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className={styles.projectNav}
            ref={projectNavRef}
            transition={{ duration: 0.5 }}
          >
            <motion.div className={styles.caret}
              initial={{
                x: -40,
                opacity: 0
              }}
              animate={{
                // y: focusedProject*34, 
                opacity: activeSection == (sections.length - 1) ? 0 : 1,
                y: caretPosition,
                transition: { 
                  duration: isScrolling ? 0 : 0.3,
                  ease: 'linear'
                }
              }}
              // transition={{
              //   duration: 0.8,
              //   ease: 'easeInOut',
              //   delay: activeSection ? 0 : 0.6
              // }}
            />
            <motion.div className="sections"
              animate={{
                // y: isMobile ? -activeSection * 34 : 0
              }}
            >
              {sections.map((section, index) => (
                <motion.div
                  className={styles.projectNav_item}
                  key={section.id} onClick={() => setActiveSection(index)}
                  // opacity based on closer to focused section
                  initial={{
                    opacity: Math.max((isMobile ? 0.4 : 0.1), 0.5 - (Math.abs(activeSection - index) * (isMobile ? 1 : 0.2))),
                    y: 10 * (index + 4),
                    scale: 0.9,
                  }}
                  animate={{
                    y: 0,
                    scale: 1,
                    opacity: Math.max((isMobile ? 0.4 : 0.1), 1 - (Math.abs(activeSection - index) * (isMobile ? 1 : 0.2))),
                    transition: { delay: 0, duration: activeSection ? 0.3 : 1 }
                  }}
                  whileHover={{ opacity: 1 }}
                  hidden={section.hidden}
                >
                  <span>
                    {section.id}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div className={styles.nav_footer + " mobile-hidden"}>
            <a href="#" onClick={() => setActiveSection(7)}>
              About
            </a>
            <a href="#">Terms</a>
          </motion.div>
        </div>
        <div className={styles.content}>
        <motion.div
              className={styles.arrow_down}
              style={{
                  width: '32px',
                  height: '32px',
                  background: `url(/assets/arrow.svg) center center / contain no-repeat`,
                  position: 'absolute',
                  bottom: '10%',
                  left: '50%',
                  translateX: '-50%',
                  zIndex: 1,
                  cursor: 'pointer'
              }}
              animate={{
                  scale: [1, 0.9, 1, 0.95, 1.02, 0.97, 1],
                  y: [0, -10, 0, -10, 0, -10, 0],
              }}
              transition={{
                  duration: 10,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  repeat: Infinity
              }}
              exit={{
                  opacity: 0,
                  y: 10,
                  transition: { duration: 0.3, fill: "forwards" }
              }}
              onClick={() => setActiveSection(activeSection == (sections.length - 1) ? 0 : activeSection + 1)}
          >
          </motion.div>
          <AnimatePresence mode="wait">
            <ProjectBackground projectId={sections[activeSection]?.id} key={sections[activeSection]?.id} />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <Screen
              activeSection={sections[activeSection]}
              sections={sections}
              setActiveSection={setActiveSection}
              activeSectionPosition={activeSection}
              Links={Links}
              key={activeSection+"screen"}
            />
          </AnimatePresence>
        </div>
        <div className={styles.sidebar_right + " mobile-hidden"}>
          <motion.div className={styles.nav_footer}>
            {Object.keys(Links).map((group, index) => (
              <div key={index} onClick={() => setFooterToggles({ ...footerToggles, [group]: !footerToggles[group] })} className={footerToggles[group] ? styles.nav_footer_group_active : styles.nav_footer_group}>
                <div>
                  {Links[group].map((link, index) => (
                    <div key={index}>
                      <a href={link.url}>{link.name}</a>
                    </div>
                  ))}
                </div>
                <span className={styles.nav_footer_group_title}>
                  {group}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

      </main>

    </>
  )
}
