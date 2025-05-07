// Animation utility functions for the landing page

// Function to handle parallax effect
export const handleParallax = (
  event: React.MouseEvent<HTMLElement> | MouseEvent,
  element: HTMLElement | null,
  speed: number = 0.05
) => {
  if (!element) return;

  const { clientX, clientY } = event;
  const rect = element.getBoundingClientRect();
  
  // Calculate center of the element
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Calculate distance from center
  const distanceX = (clientX - centerX) * speed;
  const distanceY = (clientY - centerY) * speed;
  
  // Apply transform
  element.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
};

// Function to handle tilt effect
export const handleTilt = (
  event: React.MouseEvent<HTMLElement> | MouseEvent,
  element: HTMLElement | null,
  intensity: number = 10
) => {
  if (!element) return;

  const { clientX, clientY } = event;
  const rect = element.getBoundingClientRect();
  
  // Calculate position relative to element (0 to 1)
  const relativeX = (clientX - rect.left) / rect.width;
  const relativeY = (clientY - rect.top) / rect.height;
  
  // Calculate tilt angles (-intensity to +intensity degrees)
  const tiltX = (relativeY - 0.5) * intensity * -1; // Invert Y axis
  const tiltY = (relativeX - 0.5) * intensity;
  
  // Apply transform
  element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
};

// Function to reset transform
export const resetTransform = (element: HTMLElement | null) => {
  if (!element) return;
  element.style.transform = 'none';
  element.style.transition = 'transform 0.5s ease';
};

// Function to handle floating animation
export const startFloatingAnimation = (
  element: HTMLElement | null,
  amplitude: number = 10,
  duration: number = 3000
) => {
  if (!element) return;
  
  let startTime: number | null = null;
  let animationFrameId: number;
  
  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    
    // Calculate position using sine wave
    const position = amplitude * Math.sin((elapsed / duration) * Math.PI * 2);
    
    // Apply transform
    element.style.transform = `translateY(${position}px)`;
    
    // Continue animation
    animationFrameId = requestAnimationFrame(animate);
  };
  
  // Start animation
  animationFrameId = requestAnimationFrame(animate);
  
  // Return function to stop animation
  return () => {
    cancelAnimationFrame(animationFrameId);
  };
};

// Function to handle scroll-triggered animations using Intersection Observer
export const createScrollObserver = (
  elements: NodeListOf<Element> | Element[],
  animationClass: string,
  threshold: number = 0.2,
  rootMargin: string = '0px'
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold, rootMargin }
  );
  
  elements.forEach((element) => {
    observer.observe(element);
  });
  
  return observer;
};

// Function to create a counter animation
export const animateCounter = (
  element: HTMLElement | null,
  targetValue: number,
  duration: number = 2000,
  prefix: string = '',
  suffix: string = ''
) => {
  if (!element) return;
  
  const startTime = performance.now();
  const startValue = 0;
  
  const updateCounter = (timestamp: number) => {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Use easeOutExpo for smoother animation near the end
    const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    
    // Calculate current value
    const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutExpo);
    
    // Update element text
    element.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`;
    
    // Continue animation if not complete
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  };
  
  requestAnimationFrame(updateCounter);
};

// Function to create a typing animation
export const animateTyping = (
  element: HTMLElement | null,
  text: string,
  speed: number = 50,
  startDelay: number = 0
) => {
  if (!element) return;
  
  let index = 0;
  element.textContent = '';
  
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    }, startDelay);
  });
};

// Function to create a gradient animation
export const animateGradient = (
  element: HTMLElement | null,
  colors: string[],
  duration: number = 10000
) => {
  if (!element) return;
  
  let startTime: number | null = null;
  let animationFrameId: number;
  
  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = (timestamp - startTime) % duration;
    const progress = elapsed / duration;
    
    // Calculate color index
    const colorCount = colors.length;
    const index = Math.floor(progress * colorCount);
    const nextIndex = (index + 1) % colorCount;
    const colorProgress = (progress * colorCount) % 1;
    
    // Create gradient
    const gradient = `linear-gradient(135deg, ${colors[index]} 0%, ${colors[nextIndex]} 100%)`;
    
    // Apply gradient
    element.style.background = gradient;
    
    // Continue animation
    animationFrameId = requestAnimationFrame(animate);
  };
  
  // Start animation
  animationFrameId = requestAnimationFrame(animate);
  
  // Return function to stop animation
  return () => {
    cancelAnimationFrame(animationFrameId);
  };
};

// Function to create a particle animation
export const createParticles = (
  container: HTMLElement | null,
  count: number = 50,
  color: string = 'rgba(255, 255, 255, 0.5)',
  minSize: number = 2,
  maxSize: number = 6,
  speed: number = 1
) => {
  if (!container) return;
  
  // Clear existing particles
  container.innerHTML = '';
  
  // Create particles
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Random size
    const size = minSize + Math.random() * (maxSize - minSize);
    
    // Random opacity
    const opacity = 0.3 + Math.random() * 0.7;
    
    // Random speed
    const particleSpeed = speed * (0.5 + Math.random());
    
    // Set styles
    particle.style.position = 'absolute';
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = color;
    particle.style.opacity = opacity.toString();
    particle.style.animation = `float ${particleSpeed}s infinite ease-in-out`;
    
    // Add to container
    container.appendChild(particle);
  }
};

// Export all animation functions
export default {
  handleParallax,
  handleTilt,
  resetTransform,
  startFloatingAnimation,
  createScrollObserver,
  animateCounter,
  animateTyping,
  animateGradient,
  createParticles
};
