module.exports=[32319,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},18622,(e,t,a)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},70406,(e,t,a)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,a)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},63021,(e,t,a)=>{t.exports=e.x("@prisma/client-2c3a283f134fdcb6",()=>require("@prisma/client-2c3a283f134fdcb6"))},43793,e=>{"use strict";var t=e.i(63021);let a=globalThis.prisma??new t.PrismaClient({log:["query"]});e.s(["db",0,a])},83451,e=>{"use strict";let t={WEBSITE_DESIGN:{name:"Professional Website Design",description:"Custom daycare website design that converts visitors into enrollments"},HOSTING:{name:"Reliable Hosting",description:"Fast, secure hosting with 99.9% uptime guarantee"},SEO:{name:"Local SEO",description:"Get found by parents searching for daycare in your area"},SUPPORT:{name:"Ongoing Support",description:"Dedicated support to help you manage and grow your site"},SETUP:{name:"Full Setup",description:"We handle everything from domain to launch"}},a=["ready to start","want to get started","sign up","book","purchase","buy now","asap","immediately","this week","need a website now","ready to move forward","let's do it","when can you start","how soon","urgent"],r=["interested","tell me more","how does it work","pricing","cost","what's included","looking for","considering","thinking about","daycare","childcare center","preschool","learning center"],n=["just curious","browsing","not ready","maybe later","just looking","researching","competitor"],o=["daycare","childcare","preschool","nursery","learning center","early childhood","kids care","children","toddler","infant care","after school","child development","enrollment","parents"];function s(e){var s,i,l,u,d;let c,p,y=`${e.subject} ${e.body}`.toLowerCase(),h=o.some(e=>y.includes(e)),m=a.filter(e=>y.includes(e)).length,g=r.filter(e=>y.includes(e)).length,w=n.filter(e=>y.includes(e)).length;p=m>=2||m>=1&&g>=2?"HOT":g>=2||g>=1&&h?"WARM":"COLD",w>m&&w>g&&(p="COLD");let f="HOT"===p?"high":"WARM"===p?"medium":h?"low":"none",v="inquiry";y.includes("price")||y.includes("cost")||y.includes("pricing")?v="inquiry":"HOT"===p?v="purchase":y.includes("help")||y.includes("support")||y.includes("issue")?v="support":y.includes("just")&&y.includes("curious")&&(v="information");let b="no_rush";y.includes("asap")||y.includes("immediately")||y.includes("urgent")||y.includes("right away")?b="immediate":(y.includes("soon")||y.includes("this week")||y.includes("quickly"))&&(b="soon");let x=(e.body||"").split(/[.!?]+/).filter(e=>e.includes("?")).map(e=>e.trim()).slice(0,3),R=[];for(let e of Object.values(t).map(e=>e.name.toLowerCase()))(y.includes(e)||y.includes(e.split(" ")[0]))&&R.push(e);let k=(s=p,i=h,l=f,u=v,d=b,c=[],i?c.push("Identified as daycare owner"):c.push("Not clearly identified as daycare owner"),c.push(`Interest level: ${l}`),c.push(`Intent: ${u}`),"no_rush"!==d&&c.push(`Urgency: ${d}`),c.push(`Classified as ${s} lead`),c.join(". "));return{isDaycareOwner:h,interestLevel:f,intent:v,keyQuestions:x,mentionedServices:R,urgency:b,temperature:p,reasoning:k}}function i(e,t){var a,r,n,o,s,i;let{temperature:l,isDaycareOwner:u,intent:d,keyQuestions:c,urgency:p}=t,y="",h="",m=3,g=e.fromName?.split(" ")[0]||"there";switch(l){case"HOT":let w;a=g,r=d,w="immediate"===p?"I completely understand you need this quickly.":"",y="purchase"===r?`Hi ${a},

${w}

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
contact@valleydaycaresites.com`:`Hi ${a},

${w}

Thanks for reaching out! I can definitely help you get your daycare online.

The quickest way to get started is a quick 15-minute call where I can:
- Learn about your daycare
- Show you what we can build for you
- Get you set up right away

Want me to set this up for you? Just let me know what works best.

Best,
Valley Daycare Sites
contact@valleydaycaresites.com`,h="Schedule call or send proposal",m=1;break;case"WARM":let f;n=g,o=d,f="",(s=c).length>0&&(f=`

Great questions! Let me address them:

I'd be happy to go over all the details. The best way is usually a quick call where I can answer everything and show you examples.
`),y="inquiry"===o||s.length>0?`Hi ${n},

Thanks for your interest in Valley Daycare Sites!
${f}
We help daycare owners get professional websites that bring in new enrollments. Everything is handled for you - design, setup, hosting, and support.

Our most popular package starts at a simple monthly rate with no long-term commitment.

Would you like me to send you more details, or would a quick call work better to answer your questions?

Best,
Valley Daycare Sites
contact@valleydaycaresites.com`:`Hi ${n},

Thanks for reaching out! I'd be happy to help you learn more about getting a website for your daycare.

We take care of everything - design, setup, and ongoing support - so you can focus on what you do best.

What would be most helpful? I can:
- Send you pricing and package details
- Show you examples of sites we've built
- Schedule a quick call to discuss your needs

Just let me know what works for you!

Best,
Valley Daycare Sites
contact@valleydaycaresites.com`,h="Answer questions and nurture toward purchase",m=3;break;case"COLD":i=g,y=u?`Hi ${i},

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
contact@valleydaycaresites.com`,h="Provide value and stay top of mind",m=7}return{reply:y,temperature:l,nextStep:h,shouldFollowUp:!0,followUpDays:m}}function l(e,t,a){let r=e.split(" ")[0]||"there";switch(t){case 1:return`Hi ${r},

Just wanted to follow up on my previous message.

I know running a daycare keeps you busy, so no pressure at all. But if you're still thinking about getting a website (or improving your current one), I'm here to help.

Let me know if you have any questions!

Best,
Valley Daycare Sites`;case 3:return`Hi ${r},

I wanted to share a quick thought: most parents search online when looking for daycare. Having a professional website can make a big difference in attracting new families.

We handle everything for you - design, setup, hosting, and support - so you don't have to worry about the technical stuff.

If you're curious about what we could build for your daycare, just reply to this email. Happy to chat!

Best,
Valley Daycare Sites`;case 7:return`Hi ${r},

I'll keep this brief - I know you're busy!

If you're still considering a website for your daycare, I'm here whenever you're ready. No rush, no pressure.

Just reply to this email or give me a shout when the time is right.

Wishing you all the best with your daycare!

Best,
Valley Daycare Sites`;default:return`Hi ${r},

Just checking in. Let me know if there's anything I can help with!

Best,
Valley Daycare Sites`}}e.s(["analyzeEmail",()=>s,"generateFollowUp",()=>l,"generateResponse",()=>i],83451)},65148,e=>{"use strict";var t=e.i(47909),a=e.i(74017),r=e.i(96250),n=e.i(59756),o=e.i(61916),s=e.i(74677),i=e.i(69741),l=e.i(16795),u=e.i(87718),d=e.i(95169),c=e.i(47587),p=e.i(66012),y=e.i(70101),h=e.i(26937),m=e.i(10372),g=e.i(93695);e.i(52474);var w=e.i(220),f=e.i(89171),v=e.i(43793),b=e.i(83451);async function x(e){try{let t=await e.json(),a={from:t.from||t.From||t.sender,fromName:t.fromName||t.FromName||t.sender_name,to:t.to||t.To||t.recipient,subject:t.subject||t.Subject||"",body:t.body||t.Body||t.text||t.TextBody||"",receivedAt:new Date(t.receivedAt||t.Date||Date.now()),messageId:t.messageId||t.MessageID,inReplyTo:t.inReplyTo||t.InReplyTo};if(!a.from||!a.to)return f.NextResponse.json({error:"Missing required fields: from, to"},{status:400});let r=await v.db.lead.findUnique({where:{email:a.from}});if(!r){let e=(0,b.analyzeEmail)(a);r=await v.db.lead.create({data:{email:a.from,name:a.fromName,temperature:e.temperature,status:"NEW",notes:e.reasoning,source:"email"}})}let n=await v.db.conversation.findFirst({where:{leadId:r.id},orderBy:{createdAt:"desc"}});n||(n=await v.db.conversation.create({data:{leadId:r.id,subject:a.subject}}));let o=await v.db.message.create({data:{conversationId:n.id,direction:"inbound",content:a.body,fromEmail:a.from,toEmail:a.to,subject:a.subject}}),s=(0,b.analyzeEmail)(a),i=(0,b.generateResponse)(a,s);if(await v.db.message.update({where:{id:o.id},data:{classification:s.reasoning,suggestedReply:i.reply}}),r.temperature!==i.temperature&&await v.db.lead.update({where:{id:r.id},data:{temperature:i.temperature,status:"IN_PROGRESS",updatedAt:new Date}}),i.shouldFollowUp&&i.followUpDays){let e=new Date;e.setDate(e.getDate()+i.followUpDays),await v.db.followUp.create({data:{leadId:r.id,scheduledAt:e,sequenceDay:i.followUpDays,message:void 0}})}return f.NextResponse.json({success:!0,leadId:r.id,conversationId:n.id,messageId:o.id,analysis:{temperature:i.temperature,nextStep:i.nextStep},suggestedReply:i.reply})}catch(e){return console.error("Error processing email:",e),f.NextResponse.json({error:"Internal server error"},{status:500})}}async function R(e){try{let{searchParams:t}=new URL(e.url),a=parseInt(t.get("limit")||"20"),r=await v.db.message.findMany({where:{direction:"inbound",suggestedReply:{not:null},sentAt:{gte:new Date(Date.now()-6048e5)}},include:{conversation:{include:{lead:!0}}},orderBy:{sentAt:"desc"},take:a});return f.NextResponse.json({success:!0,count:r.length,messages:r})}catch(e){return console.error("Error fetching pending emails:",e),f.NextResponse.json({error:"Internal server error"},{status:500})}}e.s(["GET",()=>R,"POST",()=>x],6925);var k=e.i(6925);let E=new t.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/agent/email/route",pathname:"/api/agent/email",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/agent/email/route.ts",nextConfigOutput:"standalone",userland:k}),{workAsyncStorage:I,workUnitAsyncStorage:S,serverHooks:T}=E;function C(){return(0,r.patchFetch)({workAsyncStorage:I,workUnitAsyncStorage:S})}async function D(e,t,r){E.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let f="/api/agent/email/route";f=f.replace(/\/index$/,"")||"/";let v=await E.prepare(e,t,{srcPage:f,multiZoneDraftMode:!1});if(!v)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:b,params:x,nextConfig:R,parsedUrl:k,isDraftMode:I,prerenderManifest:S,routerServerContext:T,isOnDemandRevalidate:C,revalidateOnlyGenerated:D,resolvedPathname:q,clientReferenceManifest:N,serverActionsManifest:A}=v,j=(0,i.normalizeAppPath)(f),H=!!(S.dynamicRoutes[j]||S.routes[q]),O=async()=>((null==T?void 0:T.render404)?await T.render404(e,t,k,!1):t.end("This page could not be found"),null);if(H&&!I){let e=!!S.routes[q],t=S.dynamicRoutes[j];if(t&&!1===t.fallback&&!e){if(R.experimental.adapterPath)return await O();throw new g.NoFallbackError}}let P=null;!H||E.isDev||I||(P="/index"===(P=q)?"/":P);let U=!0===E.isDev||!H,$=H&&!U;A&&N&&(0,s.setManifestsSingleton)({page:f,clientReferenceManifest:N,serverActionsManifest:A});let _=e.method||"GET",B=(0,o.getTracer)(),W=B.getActiveScopeSpan(),M={params:x,prerenderManifest:S,renderOpts:{experimental:{authInterrupts:!!R.experimental.authInterrupts},cacheComponents:!!R.cacheComponents,supportsDynamicResponse:U,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:R.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,r,n)=>E.onRequestError(e,t,r,n,T)},sharedContext:{buildId:b}},F=new l.NodeNextRequest(e),L=new l.NodeNextResponse(t),V=u.NextRequestAdapter.fromNodeNextRequest(F,(0,u.signalFromNodeResponse)(t));try{let s=async e=>E.handle(V,M).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let a=B.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==d.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=a.get("next.route");if(r){let t=`${_} ${r}`;e.setAttributes({"next.route":r,"http.route":r,"next.span_name":t}),e.updateName(t)}else e.updateName(`${_} ${f}`)}),i=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var o,l;let u=async({previousCacheEntry:a})=>{try{if(!i&&C&&D&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let o=await s(n);e.fetchMetrics=M.renderOpts.fetchMetrics;let l=M.renderOpts.pendingWaitUntil;l&&r.waitUntil&&(r.waitUntil(l),l=void 0);let u=M.renderOpts.collectedTags;if(!H)return await (0,p.sendResponse)(F,L,o,M.renderOpts.pendingWaitUntil),null;{let e=await o.blob(),t=(0,y.toNodeOutgoingHttpHeaders)(o.headers);u&&(t[m.NEXT_CACHE_TAGS_HEADER]=u),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==M.renderOpts.collectedRevalidate&&!(M.renderOpts.collectedRevalidate>=m.INFINITE_CACHE)&&M.renderOpts.collectedRevalidate,r=void 0===M.renderOpts.collectedExpire||M.renderOpts.collectedExpire>=m.INFINITE_CACHE?void 0:M.renderOpts.collectedExpire;return{value:{kind:w.CachedRouteKind.APP_ROUTE,status:o.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:r}}}}catch(t){throw(null==a?void 0:a.isStale)&&await E.onRequestError(e,t,{routerKind:"App Router",routePath:f,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:$,isOnDemandRevalidate:C})},!1,T),t}},d=await E.handleResponse({req:e,nextConfig:R,cacheKey:P,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:S,isRoutePPREnabled:!1,isOnDemandRevalidate:C,revalidateOnlyGenerated:D,responseGenerator:u,waitUntil:r.waitUntil,isMinimalMode:i});if(!H)return null;if((null==d||null==(o=d.value)?void 0:o.kind)!==w.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(l=d.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});i||t.setHeader("x-nextjs-cache",C?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),I&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let g=(0,y.fromNodeOutgoingHttpHeaders)(d.value.headers);return i&&H||g.delete(m.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||g.get("Cache-Control")||g.set("Cache-Control",(0,h.getCacheControlHeader)(d.cacheControl)),await (0,p.sendResponse)(F,L,new Response(d.value.body,{headers:g,status:d.value.status||200})),null};W?await l(W):await B.withPropagatedContext(e.headers,()=>B.trace(d.BaseServerSpan.handleRequest,{spanName:`${_} ${f}`,kind:o.SpanKind.SERVER,attributes:{"http.method":_,"http.target":e.url}},l))}catch(t){if(t instanceof g.NoFallbackError||await E.onRequestError(e,t,{routerKind:"App Router",routePath:j,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:$,isOnDemandRevalidate:C})},!1,T),H)throw t;return await (0,p.sendResponse)(F,L,new Response(null,{status:500})),null}}e.s(["handler",()=>D,"patchFetch",()=>C,"routeModule",()=>E,"serverHooks",()=>T,"workAsyncStorage",()=>I,"workUnitAsyncStorage",()=>S],65148)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1e8895eb._.js.map