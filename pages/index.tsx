import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { Screen } from '@/components/Screen'
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from 'react'
import { ProjectBackground } from '@/components/ProjectBackground'

type Section = {
  id: string
  layout?: 'main' | 'section' | 'footer' | 'about'
  caretOffset: number
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

const useScrollDirection = (activeSection, setActiveSection, isScrolling, setIsScrolling) => {
  useEffect(() => {
    const handleScroll = (event) => {
      if (isScrolling) {
        return;
      }
      if (event.deltaY < 0) {
        handleScrollUp();
      } else {
        handleScrollDown();
      }
      setIsScrolling(true);
      setTimeout(() => {
        setIsScrolling(false)
      }, 2000);
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [activeSection, isScrolling]);

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
    id : 'Delv',
    layout: 'main',
    caretOffset: 31,
    title: 'The Factory of DeFi',
    description: 'Delv is building the full stack of decentralized finance, from core infrastructure to structured products.',
    backgroundClass: 'bg-white',
  },
  {
    id : 'Element',
    caretOffset: 72,
    title: 'Fixed rate protocol',
    description: 'It all began with Element, an open-source protocol for fixed and variable yield markets.',
    link: 'https://element.fi',
    backgroundClass: 'bg-white',
    logo: {
      w: 325,
      h: 64,
    }
  },
  {
    id: 'Council',
    caretOffset: 70,
    title: 'Council protocol',
    description: 'Welcome to Delv DAO\'s v0 Governance System. Explore below to learn more about the launch of the DAO.',
    link: 'https://council.element.fi/',
    backgroundClass: 'bg-black',
    logo: {
      w: 400,
      h: 52,
    }
  },
  {
    id: 'Elfiverse',
    caretOffset: 87,
    title: 'NFTs meet DeFi',
    description: 'The lore of the Element DAO is born with Elfiverse – An endeavor to intersect DeFi and NFT worlds that draws on both network effects and community building. Elfiverse pushes the boundaries of on-chain governance and voting vaults that Council introduced.',
    link: 'https://elfiverse.element.fi/',
    backgroundClass: 'bg-black',
    logo: {
      w: 384,
      h: 72,
    }
  },
  {
    id: 'Hyperdrive',
    caretOffset: 108,
    title: 'A new way to trade rates',
    description: 'Hyperdrive is the next research leap from the Delv Finance team on variable and fixed rate primitives. No preset expiration dates, no fragmented liquidity, and no LP rollovers, aka everlasting liquidity.',
    backgroundClass: 'bg-black',
    logo: {
      w: 400,
      h: 174,
    }
  },
  {
    id: 'Echo',
    caretOffset: 34,
    title: 'Browser-Layer P2P',
    description: 'Echo is a new P2P protocol that focuses on the browser-layer. It enables any visitor of a web3 application to peer/host infrastructure needed to power the application. Echo is a natural adaptor for Council, allowing DAOs to deploy frontends and data services for their products.\nIt enables a world of truly decentralized protocols and DAOs.',
    backgroundClass: 'bg-black',
    logo: {
      w: 286,
      h: 101,
    }
  },
  {
    id: 'Agent_0',
    caretOffset: 68,
    title: 'Data Simulation',
    description: 'We built a data simulation framework as we were researching the new AMM design in Hyperdrive, before implementing it in Solidity. It allows us to build bots and to graph/stress test against various edge cases.\nWe will also introduce machine learning to further our research endeavors.',
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
    caretOffset: 72,
    title: 'Build with us',
    description: 'Let’s reimagine the future of finance together.',
    backgroundClass: 'bg-black',
  }
]

const Links = {
  "Build": [
    {
      "name": "Documentation",
      "url": "https://element.fi"
    },
    {
      "name": "White paper",
      "url": "https://council.element.fi/"
    },
    {
      "name": "Tutorial",
      "url": "https://council.element.fi/"
    },
    {
      "name": "Fixed interest",
      "url": "https://council.element.fi/"
    },
    {
      "name": "Bug bounty",
      "url": "https://council.element.fi/"
    },
    {
      "name": "Brand assets",
      "url": "https://council.element.fi/"
    },
    {
      "name": "Jobs",
      "url": "https://council.element.fi/"
    }
  ],
  "Community" : [
    {
      "name": 'Twitter',
      "url": 'https://twitter.com/delvfinance',
    },
    {
      "name": 'Discord',
      "url": 'https://discord.gg/8Z8Y4Z8',
    },
    {
      "name": 'Blog',
      "url": 'https://medium.com/delv-finance',
    },
    {
      "name": 'Github',
      "url": ''
    },
    {
      "name": 'YouTube',
      "url": 'https',
    }
  ],
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
  const [isScrolling, setIsScrolling] = useState(false)
  // for every group of footer create toggles
  const [footerToggles, setFooterToggles] = useState(Object.keys(Links).reduce((acc, key) => {
    acc[key] = false
    return acc
  }, {}))

  useScrollDirection(activeSection,setActiveSection, isScrolling, setIsScrolling)
  
  return (
    <>
      <Head>
        <title>Delv</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {preloadImages()}
      </Head>
      <main className={styles.main}>
        <div className={styles.sidebar_left}>
          <div className={styles.delv_logo} onClick={() => setActiveSection(0)}>
              <motion.div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    // background: 'url(/assets/logo.png)',// debug logo size
                    // backgroundSize: 'contain',
                    // backgroundRepeat: 'no-repeat',
                  }}

                  initial={{
                      opacity: 0.1,
                      y: 50,
                  }}
                  animate={{            
                    opacity: 1,  
                    y: 0,
                    transition:{
                      duration: 1,
                      fill: "forwards",
                      // delay
                      }
                  }}
                  exit={{
                    opacity: 0,
                    y: -30,
                    transition: {
                        duration: 0.3,
                        fill: "forwards"
                    }
                  }}
                >

                  <Image
                      width={120}
                      height={24}
                      src={`/assets/delv.svg`}
                      alt={sections[activeSection]?.title || 'Delv'}
                      style={{
                        marginTop: '-5px'
                      }}
                      />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={sections[activeSection]?.id}
                    initial={{
                      opacity: 0,
                      // x: 5
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      x:0,
                      transition: {
                        duration: 0.3,
                        fill: "forwards",
                        // delay
                      }
                    }}
                    exit={{
                      opacity: 0,
                      // x:5,
                      transition: {
                        duration: 0.3,
                        fill: "forwards"
                      }
                    }}
                  >

                  <Image 
                    src={`/assets/delv-${(sections[activeSection]?.id !== 'About') && sections[activeSection]?.id.toLowerCase() || 'delv'}.svg`} 
                    style={{
                      // marginLeft: '2px',
                    }}
                    width={31}
                    height={62} 
                    alt={sections[activeSection]?.id}
                    />
                  </motion.div>
                </AnimatePresence>

                  
              </motion.div>
          </div>
          
          <motion.div 
            className={styles.projectNav}
            transition={{ duration: 0.5 }}
            >
              <motion.div className={styles.caret} 
              initial={{
                x: -40,
                opacity: 0
              }}
              animate={{ 
                // y: focusedProject*34, 
                opacity: activeSection == (sections.length - 1) ? 0:1,
                y: activeSection*34,
                // x: sections[activeSection]?.caretOffset - 180,
                transition: { duration: 1 }
              }} 
              transition={{ 
                duration: 1,
                delay:activeSection?0:0.6
              }} 
            />
            {sections.map((section, index) => (
              <motion.div 
              className={styles.projectNav_item}
                key={section.id} onClick={() => setActiveSection(index)} 
                // opacity based on closer to focused section
                initial={{ 
                  opacity: 0, 
                  y: 10*(index+4), 
                  scale: 0.9, 
                }}
                animate={{ 
                  y: 0, 
                  scale:1, 
                  opacity: activeSection == (sections.length - 1)? 0.7: Math.max(0.1, 1 - (Math.abs(activeSection - index) * 0.2)),
                  transition:{delay: 0, duration: 1}
                }} 
                hidden={section.hidden}
              >
                <span>{section.id}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className={styles.nav_footer}>
            <a href="#" onClick={() => setActiveSection(7)}>
              About
            </a>
            <a href="#">Terms</a>
          </motion.div>
        </div>
        <div className={styles.content}>
          <AnimatePresence mode="wait">
            <ProjectBackground projectId={sections[activeSection]?.id} key={sections[activeSection]?.id} />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <Screen activeSection={sections[activeSection]} key={activeSection}  />
          </AnimatePresence>
        </div>
        <div className={styles.sidebar_right}>
          <motion.div className={styles.nav_footer}>
            {Object.keys(Links).map((group, index) => (
                <div key={index} onClick={() => setFooterToggles({...footerToggles, [group]: !footerToggles[group]})} className={footerToggles[group]? styles.nav_footer_group_active: styles.nav_footer_group}>
                  <div className={styles.links}>
                    {Links[group].map((link, index) => (
                      <div>
                        <a key={index} href={link.url}>{link.name}</a>
                      </div>
                    ))}
                  </div>
                  <span class={styles.nav_footer_group_title}>
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
