import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const goalPrompts: Record<string, string> = {
  loan: `The user wants to get a business loan. Give them 5 clear, actionable steps they should take right now to prepare for a successful loan application. Include what documents to gather, how to strengthen their application, and what lenders look for. Be encouraging and practical. Use plain language, no jargon.`,
  credit: `The user wants to improve their business or personal credit. Give them 5 specific, actionable strategies to improve their credit score starting today. Include quick wins and long-term strategies. Mention common mistakes to avoid. Be encouraging and practical.`,
  grow: `The user wants to grow their business. Give them 5 strategic growth recommendations. Cover revenue growth, customer acquisition, operational efficiency, and funding options that could fuel growth. Be specific and actionable.`,
  exploring: `The user is just exploring their options. Give them a friendly overview of 5 key areas every business owner should evaluate: fundability, credit health, revenue optimization, growth planning, and available funding programs. Keep it light and inviting — encourage them to take the next step.`,
  fundability: `The user wants to check their fundability. Explain what a fundability score is, what factors affect it, and give them 5 things they can do right now to improve their chances of getting approved for funding. Be clear and motivating.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { goal, businessName } = await req.json();
    
    if (!goal || !goalPrompts[goal]) {
      return new Response(JSON.stringify({ error: "Invalid goal" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a friendly, expert business funding advisor at Credibility Suite. You give clear, actionable advice in a warm, professional tone. Keep responses concise — 5 bullet points max, each 1-2 sentences. Use simple language. Format each point with a bold title followed by a brief explanation. Do not use markdown headers. The user's business name is "${businessName || 'their business'}".`;

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
          { role: "user", content: goalPrompts[goal] },
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
