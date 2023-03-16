import styles from '../styles/Screen.module.scss'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

let animations = {
    normal: (delay = 0) => ({
        initial: {
            opacity: 0,
            y: 50,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                fill: "forwards",
                delay
            }
        },
        exit: {
            opacity: 0,
            y: -30,
            transition: {
                duration: 0.3,
                fill: "forwards"
            }
        }
    })
}


export function Screen({ activeSection }) {
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
                        {...animations.normal(0.5)}
                        transition={{duration: 1, delay: 0.6 }}
                        >
                            <h1 style={{marginBottom: '1em', marginTop:"-30%"}}> {activeSection?.title} </h1>
                            <p className='font-sec'>
                                {/* <Balancer> */}
                                    {activeSection?.description}
                                {/* </Balancer> */}
                            </p>

                    </motion.div>
                </motion.div>
            </div>
            
        )}

    else {  
        return (
            <div>
                <motion.div
                className={styles.screen}
                >
                    <motion.div 
                        style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', height: '100%', maxWidth:'800px',fontSize:'32px', margin: '0 auto'}}
                        {...animations.normal(0.5)}
                        transition={{duration: 1, delay: 1}}
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
                            {...animations.normal(0.7)}
                            style={{width: '600px', height: '300px', position: 'relative', marginTop: '30px'}}
                            transition={{ duration: 1, fill: "forwards", delay: 0.2}}
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
            </div>
        )
  }
}