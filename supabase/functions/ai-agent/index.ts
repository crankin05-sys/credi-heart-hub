import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const agentPrompts: Record<string, string> = {
  financial: `You are the Financial Health Agent for a business consulting platform. Analyze the business data provided and give a concise financial health assessment. Include:
- Cash flow assessment based on revenue and capital needs
- Expense ratio analysis
- Revenue trend observations
- 2-3 specific actionable recommendations
Keep it under 300 words. Be direct and professional.`,

  fundability: `You are the Fundability Agent. Analyze the business data and provide a fundability assessment. Include:
- Current fundability score analysis and what it means
- Documentation gaps that are blocking loan approval
- A clear roadmap with 3-5 steps to improve their fundability score
Keep it under 300 words. Be specific about missing documents.`,

  capital: `You are the Capital Matching Agent. Based on the business profile, recommend the best funding sources. Include:
- Top 2-3 capital products this business qualifies for (SBA Microloan, Revolving Loan Fund, AR Financing, No-Doc Loans, etc.)
- Why each product fits their profile
- Estimated approval likelihood for each
Keep it under 300 words. Be specific about dollar amounts.`,

  execution: `You are the Execution Agent. Create a specific weekly action plan for this business. Include:
- 3-5 prioritized tasks for this week
- Each task should have a clear deliverable
- Timeline for each task
- How each task moves them closer to being fundable
Keep it under 300 words. Be actionable and specific.`,

  documentation: `You are the Documentation Agent. Review the business checklist and identify documentation gaps. Include:
- List all missing documents
- Priority order for gathering documents
- Templates or guidance for each missing document
- Estimated time to complete each
Keep it under 300 words. Be thorough.`,

  growth: `You are the Growth Strategy Agent. Analyze the business and provide revenue growth recommendations. Include:
- 2-3 revenue optimization strategies specific to their industry
- Customer acquisition recommendations
- How improved revenue impacts their fundability
Keep it under 300 words. Be industry-specific.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { agentType, businessId } = await req.json();

    if (!agentType || !agentPrompts[agentType]) {
      return new Response(JSON.stringify({ error: "Invalid agent type" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch the business data
    const { data: business, error: bizError } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", businessId)
      .eq("user_id", user.id)
      .single();

    if (bizError || !business) {
      return new Response(JSON.stringify({ error: "Business not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const checklist = business.checklist as Array<{ label: string; complete: boolean }>;
    const completed = checklist.filter((c) => c.complete).map((c) => c.label);
    const missing = checklist.filter((c) => !c.complete).map((c) => c.label);

    const businessContext = `
Business Name: ${business.name}
Industry: ${business.industry}
Fundability Score: ${business.score}/100
Status: ${business.status}
Capital Need: $${business.capital_need?.toLocaleString() || "0"}
Loan Product: ${business.loan_product || "Not yet matched"}
Top Gap: ${business.top_gap || "None"}
Completed Documents (${completed.length}/${checklist.length}): ${completed.join(", ") || "None"}
Missing Documents: ${missing.join(", ") || "None"}
Notes: ${business.notes || "None"}
`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: agentPrompts[agentType] },
          { role: "user", content: `Analyze this business:\n${businessContext}` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "No analysis available.";

    return new Response(JSON.stringify({ analysis: content, agentType, businessId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-agent error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
