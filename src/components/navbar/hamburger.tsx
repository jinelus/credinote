import { motion, MotionConfig } from 'motion/react'

type AnimatedHamburgerButtonProps = {
  open: boolean
}

export const AnimatedHamburgerButton: React.FC<
  Readonly<AnimatedHamburgerButtonProps>
> = ({ open }) => {
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        initial={open ? 'closed' : 'open'}
        animate={open ? 'open' : 'closed'}
        className='group border-primary relative h-10 w-10 rounded-md border transition-colors'
      >
        <motion.span
          variants={VARIANTS.top}
          className='bg-primary absolute h-[0.1rem] w-[1.075rem] group-data-[state="hollow"]:bg-white'
          style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className='bg-primary absolute h-[0.1rem] w-[1.075rem] group-data-[state="hollow"]:bg-white'
          style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className='bg-primary absolute h-[0.1rem] w-[1.075rem] group-data-[state="hollow"]:bg-white'
          style={{
            x: '-50%',
            y: '50%',
            bottom: '35%',
            left: '50%',
          }}
        />
      </motion.div>
    </MotionConfig>
  )
}

const VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '50%', '50%'],
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%'],
    },
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
    },
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%',
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: '50%',
    },
  },
}
