/**
 * Valley Daycare Growth Agent - Type Definitions
 *
 * Customer Success + Lead Conversion + Email Marketing Agent
 */

// Lead classification temperatures
export type LeadTemperature = "HOT" | "WARM" | "COLD";

// Lead status in pipeline
export type LeadStatus = "NEW" | "QUALIFIED" | "IN_PROGRESS" | "CONVERTED" | "LOST";

// Follow-up status
export type FollowUpStatus = "SCHEDULED" | "SENT" | "SKIPPED";

// Message direction
export type MessageDirection = "inbound" | "outbound";

// Incoming email structure
export interface IncomingEmail {
  from: string;
  fromName?: string;
  to: string;
  subject: string;
  body: string;
  receivedAt: Date;
  messageId?: string;
  inReplyTo?: string;
}

// Agent analysis result for an email
export interface EmailAnalysis {
  isDaycareOwner: boolean;
  interestLevel: "high" | "medium" | "low" | "none";
  intent: "purchase" | "inquiry" | "information" | "support" | "spam";
  keyQuestions: string[];
  mentionedServices: string[];
  urgency: "immediate" | "soon" | "no_rush";
  temperature: LeadTemperature;
  reasoning: string;
}

// Agent response generation
export interface AgentResponse {
  reply: string;
  temperature: LeadTemperature;
  nextStep: string;
  shouldFollowUp: boolean;
  followUpDays?: number;
}

// Lead data for database
export interface LeadData {
  email: string;
  name?: string;
  businessName?: string;
  phone?: string;
  temperature: LeadTemperature;
  status: LeadStatus;
  notes?: string;
  source?: string;
}

// Conversation data for database
export interface ConversationData {
  leadId: string;
  subject?: string;
}

// Message data for database
export interface MessageData {
  conversationId: string;
  direction: MessageDirection;
  content: string;
  fromEmail: string;
  toEmail: string;
  subject?: string;
  classification?: string;
  suggestedReply?: string;
}

// Follow-up data for database
export interface FollowUpData {
  leadId: string;
  scheduledAt: Date;
  sequenceDay: number;
  message?: string;
}

// Services offered by Valley Daycare Sites
export const SERVICES = {
  WEBSITE_DESIGN: {
    name: "Professional Website Design",
    description: "Custom daycare website design that converts visitors into enrollments",
  },
  HOSTING: {
    name: "Reliable Hosting",
    description: "Fast, secure hosting with 99.9% uptime guarantee",
  },
  SEO: {
    name: "Local SEO",
    description: "Get found by parents searching for daycare in your area",
  },
  SUPPORT: {
    name: "Ongoing Support",
    description: "Dedicated support to help you manage and grow your site",
  },
  SETUP: {
    name: "Full Setup",
    description: "We handle everything from domain to launch",
  },
} as const;

// Follow-up sequence configuration
export const FOLLOW_UP_SEQUENCE = [
  { day: 1, template: "initial_followup" },
  { day: 3, template: "value_reminder" },
  { day: 7, template: "final_checkin" },
] as const;

// Hot lead indicators - phrases that suggest ready to buy
export const HOT_LEAD_INDICATORS = [
  "ready to start",
  "want to get started",
  "sign up",
  "book",
  "purchase",
  "buy now",
  "asap",
  "immediately",
  "this week",
  "need a website now",
  "ready to move forward",
  "let's do it",
  "when can you start",
  "how soon",
  "urgent",
];

// Warm lead indicators - phrases that show interest
export const WARM_LEAD_INDICATORS = [
  "interested",
  "tell me more",
  "how does it work",
  "pricing",
  "cost",
  "what's included",
  "looking for",
  "considering",
  "thinking about",
  "daycare",
  "childcare center",
  "preschool",
  "learning center",
];

// Cold lead indicators - just browsing or spam
export const COLD_LEAD_INDICATORS = [
  "just curious",
  "browsing",
  "not ready",
  "maybe later",
  "just looking",
  "researching",
  "competitor",
];

// Daycare-related keywords to identify target customers
export const DAYCARE_KEYWORDS = [
  "daycare",
  "childcare",
  "preschool",
  "nursery",
  "learning center",
  "early childhood",
  "kids care",
  "children",
  "toddler",
  "infant care",
  "after school",
  "child development",
  "enrollment",
  "parents",
];
