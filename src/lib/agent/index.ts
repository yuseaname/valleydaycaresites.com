/**
 * Valley Daycare Growth Agent
 *
 * Customer Success + Lead Conversion + Email Marketing
 *
 * This module provides:
 * - Email analysis and lead classification (HOT/WARM/COLD)
 * - Automated response generation
 * - Follow-up sequence management
 * - Lead tracking and conversion optimization
 */

// Core types
export type {
  IncomingEmail,
  EmailAnalysis,
  AgentResponse,
  LeadTemperature,
  LeadStatus,
  FollowUpStatus,
  MessageDirection,
  LeadData,
  ConversationData,
  MessageData,
  FollowUpData,
} from "./types";

export {
  SERVICES,
  FOLLOW_UP_SEQUENCE,
  HOT_LEAD_INDICATORS,
  WARM_LEAD_INDICATORS,
  COLD_LEAD_INDICATORS,
  DAYCARE_KEYWORDS,
} from "./types";

// Core agent functions
export { analyzeEmail, generateResponse, generateFollowUp, AGENT_PROMPT } from "./core";

/**
 * Quick Start Example:
 *
 * ```typescript
 * import { analyzeEmail, generateResponse } from "@/lib/agent";
 *
 * const email = {
 *   from: "owner@daycare.com",
 *   fromName: "Jane Smith",
 *   to: "contact@valleydaycaresites.com",
 *   subject: "Interested in a website",
 *   body: "Hi, I run a daycare and I'm interested in getting a website. How much does it cost?",
 *   receivedAt: new Date(),
 * };
 *
 * const analysis = analyzeEmail(email);
 * // { temperature: "WARM", isDaycareOwner: true, ... }
 *
 * const response = generateResponse(email, analysis);
 * // { reply: "Hi Jane...", temperature: "WARM", nextStep: "..." }
 * ```
 */
