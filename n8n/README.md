# Valley Daycare Growth Agent - n8n Setup

## Overview

This folder contains n8n workflow JSON files that integrate with your Valley Daycare Sites Next.js application.

## Workflows

| Workflow | Purpose |
|----------|---------|
| `email-handler.json` | Polls Hostinger IMAP, classifies leads, sends replies |
| `followup-handler.json` | Daily follow-up automation (Day 1, 3, 7) |

## Prerequisites

1. **n8n installed** (self-hosted or cloud)
2. **Hostinger email credentials** (contact@valleydaycaresites.com)
3. **OpenAI API key** (for AI classification)
4. **Your Next.js app running** (for database storage)

## Hostinger Email Settings

### IMAP (for receiving emails)
```
Server: imap.hostinger.com
Port: 993 (SSL)
Username: contact@valleydaycaresites.com
Password: [your email password]
```

### SMTP (for sending emails)
```
Server: smtp.hostinger.com
Port: 465 (SSL) or 587 (TLS)
Username: contact@valleydaycaresites.com
Password: [your email password]
```

## Setup Steps

### Step 1: Import Workflows

1. Open your n8n dashboard
2. Click **"Import from File"**
3. Import `email-handler.json`
4. Import `followup-handler.json`

### Step 2: Create Credentials

In n8n, go to **Credentials** and add:

1. **IMAP Credential** (for Hostinger)
   - Name: `Hostinger IMAP`
   - Host: `imap.hostinger.com`
   - Port: `993`
   - User: `contact@valleydaycaresites.com`
   - Password: `[your password]`
   - SSL: `true`

2. **SMTP Credential** (for Hostinger)
   - Name: `Hostinger SMTP`
   - Host: `smtp.hostinger.com`
   - Port: `465`
   - User: `contact@valleydaycaresites.com`
   - Password: `[your password]`
   - SSL: `true`

3. **OpenAI Credential**
   - Name: `OpenAI`
   - API Key: `[your OpenAI API key]`

### Step 3: Update Credential References

After importing, open each workflow and update the credential IDs:

1. Click on each node that uses credentials
2. Select the credential you created from the dropdown
3. Save the workflow

### Step 4: Set Environment Variable

In n8n settings, add:
```
SITE_URL=https://valleydaycaresites.com
```

Or for local development:
```
SITE_URL=http://localhost:3000
```

### Step 5: Activate Workflows

1. Open each workflow
2. Toggle the **Active** switch to ON
3. The email handler will poll every minute
4. The follow-up handler runs daily at 9 AM

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│ EMAIL HANDLER WORKFLOW                                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [IMAP Trigger]     [AI Node]        [HTTP POST]            │
│  Every minute  ──▶  Classify   ───▶  Store in DB            │
│                      & Reply                               │
│                          │                                  │
│                          ▼                                  │
│                   [If HOT/WARM]                             │
│                          │                                  │
│                          ▼                                  │
│                   [Send Reply]                              │
│                   via SMTP                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FOLLOW-UP WORKFLOW                                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Daily 9AM]  ───▶  [Check Due Follow-ups]  ───▶  [Send]    │
│                                                             │
│  Follow-up sequence: Day 1 → Day 3 → Day 7                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Testing

### Test Email Handler

1. Send a test email to `contact@valleydaycaresites.com`
2. Check n8n executions for the workflow run
3. Verify the lead appears in your database:

```bash
# Check leads API
curl http://localhost:3000/api/agent/leads
```

### Test Follow-up Handler

1. In n8n, open the follow-up workflow
2. Click **"Execute Workflow"** to run manually
3. Check the execution results

## Customization

### Adjust Polling Frequency

In the email handler, change the IMAP trigger:
- Every minute (current)
- Every 5 minutes: `"mode": "everyXMinutes", "minutes": 5`
- Every hour: `"mode": "everyHour"`

### Adjust AI Model

In the AI node, change the model:
- `gpt-4o-mini` (current, cheap)
- `gpt-4o` (better quality, more expensive)
- `gpt-3.5-turbo` (cheapest)

### Modify Auto-Reply Logic

In the "Should Auto-Reply?" node:
- Current: Auto-reply to HOT and WARM leads
- Change: Add conditions or remove to auto-reply to all

## Monitoring

Check workflow health in n8n:
- **Executions** tab shows all runs
- **Failed** executions indicate problems
- **Last execution** timestamp shows activity

## Troubleshooting

### Emails not being processed

1. Check IMAP credentials are correct
2. Verify the workflow is **Active**
3. Check n8n logs for errors

### Replies not sending

1. Check SMTP credentials
2. Verify email address in "from" field
3. Check Hostinger email limits

### Database not updating

1. Verify `SITE_URL` environment variable
2. Check Next.js app is running
3. Test API endpoint directly:
   ```bash
   curl -X POST http://localhost:3000/api/agent/email \
     -H "Content-Type: application/json" \
     -d '{"from":"test@example.com","subject":"Test","body":"Test"}'
   ```

## Files

```
n8n/
├── workflows/
│   ├── email-handler.json      # Main email processing
│   └── followup-handler.json   # Daily follow-ups
└── README.md                   # This file
```

## Next Steps

1. [ ] Import workflows to n8n
2. [ ] Create IMAP credential
3. [ ] Create SMTP credential
4. [ ] Create OpenAI credential
5. [ ] Set SITE_URL environment variable
6. [ ] Activate both workflows
7. [ ] Send test email to verify
