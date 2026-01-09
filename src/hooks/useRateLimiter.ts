import { useState, useCallback, useRef } from 'react';

interface RateLimiterOptions {
  maxRequests: number;
  windowMs: number;
}

export function useRateLimiter({ maxRequests = 5, windowMs = 60000 }: RateLimiterOptions = { maxRequests: 5, windowMs: 60000 }) {
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState(maxRequests);
  const requestTimestamps = useRef<number[]>([]);

  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    
    // Eski so'rovlarni tozalash
    requestTimestamps.current = requestTimestamps.current.filter(
      timestamp => now - timestamp < windowMs
    );

    // Limitni tekshirish
    if (requestTimestamps.current.length >= maxRequests) {
      setIsBlocked(true);
      setRemainingRequests(0);
      
      // Blokni avtomatik ochish
      const oldestRequest = requestTimestamps.current[0];
      const unblockTime = oldestRequest + windowMs - now;
      
      setTimeout(() => {
        setIsBlocked(false);
        requestTimestamps.current = requestTimestamps.current.filter(
          ts => Date.now() - ts < windowMs
        );
        setRemainingRequests(maxRequests - requestTimestamps.current.length);
      }, unblockTime);
      
      return false;
    }

    // So'rovni qayd etish
    requestTimestamps.current.push(now);
    setRemainingRequests(maxRequests - requestTimestamps.current.length);
    
    return true;
  }, [maxRequests, windowMs]);

  const resetLimiter = useCallback(() => {
    requestTimestamps.current = [];
    setIsBlocked(false);
    setRemainingRequests(maxRequests);
  }, [maxRequests]);

  return {
    isBlocked,
    remainingRequests,
    checkRateLimit,
    resetLimiter
  };
}
