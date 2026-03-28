module.exports=[32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},63021,(e,t,r)=>{t.exports=e.x("@prisma/client-2c3a283f134fdcb6",()=>require("@prisma/client-2c3a283f134fdcb6"))},43793,e=>{"use strict";var t=e.i(63021);let r=globalThis.prisma??new t.PrismaClient({log:["query"]});e.s(["db",0,r])},83451,e=>{"use strict";let t={WEBSITE_DESIGN:{name:"Professional Website Design",description:"Custom daycare website design that converts visitors into enrollments"},HOSTING:{name:"Reliable Hosting",description:"Fast, secure hosting with 99.9% uptime guarantee"},SEO:{name:"Local SEO",description:"Get found by parents searching for daycare in your area"},SUPPORT:{name:"Ongoing Support",description:"Dedicated support to help you manage and grow your site"},SETUP:{name:"Full Setup",description:"We handle everything from domain to launch"}},r=["ready to start","want to get started","sign up","book","purchase","buy now","asap","immediately","this week","need a website now","ready to move forward","let's do it","when can you start","how soon","urgent"],a=["interested","tell me more","how does it work","pricing","cost","what's included","looking for","considering","thinking about","daycare","childcare center","preschool","learning center"],o=["just curious","browsing","not ready","maybe later","just looking","researching","competitor"],n=["daycare","childcare","preschool","nursery","learning center","early childhood","kids care","children","toddler","infant care","after school","child development","enrollment","parents"];function s(e){var s,i,l,u,d;let c,p,h=`${e.subject} ${e.body}`.toLowerCase(),y=n.some(e=>h.includes(e)),g=r.filter(e=>h.includes(e)).length,w=a.filter(e=>h.includes(e)).length,m=o.filter(e=>h.includes(e)).length;p=g>=2||g>=1&&w>=2?"HOT":w>=2||w>=1&&y?"WARM":"COLD",m>g&&m>w&&(p="COLD");let f="HOT"===p?"high":"WARM"===p?"medium":y?"low":"none",v="inquiry";h.includes("price")||h.includes("cost")||h.includes("pricing")?v="inquiry":"HOT"===p?v="purchase":h.includes("help")||h.includes("support")||h.includes("issue")?v="support":h.includes("just")&&h.includes("curious")&&(v="information");let b="no_rush";h.includes("asap")||h.includes("immediately")||h.includes("urgent")||h.includes("right away")?b="immediate":(h.includes("soon")||h.includes("this week")||h.includes("quickly"))&&(b="soon");let k=(e.body||"").split(/[.!?]+/).filter(e=>e.includes("?")).map(e=>e.trim()).slice(0,3),x=[];for(let e of Object.values(t).map(e=>e.name.toLowerCase()))(h.includes(e)||h.includes(e.split(" ")[0]))&&x.push(e);let R=(s=p,i=y,l=f,u=v,d=b,c=[],i?c.push("Identified as daycare owner"):c.push("Not clearly identified as daycare owner"),c.push(`Interest level: ${l}`),c.push(`Intent: ${u}`),"no_rush"!==d&&c.push(`Urgency: ${d}`),c.push(`Classified as ${s} lead`),c.join(". "));return{isDaycareOwner:y,interestLevel:f,intent:v,keyQuestions:k,mentionedServices:x,urgency:b,temperature:p,reasoning:R}}function i(e,t){var r,a,o,n,s,i;let{temperature:l,isDaycareOwner:u,intent:d,keyQuestions:c,urgency:p}=t,h="",y="",g=3,w=e.fromName?.split(" ")[0]||"there";switch(l){case"HOT":let m;r=w,a=d,m="immediate"===p?"I completely understand you need this quickly.":"",h="purchase"===a?`Hi ${r},

${m}

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
contact@valleydaycaresites.com`:`Hi ${r},

${m}

Thanks for reaching out! I can definitely help you get your daycare online.

The quickest way to get started is a quick 15-minute call where I can:
- Learn about your daycare
- Show you what we can build for you
- Get you set up right away

Want me to set this up for you? Just let me know what works best.

Best,
Valley Daycare Sites
contact@valleydaycaresites.com`,y="Schedule call or send proposal",g=1;break;case"WARM":let f;o=w,n=d,f="",(s=c).length>0&&(f=`

Great questions! Let me address them:

I'd be happy to go over all the details. The best way is usually a quick call where I can answer everything and show you examples.
`),h="inquiry"===n||s.length>0?`Hi ${o},

Thanks for your interest in Valley Daycare Sites!
${f}
We help daycare owners get professional websites that bring in new enrollments. Everything is handled for you - design, setup, hosting, and support.

Our most popular package starts at a simple monthly rate with no long-term commitment.

Would you like me to send you more details, or would a quick call work better to answer your questions?

Best,
Valley Daycare Sites
contact@valleydaycaresites.com`:`Hi ${o},

Thanks for reaching out! I'd be happy to help you learn more about getting a website for your daycare.

We take care of everything - design, setup, and ongoing support - so you can focus on what you do best.

What would be most helpful? I can:
- Send you pricing and package details
- Show you examples of sites we've built
- Schedule a quick call to discuss your needs

Just let me know what works for you!

Best,
Valley Daycare Sites
contact@valleydaycaresites.com`,y="Answer questions and nurture toward purchase",g=3;break;case"COLD":i=w,h=u?`Hi ${i},

Thanks for reaching out!

When you're ready to get your daycare online (or improve your current site), we're here to help. We handle everything so you can focus on the kids.

In the meantime, feel free to check out our website at valleydaycaresites.com for pricing and examples.

No pressure - just let us know when you're ready!

Best,
Valley Daycare Sites
contact@valleydaycaresites.com`:`Hi ${i},

Thanks for your message! I'm not sure if you're looking for a daycare website, but I'm happy to help if you have any questions about our services.

If you're a daycare owner looking to improve your online presence, we'd love to chat. We handle everything from design to hosting to ongoing support.

Feel free to reach out anytime if we can help!

Best,
Valley Daycare Sites
contact@valleydaycaresites.com`,y="Provide value and stay top of mind",g=7}return{reply:h,temperature:l,nextStep:y,shouldFollowUp:!0,followUpDays:g}}function l(e,t,r){let a=e.split(" ")[0]||"there";switch(t){case 1:return`Hi ${a},

Just wanted to follow up on my previous message.

I know running a daycare keeps you busy, so no pressure at all. But if you're still thinking about getting a website (or improving your current one), I'm here to help.

Let me know if you have any questions!

Best,
Valley Daycare Sites`;case 3:return`Hi ${a},

I wanted to share a quick thought: most parents search online when looking for daycare. Having a professional website can make a big difference in attracting new families.

We handle everything for you - design, setup, hosting, and support - so you don't have to worry about the technical stuff.

If you're curious about what we could build for your daycare, just reply to this email. Happy to chat!

Best,
Valley Daycare Sites`;case 7:return`Hi ${a},

I'll keep this brief - I know you're busy!

If you're still considering a website for your daycare, I'm here whenever you're ready. No rush, no pressure.

Just reply to this email or give me a shout when the time is right.

Wishing you all the best with your daycare!

Best,
Valley Daycare Sites`;default:return`Hi ${a},

Just checking in. Let me know if there's anything I can help with!

Best,
Valley Daycare Sites`}}e.s(["analyzeEmail",()=>s,"generateFollowUp",()=>l,"generateResponse",()=>i],83451)},67065,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),o=e.i(59756),n=e.i(61916),s=e.i(74677),i=e.i(69741),l=e.i(16795),u=e.i(87718),d=e.i(95169),c=e.i(47587),p=e.i(66012),h=e.i(70101),y=e.i(26937),g=e.i(10372),w=e.i(93695);e.i(52474);var m=e.i(220),f=e.i(89171),v=e.i(43793),b=e.i(83451);async function k(e){try{let{searchParams:t}=new URL(e.url),r=t.get("status")||"SCHEDULED",a="true"===t.get("due"),o={status:r};a&&(o.scheduledAt={lte:new Date});let n=await v.db.followUp.findMany({where:o,include:{lead:!0},orderBy:{scheduledAt:"asc"}});return f.NextResponse.json({success:!0,count:n.length,followUps:n})}catch(e){return console.error("Error fetching follow-ups:",e),f.NextResponse.json({error:"Internal server error"},{status:500})}}async function x(e){try{let t=await e.json(),r=await v.db.followUp.create({data:{leadId:t.leadId,scheduledAt:new Date(t.scheduledAt),sequenceDay:t.sequenceDay||1,message:t.message},include:{lead:!0}});return f.NextResponse.json({success:!0,followUp:r})}catch(e){return console.error("Error creating follow-up:",e),f.NextResponse.json({error:"Internal server error"},{status:500})}}async function R(e){try{let e=await v.db.followUp.findMany({where:{status:"SCHEDULED",scheduledAt:{lte:new Date}},include:{lead:{include:{conversations:{include:{messages:{orderBy:{sentAt:"desc"},take:5}}}}}}}),t=[];for(let r of e)try{let e=r.lead.conversations[0]?.messages.find(e=>"inbound"===e.direction);if(e&&(Date.now()-e.sentAt.getTime())/864e5<1){await v.db.followUp.update({where:{id:r.id},data:{status:"SKIPPED"}}),t.push({followUpId:r.id,leadEmail:r.lead.email,status:"skipped",message:"Lead responded recently"});continue}let a=r.lead.conversations[0]?.messages.filter(e=>"outbound"===e.direction).map(e=>e.content)||[],o=(0,b.generateFollowUp)(r.lead.name||r.lead.email,r.sequenceDay,a);await v.db.followUp.update({where:{id:r.id},data:{message:o,status:"SENT",sentAt:new Date}}),t.push({followUpId:r.id,leadEmail:r.lead.email,status:"processed",message:o})}catch(e){t.push({followUpId:r.id,leadEmail:r.lead.email,status:"error",message:e instanceof Error?e.message:"Unknown error"})}return f.NextResponse.json({success:!0,processed:t.length,results:t})}catch(e){return console.error("Error processing follow-ups:",e),f.NextResponse.json({error:"Internal server error"},{status:500})}}e.s(["GET",()=>k,"POST",()=>x,"PUT",()=>R],40535);var E=e.i(40535);let I=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/agent/followups/route",pathname:"/api/agent/followups",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/agent/followups/route.ts",nextConfigOutput:"standalone",userland:E}),{workAsyncStorage:S,workUnitAsyncStorage:C,serverHooks:T}=I;function q(){return(0,a.patchFetch)({workAsyncStorage:S,workUnitAsyncStorage:C})}async function D(e,t,a){I.isDev&&(0,o.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let f="/api/agent/followups/route";f=f.replace(/\/index$/,"")||"/";let v=await I.prepare(e,t,{srcPage:f,multiZoneDraftMode:!1});if(!v)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:b,params:k,nextConfig:x,parsedUrl:R,isDraftMode:E,prerenderManifest:S,routerServerContext:C,isOnDemandRevalidate:T,revalidateOnlyGenerated:q,resolvedPathname:D,clientReferenceManifest:A,serverActionsManifest:H}=v,N=(0,i.normalizeAppPath)(f),O=!!(S.dynamicRoutes[N]||S.routes[D]),U=async()=>((null==C?void 0:C.render404)?await C.render404(e,t,R,!1):t.end("This page could not be found"),null);if(O&&!E){let e=!!S.routes[D],t=S.dynamicRoutes[N];if(t&&!1===t.fallback&&!e){if(x.experimental.adapterPath)return await U();throw new w.NoFallbackError}}let P=null;!O||I.isDev||E||(P="/index"===(P=D)?"/":P);let j=!0===I.isDev||!O,$=O&&!j;H&&A&&(0,s.setManifestsSingleton)({page:f,clientReferenceManifest:A,serverActionsManifest:H});let _=e.method||"GET",L=(0,n.getTracer)(),B=L.getActiveScopeSpan(),W={params:k,prerenderManifest:S,renderOpts:{experimental:{authInterrupts:!!x.experimental.authInterrupts},cacheComponents:!!x.cacheComponents,supportsDynamicResponse:j,incrementalCache:(0,o.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:x.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,o)=>I.onRequestError(e,t,a,o,C)},sharedContext:{buildId:b}},M=new l.NodeNextRequest(e),F=new l.NodeNextResponse(t),V=u.NextRequestAdapter.fromNodeNextRequest(M,(0,u.signalFromNodeResponse)(t));try{let s=async e=>I.handle(V,W).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=L.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==d.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${_} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${_} ${f}`)}),i=!!(0,o.getRequestMeta)(e,"minimalMode"),l=async o=>{var n,l;let u=async({previousCacheEntry:r})=>{try{if(!i&&T&&q&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await s(o);e.fetchMetrics=W.renderOpts.fetchMetrics;let l=W.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let u=W.renderOpts.collectedTags;if(!O)return await (0,p.sendResponse)(M,F,n,W.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,h.toNodeOutgoingHttpHeaders)(n.headers);u&&(t[g.NEXT_CACHE_TAGS_HEADER]=u),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==W.renderOpts.collectedRevalidate&&!(W.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&W.renderOpts.collectedRevalidate,a=void 0===W.renderOpts.collectedExpire||W.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:W.renderOpts.collectedExpire;return{value:{kind:m.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await I.onRequestError(e,t,{routerKind:"App Router",routePath:f,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:$,isOnDemandRevalidate:T})},!1,C),t}},d=await I.handleResponse({req:e,nextConfig:x,cacheKey:P,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:S,isRoutePPREnabled:!1,isOnDemandRevalidate:T,revalidateOnlyGenerated:q,responseGenerator:u,waitUntil:a.waitUntil,isMinimalMode:i});if(!O)return null;if((null==d||null==(n=d.value)?void 0:n.kind)!==m.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(l=d.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});i||t.setHeader("x-nextjs-cache",T?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),E&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let w=(0,h.fromNodeOutgoingHttpHeaders)(d.value.headers);return i&&O||w.delete(g.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||w.get("Cache-Control")||w.set("Cache-Control",(0,y.getCacheControlHeader)(d.cacheControl)),await (0,p.sendResponse)(M,F,new Response(d.value.body,{headers:w,status:d.value.status||200})),null};B?await l(B):await L.withPropagatedContext(e.headers,()=>L.trace(d.BaseServerSpan.handleRequest,{spanName:`${_} ${f}`,kind:n.SpanKind.SERVER,attributes:{"http.method":_,"http.target":e.url}},l))}catch(t){if(t instanceof w.NoFallbackError||await I.onRequestError(e,t,{routerKind:"App Router",routePath:N,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:$,isOnDemandRevalidate:T})},!1,C),O)throw t;return await (0,p.sendResponse)(M,F,new Response(null,{status:500})),null}}e.s(["handler",()=>D,"patchFetch",()=>q,"routeModule",()=>I,"serverHooks",()=>T,"workAsyncStorage",()=>S,"workUnitAsyncStorage",()=>C],67065)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1f998749._.js.map