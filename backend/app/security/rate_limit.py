from __future__ import annotations

import time
from dataclasses import dataclass


@dataclass
class _Bucket:
    tokens: float
    last: float


class TokenBucketRateLimiter:
    """
    Tiny in-memory limiter (good enough for MVP; replace with Redis for multi-instance).
    """

    def __init__(self, capacity: int, refill_per_sec: float):
        self.capacity = float(capacity)
        self.refill_per_sec = float(refill_per_sec)
        self._buckets: dict[str, _Bucket] = {}

    def allow(self, key: str, cost: float = 1.0) -> bool:
        now = time.time()
        b = self._buckets.get(key)
        if b is None:
            b = _Bucket(tokens=self.capacity, last=now)
            self._buckets[key] = b

        elapsed = now - b.last
        b.tokens = min(self.capacity, b.tokens + elapsed * self.refill_per_sec)
        b.last = now

        if b.tokens >= cost:
            b.tokens -= cost
            return True
        return False

