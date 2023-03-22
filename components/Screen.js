import styles from '../styles/Screen.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

let animations = {
    normal: (delay = 0) => ({
        initial: {
            opacity: 0,
            y: 100,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: -30,
            transition: {
                duration: 0.3
            }
        }
    })
}


export function Screen({ activeSection, sections, setActiveSection, activeSectionPosition, Links }) {
    if (!activeSection) return null
    if (activeSection.layout === 'main') {
        return (
            <div>
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    className={styles.screen}
                    >
                    <motion.div 
                        style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', height: '100%', maxWidth:'800px',fontSize:'32px', lineHeight:'1.125', margin: '0 auto'}}
                        {...animations.normal()}
                        transit={{duration: 1 }}
                        >
                            <AnimatePresence mode="wait">
                                <h1 className='main-intro' style={{marginBottom: '1em', marginTop:"-30%"}}> {activeSection?.title} </h1>
                                <p className='font-sec'>
                                    {/* <Balancer> */}
                                        {activeSection?.description}
                                    {/* </Balancer> */}
                                </p>
                            </AnimatePresence>

                    </motion.div>
                </motion.div>
            </div>
            
        )}
    if (activeSection.layout === 'about') {
        return (<div>
            <motion.div
            className={styles.screen}
            >
                <motion.div 
                    style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', height: '100%', maxWidth:'800px',fontSize:'32px', margin: '0 auto'}}
                    {...animations.normal()}
                    transition={{duration: 1}}
                    >
                    <h1 className='main-intro' style={{marginTop:"30%"}}>
                        {activeSection?.title}
                    </h1>
                    <p className='font-sec prod-descr'>
                        <Balancer>
                            {activeSection?.description}
                        </Balancer>
                    </p>
                    <p className='font-sec prod-descr' style={{marginTop:"10%", fontSize: "13px", lineHeight: "19px"}}>
                        {Object.keys(Links).map((group, index) => (
                            <div key={group} style={{marginTop:"30px"}}>
                                <div className={styles.links}>
                                    {Links[group].map((link, index) => (
                                    <div key={index}>
                                        <a href={link.url}>{link.name}</a>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </p>
                    {activeSection?.link && (
                        <a href={activeSection?.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            <Image src="/ext.svg" width={20} height={20} alt="External Link" />
                        </a>
                    )}
                </motion.div>
                <div className={styles.project_logo}>
                    <motion.div
                        {...animations.normal()}
                        style={{width: '600px', height: '300px', position: 'relative', marginTop: '30px', maxWidth:"100%"}}
                        transition={{ duration: 1, fill: "forwards"}}
                    >
                        {activeSection?.logo && (<Image
                            width={activeSection.logo.w}
                            height={activeSection.logo.h}
                            src={`/assets/${activeSection?.id.toLowerCase()}.svg`}
                            alt={activeSection?.title}
                            style= {{
                                marginTop: activeSection.id=="Council" ? '50px' : '0px',
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
                <motion.div className='mobile-only sections-scroll'
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
                </motion.div>
                <motion.div 
                    style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', height: '100%', maxWidth:'800px',fontSize:'32px', margin: '0 auto', zIndex:'5'}}
                    {...animations.normal()}
                    transition={{duration: 1}}
                    >
                    <h1 style={{marginTop:"-10%"}}>
                        {activeSection?.title}
                    </h1>
                    <p className='font-sec prod-descr'>
                        <Balancer>
                            {activeSection?.description}
                        </Balancer>
                    </p>
                    {activeSection?.link && (
                        <a href={activeSection?.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            <Image src="/ext.svg" width={20} height={20} alt="External Link" />
                        </a>
                    )}
                </motion.div>
                <div className={styles.project_logo}>
                    <motion.div
                        {...animations.normal()}
                        style={{width: `${activeSection.logo?.w}px`, height: `${activeSection.logo?.h}px`, position: 'relative', marginTop: '30px', minWidth: '600px', minHeight:'300px', maxWidth: '100%', maxHeight: '600px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', position:'relative', zIndex:'-1'}}
                        className="project_logo"
                        transition={{ duration: 1, fill: "forwards"}}
                    >
                        {activeSection?.logo && (<Image
                            width={activeSection.logo.w}
                            height={activeSection.logo.h}
                            src={`/assets/${activeSection?.id.toLowerCase()}.svg`}
                            alt={activeSection?.id}
                            style= {{
                                marginTop: (activeSection.id === "Council" || activeSection.id == "Element") ? '50px' : '0px',
                            }}
                        />)}
                        {activeSection?.id == "Element" && (
                            <div style={{ position: 'absolute', zIndex: '-1', marginTop:'-35%', inset:'-24% -24%', display: 'flex', justifyContent: 'center', alignItems: 'center', background:'url(/assets/element-bg.svg)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', aspectRatio:'761/586', tranform:"translateZ(0)"}}>
                            </div>
                        )}
                                
                    </motion.div>
                </div>
            </motion.div>
    )
  
}