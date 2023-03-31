import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from 'react'
import Image from 'next/image'

export function ProjectBackground({ projectId }) {

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

    // map ids to return divs
    const projectBackgrounds = {
        'Delv': (
            <motion.div
                style={{
                    position: 'absolute',
                    top: 'bottom',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: '0',
                    display: 'flex',
                }}
                initial={{ opacity: 0, y: 50, scaleY: 0.5, transformOrigin: 'bottom' }}
                animate={{ opacity: 1, y: 0, scaleY: 1, transformOrigin: 'bottom' }}
                transition={{ duration: 1, fill: "forwards" }}
            >
                <motion.div
                    style={{
                        background: "radial-gradient(100% 100% at 50% 100%, #02FE67 0%, rgba(24, 251, 254, 0.90) 85.28%)",
                        filter: "blur(112px)",
                        borderRadius: "0px 0px 30vw 30vw",
                        width: "70vw",
                        height: "50vh",
                        position: 'absolute',
                        left: '50%',
                        bottom: '10%',
                        translateX: '-50%',
                    }}
                    animate={{
                        scale: [1, 0.9, 1, 0.95, 1.02, 0.97, 1],
                        y: [0, -10, 0, 50, 0, -10, 0],
                        opacity: [1, 0.8, 1, 0.8, 1, 0.8, 1],
                    }}
                    transition={{
                        duration: 20,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                        loop: Infinity,
                        repeatDelay: 1
                    }}
                    exit={{
                        opacity: 0,
                        y: 10,
                        transition: { duration: 0.3, fill: "forwards" }
                    }}

                >

                </motion.div>



            </motion.div>
        ),
        'Element': (
            <motion.div
                style={{
                    position: 'absolute',
                    top: 'bottom',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: '0',
                    background: '#3E6BBD',
                    display: 'flex',
                    zIndex: '-1',
                }}
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                transition={{ duration: 1, fill: "forwards", delay: 0.2 }}
                exit={{
                    opacity: 0,
                    transition: { duration: 0.3, fill: "forwards" }
                }}
            >
                <motion.div
                    style={{
                        background: "#D101F3",
                        filter: "blur(112px)",
                        borderRadius: "0px 60vh 80vh 0",
                        width: "70vh",
                        height: "100vh",
                        position: 'absolute',
                        left: '-10%',
                        scale: 1.5,
                        transformOrigin: 'left',
                        bottom: '0%',
                        top: '0%',
                        opacity: 0.5,
                        mixBlendMode: 'multiply',
                        zIndex: -1,
                    }}
                    animate={{
                        scale: [1, 0.9, 1, 0.95, 1.02, 0.97, 1],
                        y: [0, -10, 0, 50, 0, -10, 0],
                        opacity: [0.6, 0.5, 0.6, 0.5, 0.6, 0.5, 0.6],
                    }}
                    transition={{
                        duration: 20,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                        loop: Infinity,
                        repeatDelay: 1
                    }}
                >

                </motion.div>


                <motion.div
                    style={{
                        height: '100%',
                        position: 'absolute',
                        zIndex: -1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: `url(/assets/element-bg.svg) center center / contain no-repeat`,
                        aspectRatio: '761 / 586',
                        transform: 'none',
                        opacity: 1,
                        width: '100%',
                        backgroundSize: isMobile ? "80%" : '60%',
                        backgroundPositionY: isMobile ? '90%' : 'center',
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 1,
                        }
                    }}>
                </motion.div>

            </motion.div>
        ),
        'Echo': (
            <motion.div
                style={{
                    position: 'absolute',
                    top: 'bottom',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: '0',
                    background: '#3E6BBD',
                    display: 'flex',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, fill: "forwards", delay: 0.2 }}
                exit={{
                    opacity: 0,
                    transition: { duration: 0.3, fill: "forwards" }
                }}
            >
                <Image src="/bg/echo.jpg" fill cover />
            </motion.div>
        ),
        'Elfiverse': (
            <motion.div
                style={{
                    position: 'absolute',
                    top: 'bottom',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: '0',
                    background: '#3E6BBD',
                    display: 'flex',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, fill: "forwards", delay: 0.2 }}
                exit={{
                    opacity: 0,
                    transition: { duration: 0.3, fill: "forwards" }
                }}
            >
                <Image src="/bg/elfiverse.jpg" alt="Elfiverse" fill style={{ objectFit: "cover" }} />
                {/* <motion.div
                    style={{
                        background: "radial-gradient(80.95% 139.13% at 81.02% 48.44%, #FF6B6B 0%, #FEEC96 100%)",
                        filter: "blur(112px)",
                        borderRadius: "0px 0px 30vw 30vw",
                        width: "50vw",
                        height: "50vh",
                        position: 'absolute',
                        left: '50%',
                        top: '8%',
                        translateX: '-50%',
                    }}
                    animate={{
                        scale: [1, 0.9, 1, 0.95, 1.02, 0.97, 1],
                        y: [0, -10, 0, 50, 0, -10, 0],
                        opacity: [1, 0.8, 1, 0.8, 1, 0.8, 1],
                    }}
                    transition={{
                        duration: 20,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                        loop: Infinity,
                        repeatDelay: 1
                    }}
                    exit={{
                        opacity: 0,
                        y: 10,
                        transition: { duration: 0.3, fill: "forwards" }
                    }}

                >
                </motion.div> */}
            </motion.div>
        ),
        'Hyperdrive': (
            <motion.div
                style={{
                    position: 'absolute',
                    top: 'bottom',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: '0',
                    background: '#3E6BBD',
                    display: 'flex',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, fill: "forwards", delay: 0.2 }}
                exit={{
                    opacity: 0,
                    transition: { duration: 0.3, fill: "forwards" }
                }}
            >
                <Image src="/bg/hyperdrive.jpg" alt="Hyperdrive" fill style={{ objectFit: "cover" }} />
            </motion.div>
        ),
        'Agent_0': (
            <motion.div
                style={{
                    position: 'absolute',
                    top: 'bottom',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: '0',
                    background: '#3E6BBD',
                    display: 'flex',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, fill: "forwards", delay: 0.2 }}
                exit={{
                    opacity: 0,
                    transition: { duration: 0.3, fill: "forwards" }
                }}
            >
                <Image src="/bg/agent_0.jpg" alt="Agent_0" fill style={{ objectFit: "cover" }} />
            </motion.div>
        ),
        'Council': (
            <motion.div
                style={{
                    position: 'absolute',
                    top: 'bottom',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: '0',
                    background: '#3E6BBD',
                    display: 'flex',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, fill: "forwards", delay: 0.2 }}
                exit={{
                    opacity: 0,
                    transition: { duration: 0.3, fill: "forwards" }
                }}
            >
                <Image src="/bg/council.jpg" alt="Council" fill style={{ objectFit: "cover" }} />
            </motion.div>
        ),

    }

    return (

        <motion.div
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                zIndex: '-1'
            }}
        >
            <AnimatePresence mode="wait">
                {projectBackgrounds[projectId] || projectBackgrounds['Delv']}
            </AnimatePresence>
        </motion.div>
    )
}