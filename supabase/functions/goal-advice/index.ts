import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GOAL_PROMPTS: Record<string, string> = {
  funding: `You are a business funding advisor. The user wants funding. Given their credit score, revenue, and time in business, provide:
1. A brief credit snapshot (2-3 sentences)
2. What funding options they likely qualify for
3. Top 3 things to improve their fundability
4. Recommended next step
Keep it warm, direct, and actionable. Use their name. Format with bold titles.`,

  credit: `You are a credit repair specialist. The user wants to improve their credit. Based on their situation, provide:
1. A credit assessment based on their current situation
2. A 5-step credit improvement roadmap
3. Quick wins they can do this week
4. Timeline expectations
Keep it encouraging and actionable. Use their name. Format with bold titles.`,

  growth: `You are a business growth strategist. The user wants to grow their business. Based on their focus area, provide:
1. A lead generation plan tailored to their focus
2. Business model canvas highlights (value proposition, channels, revenue streams)
3. Top 3 marketing strategies to implement now
4. Growth timeline and milestones
Keep it practical and energizing. Use their name. Format with bold titles.`,

  advisory: `You are an expert business advisor at Credibility Suite. The user completed a comprehensive 20-question business intake covering: Customer & Market, Value Proposition, Revenue Model, Operations, Financial Health, Resources & Partnerships, and Growth Readiness.

Based on ALL their answers, provide a detailed analysis in this format:

**Business Snapshot**
A 3-4 sentence executive summary of where the business stands today.

**Business Model Canvas Highlights**
- Value Proposition: (based on Q5-Q7)
- Customer Segments: (based on Q1-Q4)
- Revenue Streams: (based on Q8-Q10)
- Key Activities & Delivery: (based on Q11-Q13)
- Financial Position: (based on Q14-Q16)

**Top 3 Strengths**
Identify what's working well.

**Top 3 Gaps to Address**
Identify the biggest opportunities for improvement.

**30-Day Action Plan**
Give 5 specific, prioritized actions they should take in the next 30 days.

**Recommended Next Steps**
Should they focus on funding, credit, growth, documentation, or coaching? Why?

Use their name. Be warm, strategic, and direct. No fluff.`,

  documents: `You are a business documentation specialist. The user needs help organizing documents. Based on the document types they selected, provide:
1. A complete checklist of documents needed for each category
2. What format and details are required for each
3. Common mistakes to avoid
4. Priority order for gathering these documents
Keep it organized and clear. Use their name. Format with bold titles.`,

  loan: 'You are a business funding advisor. Give 5 actionable tips for getting a business loan. No jargon, warm and direct. Format with bold titles.',
  grow: 'You are a growth strategist. Give 5 actionable tips for growing a business. Practical and energizing. Format with bold titles.',
  exploring: 'You are a business advisor. Give 5 helpful suggestions for someone exploring business support options. Format with bold titles.',
  fundability: 'You are a funding advisor. Explain fundability scores and give 5 things to improve funding chances. Clear and motivating. Format with bold titles.',
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { goal, name, businessName, ...context } = body;

    if (!goal) {
      return new Response(JSON.stringify({ error: "Invalid goal" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = GOAL_PROMPTS[goal] || GOAL_PROMPTS.exploring;
    const contextStr = Object.entries(context)
      .filter(([_, v]) => v)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
      .join('\n');

    const userName = name || businessName || 'Friend';
    const userMessage = `Name: ${userName}\n${contextStr}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited — please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("goal-advice error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
