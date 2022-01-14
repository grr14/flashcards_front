import { useEffect, RefObject, SetStateAction } from "react"

/**
 * Hook that alerts clicks outside of the passed ref, set the state of the callback to false
 */
const useOutsideAlerter = (
  ref: RefObject<HTMLElement>,
  callback: (value: SetStateAction<boolean>) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, callback])
}

export { useOutsideAlerter }
