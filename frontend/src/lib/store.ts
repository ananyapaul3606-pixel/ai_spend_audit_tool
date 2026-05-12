import { useLocalStorageState } from "../hooks/useLocalStorageState";
import type { AuditResponse } from "./api";

const LAST_AUDIT_KEY = "ai_spend_audit:last_result:v1";

export function useLastAudit() {
  return useLocalStorageState<AuditResponse | null>(LAST_AUDIT_KEY, null);
}

