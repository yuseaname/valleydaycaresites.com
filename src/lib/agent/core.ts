/**
 * Valley Daycare Growth Agent - Core Logic
 *
 * Lead Classification + Response Generation
 */

import {
  IncomingEmail,
  EmailAnalysis,
  AgentResponse,
  LeadTemperature,
  HOT_LEAD_INDICATORS,
  WARM_LEAD_INDICATORS,
  COLD_LEAD_INDICATORS,
  DAYCARE_KEYWORDS,
  SERVICES,
  FOLLOW_UP_SEQUENCE,
} from "./types";

/**
 * Analyze an incoming email to classify the lead
 */
export function analyzeEmail(email: IncomingEmail): EmailAnalysis {
  const text = `${email.subject} ${email.body}`.toLowerCase();

  // Check if this is a daycare owner
  const isDaycareOwner = DAYCARE_KEYWORDS.some((keyword) =>
    text.includes(keyword)
  );

  // Count indicators for each temperature
  const hotScore = HOT_LEAD_INDICATORS.filter((indicator) =>
    text.includes(indicator)
  ).length;

  const warmScore = WARM_LEAD_INDICATORS.filter((indicator) =>
    text.includes(indicator)
  ).length;

  const coldScore = COLD_LEAD_INDICATORS.filter((indicator) =>
    text.includes(indicator)
  ).length;

  // Determine temperature
  let temperature: LeadTemperature;
  if (hotScore >= 2 || (hotScore >= 1 && warmScore >= 2)) {
    temperature = "HOT";
  } else if (warmScore >= 2 || (warmScore >= 1 && isDaycareOwner)) {
    temperature = "WARM";
  } else {
    temperature = "COLD";
  }

  // Override: if cold indicators dominate, keep it cold
  if (coldScore > hotScore && coldScore > warmScore) {
    temperature = "COLD";
  }

  // Determine interest level
  const interestLevel =
    temperature === "HOT"
      ? "high"
      : temperature === "WARM"
        ? "medium"
        : isDaycareOwner
          ? "low"
          : "none";

  // Determine intent
  let intent: EmailAnalysis["intent"] = "inquiry";
  if (text.includes("price") || text.includes("cost") || text.includes("pricing")) {
    intent = "inquiry";
  } else if (temperature === "HOT") {
    intent = "purchase";
  } else if (text.includes("help") || text.includes("support") || text.includes("issue")) {
    intent = "support";
  } else if (text.includes("just") && text.includes("curious")) {
    intent = "information";
  }

  // Determine urgency
  let urgency: EmailAnalysis["urgency"] = "no_rush";
  if (
    text.includes("asap") ||
    text.includes("immediately") ||
    text.includes("urgent") ||
    text.includes("right away")
  ) {
    urgency = "immediate";
  } else if (
    text.includes("soon") ||
    text.includes("this week") ||
    text.includes("quickly")
  ) {
    urgency = "soon";
  }

  // Extract key questions (sentences ending with ?)
  const sentences = (email.body || "").split(/[.!?]+/);
  const keyQuestions = sentences
    .filter((s) => s.includes("?"))
    .map((s) => s.trim())
    .slice(0, 3);

  // Find mentioned services
  const mentionedServices: string[] = [];
  const serviceNames = Object.values(SERVICES).map((s) => s.name.toLowerCase());
  for (const serviceName of serviceNames) {
    if (text.includes(serviceName) || text.includes(serviceName.split(" ")[0])) {
      mentionedServices.push(serviceName);
    }
  }

  // Build reasoning
  const reasoning = buildReasoning(
    temperature,
    isDaycareOwner,
    interestLevel,
    intent,
    urgency
  );

  return {
    isDaycareOwner,
    interestLevel,
    intent,
    keyQuestions,
    mentionedServices,
    urgency,
    temperature,
    reasoning,
  };
}

/**
 * Build human-readable reasoning for classification
 */
function buildReasoning(
  temperature: LeadTemperature,
  isDaycareOwner: boolean,
  interestLevel: string,
  intent: string,
  urgency: string
): string {
  const parts: string[] = [];

  if (isDaycareOwner) {
    parts.push("Identified as daycare owner");
  } else {
    parts.push("Not clearly identified as daycare owner");
  }

  parts.push(`Interest level: ${interestLevel}`);
  parts.push(`Intent: ${intent}`);

  if (urgency !== "no_rush") {
    parts.push(`Urgency: ${urgency}`);
  }

  parts.push(`Classified as ${temperature} lead`);

  return parts.join(". ");
}

/**
 * Generate an agent response based on email analysis
 */
export function generateResponse(
  email: IncomingEmail,
  analysis: EmailAnalysis
): AgentResponse {
  const { temperature, isDaycareOwner, intent, keyQuestions, urgency } = analysis;

  let reply = "";
  let nextStep = "";
  let shouldFollowUp = true;
  let followUpDays = 3;

  // Get sender's first name for personalization
  const firstName = email.fromName?.split(" ")[0] || "there";

  switch (temperature) {
    case "HOT":
      reply = generateHotLeadResponse(email, firstName, intent, urgency);
      nextStep = "Schedule call or send proposal";
      followUpDays = 1;
      break;

    case "WARM":
      reply = generateWarmLeadResponse(email, firstName, intent, keyQuestions);
      nextStep = "Answer questions and nurture toward purchase";
      followUpDays = 3;
      break;

    case "COLD":
      reply = generateColdLeadResponse(email, firstName, isDaycareOwner);
      nextStep = "Provide value and stay top of mind";
      followUpDays = 7;
      break;
  }

  return {
    reply,
    temperature,
    nextStep,
    shouldFollowUp,
    followUpDays,
  };
}

/**
 * Generate response for HOT leads - ready to buy
 */
function generateHotLeadResponse(
  email: IncomingEmail,
  firstName: string,
  intent: string,
  urgency: string
): string {
  const urgencyPrefix =
    urgency === "immediate"
      ? "I completely understand you need this quickly."
      : "";

  if (intent === "purchase") {
    return `Hi ${firstName},

${urgencyPrefix}

Great to hear from you! I'd love to help you get your daycare website up and running.

I can get you set up this week. Here's what's included:
- Custom website design for your daycare
- Mobile-friendly layout
- Contact form for parent inquiries
- Hosting and ongoing support

Want me to get this started for you? Just reply with a good time for a quick call, or let me know if you'd like me to send over the details.

Looking forward to helping your daycare shine online!

Best,
Valley Daycare Sites
contact@valleydaycaresites.com`;
  }

  return `Hi ${firstName},

${urgencyPrefix}

Thanks for reaching out! I can definitely help you get your daycare online.

The quickest way to get started is a quick 15-minute call where I can:
- Learn about your daycare
- Show you what we can build for you
- Get you set up right away

Want me to set this up for you? Just let me know what works best.

Best,
Valley Daycare Sites
contact@valleydaycaresites.com`;
}

/**
 * Generate response for WARM leads - interested but exploring
 */
function generateWarmLeadResponse(
  email: IncomingEmail,
  firstName: string,
  intent: string,
  keyQuestions: string[]
): string {
  // Address specific questions if present
  let questionsSection = "";
  if (keyQuestions.length > 0) {
    questionsSection = `\n\nGreat questions! Let me address them:\n\n`;
    // We'd normally address specific questions here
    questionsSection +=
      "I'd be happy to go over all the details. The best way is usually a quick call where I can answer everything and show you examples.\n";
  }

  if (intent === "inquiry" || keyQuestions.length > 0) {
    return `Hi ${firstName},

Thanks for your interest in Valley Daycare Sites!
${questionsSection}
We help daycare owners get professional websites that bring in new enrollments. Everything is handled for you - design, setup, hosting, and support.

Our most popular package starts at a simple monthly rate with no long-term commitment.

Would you like me to send you more details, or would a quick call work better to answer your questions?

Best,
Valley Daycare Sites
contact@valleydaycaresites.com`;
  }

  return `Hi ${firstName},

Thanks for reaching out! I'd be happy to help you learn more about getting a website for your daycare.

We take care of everything - design, setup, and ongoing support - so you can focus on what you do best.

What would be most helpful? I can:
- Send you pricing and package details
- Show you examples of sites we've built
- Schedule a quick call to discuss your needs

Just let me know what works for you!

Best,
Valley Daycare Sites
contact@valleydaycaresites.com`;
}

/**
 * Generate response for COLD leads - just information seeking
 */
function generateColdLeadResponse(
  email: IncomingEmail,
  firstName: string,
  isDaycareOwner: boolean
): string {
  if (!isDaycareOwner) {
    return `Hi ${firstName},

Thanks for your message! I'm not sure if you're looking for a daycare website, but I'm happy to help if you have any questions about our services.

If you're a daycare owner looking to improve your online presence, we'd love to chat. We handle everything from design to hosting to ongoing support.

Feel free to reach out anytime if we can help!

Best,
Valley Daycare Sites
contact@valleydaycaresites.com`;
  }

  return `Hi ${firstName},

Thanks for reaching out!

When you're ready to get your daycare online (or improve your current site), we're here to help. We handle everything so you can focus on the kids.

In the meantime, feel free to check out our website at valleydaycaresites.com for pricing and examples.

No pressure - just let us know when you're ready!

Best,
Valley Daycare Sites
contact@valleydaycaresites.com`;
}

/**
 * Generate follow-up message based on sequence day
 */
export function generateFollowUp(
  leadName: string,
  sequenceDay: number,
  previousMessages: string[]
): string {
  const firstName = leadName.split(" ")[0] || "there";

  switch (sequenceDay) {
    case 1:
      return `Hi ${firstName},

Just wanted to follow up on my previous message.

I know running a daycare keeps you busy, so no pressure at all. But if you're still thinking about getting a website (or improving your current one), I'm here to help.

Let me know if you have any questions!

Best,
Valley Daycare Sites`;

    case 3:
      return `Hi ${firstName},

I wanted to share a quick thought: most parents search online when looking for daycare. Having a professional website can make a big difference in attracting new families.

We handle everything for you - design, setup, hosting, and support - so you don't have to worry about the technical stuff.

If you're curious about what we could build for your daycare, just reply to this email. Happy to chat!

Best,
Valley Daycare Sites`;

    case 7:
      return `Hi ${firstName},

I'll keep this brief - I know you're busy!

If you're still considering a website for your daycare, I'm here whenever you're ready. No rush, no pressure.

Just reply to this email or give me a shout when the time is right.

Wishing you all the best with your daycare!

Best,
Valley Daycare Sites`;

    default:
      return `Hi ${firstName},

Just checking in. Let me know if there's anything I can help with!

Best,
Valley Daycare Sites`;
  }
}

/**
 * Export the agent's core prompt for documentation
 */
export const AGENT_PROMPT = `You are the Customer Success & Email Marketing Agent for ValleyDaycareSites.com.

Your job is to:
1. Respond to incoming emails from daycare owners or potential customers
2. Provide clear, simple, and helpful answers
3. Guide every conversation toward a conversion (booking, signup, or next step)
4. Classify each lead as HOT, WARM, or COLD based on intent
5. Encourage follow-up actions without being pushy

Rules:
- Keep responses short, clear, and friendly
- Avoid technical jargon
- Always move the conversation forward
- If the lead shows interest, suggest the next step (setup, call, or getting started)
- If unsure, ask a simple clarifying question

Services context:
ValleyDaycareSites.com helps daycare owners get a professional website quickly, including setup, hosting, and support.

Output format:
- Email Reply
- Lead Classification (HOT/WARM/COLD)
- Suggested Next Step`;
