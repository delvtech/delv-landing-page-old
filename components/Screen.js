import styles from '../styles/Screen.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

let animations = {
    normal: (delay = 0) => ({
        initial: {
            opacity: 0,
            y: 30,
        },
        animate: {
            opacity: [0, 0.8, 1],
            y: [30, 0, 0],
            transition: {
                duration: 2,
                delay,
                ease: 'easeInOut'
            }
        },
        exit: {
            opacity: 0,
            y: -30,
            transition: {
                duration: 0.3
            }
        }
    }),
    logo: (delay = 0) => ({
        initial: {
            opacity: 0,
            y: 30,
        },
        animate: {
            opacity: [0, 0.8, 1],
            y: [30, 0, 0],
            transition: {
                duration: 2,
                delay,
                ease: 'easeInOut'
            }
        },
        exit: {
            opacity: 0,
            y: -30,
            transition: {
                duration: 0.3,
                delay: 0
            }
        }
    })
}


export function Screen({ activeSection, sections, setActiveSection, activeSectionPosition, Links }) {
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

    if (!activeSection) return null
    if (activeSection.layout === 'main') {
        return (
            <div style={{ width: "100%" }}>
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    className={styles.screen}
                >
                    <motion.div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            alignItems: 'center',
                            maxWidth: '800px',
                            fontSize: '32px',
                            lineHeight: '1.125',
                            margin: '0 auto'
                        }}
                        {...animations.normal()}
                        transit={{ duration: 1 }}
                    >
                        <AnimatePresence mode="wait">
                            <h1 className='main-intro'
                                style={{
                                    marginBottom: '1em',
                                    marginTop: "15%",
                                    marginBottom: isMobile ? "40px" : "7%",
                                    fontSize: isMobile ? '39px' : '3rem',
                                }}>
                                {activeSection?.title}
                            </h1>
                            <p className='font-sec' style={{width: "100%" }}>
                                <Balancer>
                                    {activeSection?.description}
                                </Balancer>
                            </p>
                        </AnimatePresence>

                    </motion.div>
                </motion.div>
            </div>
        )
    }
    if (activeSection.layout === 'about') {
        return (<div>
            <motion.div
                className={styles.screen}
            >
                <motion.div
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', maxWidth: '800px', fontSize: '32px', margin: '0 auto' }}
                    {...animations.normal()}
                    transition={{ duration: 1 }}
                >
                    <AnimatePresence mode="wait">
                        <h1 className='main-intro' style={{ marginTop: "5%" }}>
                            {activeSection?.title}
                        </h1>
                        <p className='font-sec prod-descr'>
                            <Balancer>
                                {activeSection?.description}
                            </Balancer>
                        </p>
                    </AnimatePresence>
                    <p className='font-sec prod-descr' style={{ marginTop: "10%", fontSize: "13px", lineHeight: "19px" }}>
                        <div className={styles.mobile_flex}>
                            {/* {Object.keys(Links).map((group, index) => ( */}
                                <div style={{ marginTop: "30px" }}>
                                    <div className={styles.links}>
                                        {Links.Build.map((link, index) => (
                                            <div key={index}>
                                                <a href={link.url}>{link.name}</a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            {/* ))} */}
                        </div>
                    </p>
                    {activeSection?.link && (
                        <a href={activeSection?.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            <Image src="/ext.svg" width={20} height={20} alt="External Link" />
                        </a>
                    )}
                </motion.div>
                <div className={styles.project_logo}>
                    <motion.div
                        {...animations.logo()}
                        style={{ width: '600px', height: '300px', position: 'relative', marginTop: '30px', maxWidth: "100%" }}
                        transition={{ duration: 1, fill: "forwards" }}
                    >
                        {activeSection?.logo && (<Image
                            width={activeSection.logo.w}
                            height={activeSection.logo.h}
                            src={`/assets/${activeSection?.id.toLowerCase()}.svg`}
                            alt={activeSection?.title}
                            style={{
                                marginTop: activeSection.id == "Council" ? '50px' : '0px',
                            }}
                        />)}
                    </motion.div>
                </div>
            </motion.div>
        </div>)
    }

    return (
        <motion.div
            className={styles.screen}
        >
            {/* <motion.div className='mobile-only sections-scroll'
                    {...animations.normal()}
                    transition={{duration: 1}}
                >
                    {(sections.slice(activeSectionPosition-1, activeSectionPosition+2).map((section, i) => (
                        <div key={section.id}>
                            <a key={i} onClick={() => setActiveSection(activeSectionPosition+i-1)} className={activeSectionPosition+i-1 == activeSectionPosition ? 'active' : ''}>
                                {section.id}
                            </a>
                        </div>
                    )))}
                </motion.div> */}
            <motion.div
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', maxWidth: '800px', fontSize: '32px', margin: '0 auto', zIndex: '5' }}
                {...animations.normal()}
                transition={{ duration: 1 }}
            >
                <AnimatePresence mode="wait">
                    {!isMobile &&
                        <h1 style={{ marginTop: "5%" }}>
                            {activeSection?.title}
                        </h1>
                    }

                    <p className='font-sec prod-descr'>
                        <Balancer>
                            {activeSection?.description}
                        </Balancer>
                    </p>
                </AnimatePresence>
                {activeSection?.link && (
                    <a href={activeSection?.link} target="_blank" rel="noopener noreferrer" className={styles.link} key={activeSection + "link"}>
                        <Image src="/ext.svg" width={20} height={20} alt="External Link" />
                    </a>
                )}
            </motion.div>
            <div className={styles.project_logo}>
                <motion.div
                    {...animations.logo()}
                    style={{
                        // width: `${activeSection.logo?.w}px`,
                        // height: `${activeSection.logo?.h}px`,
                        position: 'relative',
                        marginTop: isMobile ? '0' : '30px',
                        minWidth: '600px',
                        maxWidth: (activeSection.id == 'Echo' && isMobile) ? '206px' : '100%',
                        maxHeight: '600px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        position: 'relative',
                        zIndex: '-1'
                    }}
                    className="project_logo"
                    transition={{ duration: 1, fill: "forwards" }}
                >
                    <AnimatePresence mode='wait'>
                        {activeSection?.logo && (<img
                            src={`/assets/${activeSection?.id.toLowerCase()}.svg`}
                            alt={activeSection?.id}
                            key={"main-logo-" + activeSection?.id}
                            style={{
                                marginTop: (activeSection.id === "Council" || activeSection.id == "Element") ? '40px' : '20px',
                            }}
                        />)}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    )
}