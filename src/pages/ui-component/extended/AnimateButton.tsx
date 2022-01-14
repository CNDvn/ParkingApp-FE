import React, { forwardRef } from 'react';
// third-party
import { motion, useCycle } from 'framer-motion';

// ==============================|| ANIMATION BUTTON ||============================== //
interface IAnimatevButton {
  children: React.ReactNode;
  type?: string;
  direction?: string;
  offset: number;
  scale?: number | object;
}

const AnimateButton = forwardRef(
  (
    { children, type = 'scale', direction, offset, scale }: IAnimatevButton,
    ref: React.Ref<HTMLDivElement>
  ) => {
    let offset1;
    let offset2;
    switch (direction) {
      case 'up':
      case 'left':
        offset1 = offset;
        offset2 = 0;
        break;
      case 'right':
      case 'down':
      default:
        offset1 = 0;
        offset2 = offset;
        break;
    }

    const [x, cycleX] = useCycle(offset1, offset2);
    const [y, cycleY] = useCycle(offset1, offset2);

    switch (type) {
      case 'rotate':
        return (
          <motion.div
            ref={ref}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 2,
              repeatDelay: 0,
            }}
          >
            {children}
          </motion.div>
        );
      case 'slide':
        if (direction === 'up' || direction === 'down') {
          return (
            <motion.div
              ref={ref}
              animate={{ y: y !== undefined ? y : '' }}
              onHoverEnd={(): void => cycleY()}
              onHoverStart={(): void => cycleY()}
            >
              {children}
            </motion.div>
          );
        }
        return (
          <motion.div
            ref={ref}
            animate={{ x: x !== undefined ? x : '' }}
            onHoverEnd={(): void => cycleX()}
            onHoverStart={(): void => cycleX()}
          >
            {children}
          </motion.div>
        );

      case 'scale':
      default:
        if (typeof scale === 'number') {
          scale = {
            hover: scale,
            tap: scale,
          };
        }
        return (
          <motion.div
            ref={ref}
            whileHover={{ scale: scale?.hover }}
            whileTap={{ scale: scale?.tap }}
          >
            {children}
          </motion.div>
        );
    }
  }
);

AnimateButton.displayName = 'AnimateButton';

export default AnimateButton;
