import useWindowDimensions from './useWindowDimensions'

export const BREAKPOINTS = {
  SM: 768,
  MD: 1024,
  LG: 1440,
}

const useViewportSize = (breakpoint?: number) => {
  const { width } = useWindowDimensions()

  if (width) {
    return {
      isMobile: width <= BREAKPOINTS.SM,
      isPhablet: width >= BREAKPOINTS.SM,
      isTablet: width >= BREAKPOINTS.MD,
      isDesktop: width >= BREAKPOINTS.LG,
      isSpecialBreakpoint: breakpoint && width <= breakpoint,
    }
  }

  // There is no window object in server side, so we need to decide which layout mobile/desktop we show on the very first render.
  // Went with versions bigger than mobile for now. Can be changed later once we have analytics and see which devices users are using.
  return {
    isMobile: false,
    isPhablet: true,
    isTablet: true,
    isDesktop: true,
    isSpecialBreakpoint: true,
  }
}

export default useViewportSize
