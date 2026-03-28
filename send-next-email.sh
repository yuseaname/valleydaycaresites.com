#!/bin/bash
#
# send-next-email.sh
#
# Sends the next pending email from outreach-queue.json
# Run this every 10 minutes via cron or manually
#
# Usage: ./send-next-email.sh
#

set -e

cd "$(dirname "$0")"

QUEUE_FILE="outreach-queue.json"
ENV_FILE=".env"

# Check if queue file exists
if [ ! -f "$QUEUE_FILE" ]; then
    echo "ERROR: Queue file not found: $QUEUE_FILE"
    exit 1
fi

# Load environment variables
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

# Check for API key
if [ -z "$EMAILIT_API_KEY" ]; then
    echo "ERROR: EMAILIT_API_KEY not set"
    exit 1
fi

# Find next pending email using jq
NEXT_EMAIL=$(cat "$QUEUE_FILE" | jq -r '.emails[] | select(.status == "pending") | @base64' | head -1)

if [ -z "$NEXT_EMAIL" ]; then
    echo "No pending emails in queue"
    exit 0
fi

# Decode the email data
EMAIL_DATA=$(echo "$NEXT_EMAIL" | base64 -d)
EMAIL_ID=$(echo "$EMAIL_DATA" | jq -r '.id')
EMAIL_TO=$(echo "$EMAIL_DATA" | jq -r '.to')
EMAIL_SUBJECT=$(echo "$EMAIL_DATA" | jq -r '.subject')
EMAIL_BODY=$(echo "$EMAIL_DATA" | jq -r '.body')
DAYCARE_NAME=$(echo "$EMAIL_DATA" | jq -r '.daycare')

echo "Sending email #$EMAIL_ID to $DAYCARE_NAME ($EMAIL_TO)..."

# Send email via Emailit API
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://api.emailit.com/v1/emails" \
    -H "Authorization: Bearer $EMAILIT_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
        \"from\": \"contact@valleydaycaresites.com\",
        \"to\": [\"$EMAIL_TO\"],
        \"subject\": \"$EMAIL_SUBJECT\",
        \"text\": $(echo "$EMAIL_BODY" | jq -Rs .),
        \"tags\": [\"outreach\", \"cold-email\"]
    }")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
    echo "SUCCESS: Email sent to $EMAIL_TO"

    # Update queue - mark as sent
    cat "$QUEUE_FILE" | jq --argjson id "$EMAIL_ID" --arg time "$(date -Iseconds)" '
        .emails = [.emails[] | if .id == $id then .status = "sent" | .sentAt = $time else . end]
    ' > "${QUEUE_FILE}.tmp" && mv "${QUEUE_FILE}.tmp" "$QUEUE_FILE"

    echo "Queue updated. Email #$EMAIL_ID marked as sent."
else
    echo "ERROR: Failed to send email (HTTP $HTTP_CODE)"
    echo "Response: $BODY"

    # Update queue - mark as failed
    cat "$QUEUE_FILE" | jq --argjson id "$EMAIL_ID" --arg time "$(date -Iseconds)" --arg error "$BODY" '
        .emails = [.emails[] | if .id == $id then .status = "failed" | .sentAt = $time | .error = $error else . end]
    ' > "${QUEUE_FILE}.tmp" && mv "${QUEUE_FILE}.tmp" "$QUEUE_FILE"

    exit 1
fi

# Show remaining count
PENDING=$(cat "$QUEUE_FILE" | jq '[.emails[] | select(.status == "pending")] | length')
SENT=$(cat "$QUEUE_FILE" | jq '[.emails[] | select(.status == "sent")] | length')
echo ""
echo "Queue status: $SENT sent, $PENDING pending"
