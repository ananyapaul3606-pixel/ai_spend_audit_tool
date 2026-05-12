export type ToolKey =
  | "chatgpt"
  | "claude"
  | "copilot"
  | "gemini"
  | "perplexity"
  | "midjourney"
  | "other";

export type PlanKey = "free" | "individual" | "team" | "enterprise";

export type UseCaseKey =
  | "coding"
  | "support"
  | "marketing"
  | "sales"
  | "research"
  | "design"
  | "other";

export type ToolSpendRow = {
  id: string;
  tool: ToolKey;
  plan: PlanKey;
  monthly_spend_usd: number;
  seats: number;
};

export type SpendInput = {
  team_size: number;
  use_case: UseCaseKey;
  tools: ToolSpendRow[];
};

