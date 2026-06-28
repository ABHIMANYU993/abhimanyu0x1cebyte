import React, { useState, useEffect, useRef } from 'react';

// Behavior Enum Map: { action: { frames: number, delayInTicks: number } }
// 1 Tick = 20ms. Delay is translated from Kotlin's timer steps.
const DELAYS: Record<string, number> = {
  UP: 10,       // 200ms
  DOWN: 10,     // 200ms
  LEFT: 10,     // 200ms
  RIGHT: 10,    // 200ms
  CURLED: 40,   // 800ms
  LAYING: 20,   // 400ms
  SITTING: 20,  // 400ms
  LICKING: 40,  // 800ms
  RISING: 40,   // 800ms
  SLEEP: 10     // 200ms
};

const FRAMES_COUNT: Record<string, number> = {
  UP: 4,
  DOWN: 4,
  LEFT: 4,
  RIGHT: 4,
  CURLED: 2,
  LAYING: 4,
  SITTING: 4,
  LICKING: 4,
  RISING: 2,
  SLEEP: 1
};

const BUBBLE_DELAYS: Record<string, number> = {
  ZZZ: 30,      // 600ms
  HEART: 35     // 700ms (reduced slightly for snappy 2.8s click duration)
};

const BUBBLE_FRAMES_COUNT: Record<string, number> = {
  ZZZ: 4,
  HEART: 4
};

interface CatppuccinoDaemonProps {
  variant?: 'white_cat' | 'calico_cat' | 'orange_cat' | 'grey_tabby_cat';
}

export const CatppuccinoDaemon: React.FC<CatppuccinoDaemonProps> = ({
  variant = 'white_cat'
}) => {
  // React State for DOM rendering swaps
  const [action, setAction] = useState<string>('sleep');
  const [frameNum, setFrameNum] = useState<number>(0);
  const [bubbleState, setBubbleState] = useState<string>('ZZZ');
  const [bubbleFrame, setBubbleFrame] = useState<number>(0);
  const [layingDir, setLayingDir] = useState<'LEFT' | 'RIGHT'>('RIGHT');

  // DOM element references
  const catElRef = useRef<HTMLDivElement>(null);

  // Raw coordinates and movement state machine tracked in useRef for 60FPS DOM updates
  const posRef = useRef({ x: 200, y: 300 });
  const wanderTargetRef = useRef({ x: 200, y: 300 });
  const stateRef = useRef<'DEFAULT' | 'WANDER'>('DEFAULT');

  // Logic control values
  const actionRef = useRef<string>('sleep');
  const frameRef = useRef<number>(0);
  const bubbleStateRef = useRef<string>('ZZZ');
  const bubbleFrameRef = useRef<number>(0);
  const layingDirRef = useRef<'LEFT' | 'RIGHT'>('RIGHT');

  // Tick / Steps counters
  const wanderCountRef = useRef(0);
  const animationStepsRef = useRef(0);
  const bubbleStepsRef = useRef(0);

  // Dragging support
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  // Sync state between background refs and React render state
  const syncState = () => {
    setAction(actionRef.current);
    setFrameNum(frameRef.current);
    setBubbleState(bubbleStateRef.current);
    setBubbleFrame(bubbleFrameRef.current);
    setLayingDir(layingDirRef.current);
  };

  // Determine wander speed interval based on daytime (8am - 6pm) vs nighttime
  const getWanderInterval = () => {
    const hour = new Date().getHours();
    return (hour >= 8 && hour < 18) ? 600 : 3000;
  };

  // Generate random target inside the browser viewport
  const generateRandomTarget = (currentX: number, currentY: number) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    let targetX = currentX;
    let targetY = currentY;
    let attempts = 0;

    do {
      // Offset by 120px to stay clear of right/bottom scrollbars
      targetX = Math.floor(Math.random() * (width - 120)) + 10;
      targetY = Math.floor(Math.random() * (height - 120)) + 10;
      attempts++;
    } while (
      attempts < 50 &&
      Math.abs(currentY - targetY) <= 300 &&
      Math.abs(currentX - targetX) <= 300
    );

    return { x: targetX, y: targetY };
  };

  // Main state machine tick loop (20ms)
  useEffect(() => {
    // Initial positioning in viewport
    posRef.current = {
      x: Math.floor(Math.random() * (window.innerWidth - 120)) + 10,
      y: Math.floor(Math.random() * (window.innerHeight - 120)) + 10
    };
    if (catElRef.current) {
      catElRef.current.style.left = `${posRef.current.x}px`;
      catElRef.current.style.top = `${posRef.current.y}px`;
    }

    const interval = setInterval(() => {
      // 1. If dragging, freeze normal movement logic
      if (isDraggingRef.current) return;

      // 2. Handle Wander Trigger
      wanderCountRef.current++;
      const wanderInterval = getWanderInterval();
      if (wanderCountRef.current >= wanderInterval) {
        wanderCountRef.current = 0;
        if (stateRef.current !== 'WANDER' && bubbleStateRef.current !== 'HEART') {
          // 50% probability to wander
          if (Math.random() >= 0.5) {
            stateRef.current = 'WANDER';
            wanderTargetRef.current = generateRandomTarget(posRef.current.x, posRef.current.y);
          }
        }
      }

      // 3. Handle wandering coordinates
      if (stateRef.current === 'WANDER') {
        const tx = wanderTargetRef.current.x;
        const ty = wanderTargetRef.current.y;
        const cx = posRef.current.x;
        const cy = posRef.current.y;

        const dx = tx - cx;
        const dy = ty - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 3) {
          stateRef.current = 'DEFAULT';
        } else {
          // Walk in alignment with Kotlin: x coordinates take precedence
          if (Math.abs(dx) >= 3) {
            const walkAction = dx < 0 ? 'LEFT' : 'RIGHT';
            if (actionRef.current !== walkAction) {
              actionRef.current = walkAction;
              frameRef.current = 0;
              animationStepsRef.current = 0;
              syncState();
            }
          } else {
            const walkAction = dy < 0 ? 'UP' : 'DOWN';
            if (actionRef.current !== walkAction) {
              actionRef.current = walkAction;
              frameRef.current = 0;
              animationStepsRef.current = 0;
              syncState();
            }
          }
        }
      }

      // 4. Handle direction flips & idle action transitions
      let actionChanged = false;
      if (actionRef.current === 'LEFT') {
        if (layingDirRef.current !== 'LEFT') {
          layingDirRef.current = 'LEFT';
          actionChanged = true;
        }
      } else if (actionRef.current === 'RIGHT') {
        if (layingDirRef.current !== 'RIGHT') {
          layingDirRef.current = 'RIGHT';
          actionChanged = true;
        }
      } else if (stateRef.current !== 'WANDER' && (actionRef.current === 'UP' || actionRef.current === 'DOWN')) {
        // Finished walk loop, choose resting action: 2/3 LAYING, 1/3 SITTING
        const restAction = Math.random() < 0.666 ? 'LAYING' : 'SITTING';
        actionRef.current = restAction;
        frameRef.current = 0;
        animationStepsRef.current = 0;
        actionChanged = true;
      }
      if (actionChanged) {
        syncState();
      }

      // 5. Perform Movement Physics Translation
      let moveX = 0;
      let moveY = 0;
      if (actionRef.current === 'RIGHT') moveX = 1;
      else if (actionRef.current === 'LEFT') moveX = -1;
      else if (actionRef.current === 'UP') moveY = -1;
      else if (actionRef.current === 'DOWN') moveY = 1;

      if (moveX !== 0 || moveY !== 0) {
        posRef.current.x += moveX;
        posRef.current.y += moveY;

        // Viewport bounds clamping
        const minX = -10;
        const maxX = window.innerWidth - 100;
        const minY = -35;
        const maxY = window.innerHeight - 100;

        if (posRef.current.x < minX) posRef.current.x = minX;
        if (posRef.current.x > maxX) posRef.current.x = maxX;
        if (posRef.current.y < minY) posRef.current.y = minY;
        if (posRef.current.y > maxY) posRef.current.y = maxY;

        // DOM layout rendering bypass (no full React renders on pixel moves)
        if (catElRef.current) {
          catElRef.current.style.left = `${posRef.current.x}px`;
          catElRef.current.style.top = `${posRef.current.y}px`;
        }
      }

      // 6. Handle Frame Pacing & Transitions
      animationStepsRef.current++;
      const curAction = actionRef.current;
      const delay = DELAYS[curAction] || 10;
      const totalFrames = FRAMES_COUNT[curAction] || 4;

      if (animationStepsRef.current >= delay) {
        const isLastFrame = frameRef.current === totalFrames - 1;

        if (curAction === 'LAYING' && isLastFrame) {
          // Special transition: stay on last laying frame for an extra 40 ticks before curled/sleeping
          if (animationStepsRef.current - delay >= 40) {
            animationStepsRef.current = 0;
            frameRef.current = 0;
            actionRef.current = Math.random() < 0.5 ? 'CURLED' : 'SLEEP';
            syncState();
          }
        } else if (curAction === 'SITTING' && isLastFrame) {
          // Special transition: SITTING immediately changes to LICKING
          actionRef.current = 'LICKING';
          animationStepsRef.current = 0;
          frameRef.current = 0;
          syncState();
        } else {
          frameRef.current = (frameRef.current + 1) % totalFrames;
          animationStepsRef.current = 0;
          syncState();
        }
      }

      // 7. Manage Bubble Animation States
      if (bubbleStateRef.current !== 'HEART') {
        if (curAction === 'SLEEP' || curAction === 'CURLED') {
          if (bubbleStateRef.current !== 'ZZZ') {
            bubbleStateRef.current = 'ZZZ';
            bubbleFrameRef.current = 0;
            bubbleStepsRef.current = 0;
            syncState();
          }
        } else if (curAction !== 'SITTING') {
          if (bubbleStateRef.current !== 'NONE') {
            bubbleStateRef.current = 'NONE';
            bubbleFrameRef.current = 0;
            bubbleStepsRef.current = 0;
            syncState();
          }
        }
      }

      if (bubbleStateRef.current !== 'NONE') {
        bubbleStepsRef.current++;
        const bDelay = BUBBLE_DELAYS[bubbleStateRef.current] || 30;
        const bTotalFrames = BUBBLE_FRAMES_COUNT[bubbleStateRef.current] || 4;

        if (bubbleStepsRef.current >= bDelay) {
          bubbleFrameRef.current++;
          bubbleStepsRef.current = 0;

          if (bubbleFrameRef.current >= bTotalFrames) {
            bubbleFrameRef.current = 0;
            if (bubbleStateRef.current === 'HEART') {
              bubbleStateRef.current = 'NONE';
            }
          }
          syncState();
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Handle pointer drag start
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Left click only

    isDraggingRef.current = true;
    dragOffsetRef.current = {
      x: e.clientX - posRef.current.x,
      y: e.clientY - posRef.current.y
    };

    actionRef.current = 'RISING';
    frameRef.current = 0;
    animationStepsRef.current = 0;
    stateRef.current = 'DEFAULT';
    syncState();

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // Handle dragging movement
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    let newX = e.clientX - dragOffsetRef.current.x;
    let newY = e.clientY - dragOffsetRef.current.y;

    const minX = -10;
    const maxX = window.innerWidth - 100;
    const minY = -35;
    const maxY = window.innerHeight - 100;

    if (newX < minX) newX = minX;
    if (newX > maxX) newX = maxX;
    if (newY < minY) newY = minY;
    if (newY > maxY) newY = maxY;

    posRef.current.x = newX;
    posRef.current.y = newY;

    if (catElRef.current) {
      catElRef.current.style.left = `${newX}px`;
      catElRef.current.style.top = `${newY}px`;
    }
  };

  // Handle drop release
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (actionRef.current === 'RISING') {
      actionRef.current = 'LAYING';
      frameRef.current = 0;
      animationStepsRef.current = 0;
      syncState();
    }
  };

  // Click handler forces HEART state
  const handleCatClick = () => {
    // If they were dragging, do not count as click
    if (actionRef.current === 'RISING') return;

    bubbleStateRef.current = 'HEART';
    bubbleFrameRef.current = 0;
    bubbleStepsRef.current = 0;

    actionRef.current = 'SITTING';
    frameRef.current = 0;
    animationStepsRef.current = 0;
    stateRef.current = 'DEFAULT';

    syncState();
  };

  // Determine whether to flip sprite horizontally based on action and direction
  const needsFlipping = () => {
    const act = action;
    const dir = layingDir;
    return (
      ((act === 'LAYING' || act === 'RISING' || act === 'SLEEP') && dir === 'LEFT') ||
      (act === 'CURLED' && dir === 'RIGHT')
    );
  };

  // Calculate bubble position within 100x100 box
  const getBubblePos = () => {
    const act = action;
    const dir = layingDir;
    const baseX = 30;
    const baseY = 40;

    if (['SLEEP', 'LAYING', 'LEFT', 'RIGHT'].includes(act)) {
      return {
        x: dir === 'LEFT' ? 0 : baseX + 30,
        y: baseY
      };
    }

    if (['UP', 'LICKING', 'SITTING'].includes(act)) {
      return {
        x: baseX,
        y: baseY - 25
      };
    }

    return {
      x: baseX,
      y: baseY
    };
  };

  const bubblePos = getBubblePos();
  const lowerAction = action.toLowerCase();

  return (
    <div
      ref={catElRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleCatClick}
      className="fixed w-[100px] h-[100px] select-none z-[999] cursor-grab active:cursor-grabbing"
      style={{
        touchAction: 'none' // Prevent default mobile scrolling gestures during drag
      }}
    >
      {/* Cat Sprite Render */}
      <img
        src={`/${variant}/${lowerAction}/${lowerAction}_${frameNum + 1}.png`}
        alt="cat"
        style={{
          transform: needsFlipping() ? 'scaleX(-1)' : 'none',
          imageRendering: 'pixelated'
        }}
        className="w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
      />

      {/* Bubble Telemetry/Expression Render */}
      {bubbleState !== 'NONE' && (
        <img
          src={`/${variant}/${bubbleState.toLowerCase()}/${bubbleState.toLowerCase()}_${bubbleFrame + 1}.png`}
          alt="bubble"
          style={{
            position: 'absolute',
            left: `${bubblePos.x}px`,
            top: `${bubblePos.y}px`,
            width: '30px',
            height: '30px',
            imageRendering: 'pixelated'
          }}
          className="pointer-events-none select-none"
          draggable={false}
        />
      )}
    </div>
  );
};
