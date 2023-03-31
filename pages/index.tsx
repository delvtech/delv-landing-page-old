import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { Screen } from '@/components/Screen'
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { ProjectBackground } from '@/components/ProjectBackground'

import { sections, Links } from '@/data/content';


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
    let isBlocked = false;

    // const handleScroll = (event: WheelEvent) => {
    //   if (isBlocked) {
    //     return;
    //   }

    //   if (event.deltaY > 80) {
    //     handleScrollDown();
    //   } else if (event.deltaY < -80) {
    //     handleScrollUp();
    //   }

    //   isBlocked = true;
    //   setTimeout(() => {
    //     isBlocked = false;
    //   }, 1000);
    // };

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

    // window.addEventListener('wheel', handleScroll);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      // window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, isScrolling, touchStartY]);


  // on change of activeSection, change caret position
  useEffect(() => {
    setCaretPosition(activeSection * 34);
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
                      src={`/assets/delv-${(section?.id !== 'Build') && section?.id.toLowerCase() || 'delv'}.svg`}
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
                        key={section?.id + index}
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
                          src={`/assets/delv-${(section?.id !== 'Build') && section?.id.toLowerCase() || 'delv'}.svg`}
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
                {
                  sections.map((section, index) => {
                    return section.id == "Build" ? null : (
                      <div className={styles.mobile_nav_item} onClick={() => { setActiveSection(index); setMobileMenuOpen(false) }} key={"nav-" + section.id + index}>
                        {section.id}
                      </div>
                    )
                  }) 
                }
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
              Build
            </a>
            <a href="https://elementfi.s3.us-east-2.amazonaws.com/element-finance-terms-of-service.pdf" target="_blank">Terms</a>
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
              bottom: '7%',
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
            onClick={() => {
              if (activeSection < sections.length - 2) {
                setActiveSection(activeSection + 1);
              } else {
                setActiveSection(0);
              }
            }}
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
              key={activeSection + "screen"}
            />
          </AnimatePresence>
        </div>
        <div className={styles.sidebar_right + " mobile-hidden"}>
          <motion.div className={styles.nav_footer}>
            {Object.keys(Links).map((group, index) => (
              group == "Build" ? null : // hotfix for socials
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
