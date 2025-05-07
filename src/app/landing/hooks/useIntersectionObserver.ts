'use client'

import { useEffect, useRef, useState, RefObject } from 'react'

interface IntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
  once?: boolean
}

/**
 * Custom hook for detecting when an element enters the viewport
 * @param options - IntersectionObserver options
 * @returns [ref, isIntersecting] - Ref to attach to the element and boolean indicating if element is in viewport
 */
export const useIntersectionObserver = <T extends Element>({
  threshold = 0.1,
  rootMargin = '0px',
  root = null,
  once = true
}: IntersectionObserverOptions = {}): [RefObject<T>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const elementRef = useRef<T>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Save current element reference
    const element = elementRef.current
    
    // Cleanup previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    
    // Create new observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        
        // Update state when intersection changes
        setIsIntersecting(isElementIntersecting)
        
        // If element is intersecting and we only want to trigger once, unobserve
        if (isElementIntersecting && once && element) {
          observerRef.current?.unobserve(element)
        }
      },
      { threshold, rootMargin, root }
    )
    
    // Start observing the element
    if (element) {
      observerRef.current.observe(element)
    }
    
    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, rootMargin, root, once])
  
  return [elementRef, isIntersecting]
}

/**
 * Custom hook for applying animation classes when elements enter the viewport
 * @param animationClass - CSS class to apply when element enters viewport
 * @param options - IntersectionObserver options
 * @returns ref - Ref to attach to the element
 */
export const useAnimateOnScroll = <T extends Element>(
  animationClass: string,
  options: IntersectionObserverOptions = {}
): RefObject<T> => {
  const [ref, isIntersecting] = useIntersectionObserver<T>(options)
  
  useEffect(() => {
    if (isIntersecting && ref.current) {
      ref.current.classList.add(animationClass)
    }
  }, [isIntersecting, animationClass, ref])
  
  return ref
}

/**
 * Custom hook for staggered animations on child elements
 * @param childSelector - CSS selector for child elements
 * @param animationClass - CSS class to apply to children
 * @param staggerDelay - Delay between each child animation in ms
 * @param options - IntersectionObserver options
 * @returns ref - Ref to attach to the parent element
 */
export const useStaggeredAnimation = <T extends Element>(
  childSelector: string,
  animationClass: string,
  staggerDelay: number = 100,
  options: IntersectionObserverOptions = {}
): RefObject<T> => {
  const [ref, isIntersecting] = useIntersectionObserver<T>(options)
  
  useEffect(() => {
    if (isIntersecting && ref.current) {
      const children = ref.current.querySelectorAll(childSelector)
      
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add(animationClass)
        }, index * staggerDelay)
      })
    }
  }, [isIntersecting, childSelector, animationClass, staggerDelay, ref])
  
  return ref
}

export default useIntersectionObserver
