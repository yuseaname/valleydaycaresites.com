#!/bin/bash
#
# run-outreach-queue.sh
#
# Sends cold emails from the queue, one every 10 minutes
# Run this in the background: nohup ./run-outreach-queue.sh &
#
# To stop: pkill -f run-outreach-queue.sh
#

set -e

cd "$(dirname "$0")"

LOG_FILE="outreach-queue.log"

echo "========================================" | tee -a "$LOG_FILE"
echo "Starting outreach queue at $(date)" | tee -a "$LOG_FILE"
echo "Emails will be sent every 10 minutes" | tee -a "$LOG_FILE"
echo "Press Ctrl+C to stop" | tee -a "$LOG_FILE"
echo "========================================" | tee -a "$LOG_FILE"

while true; do
    # Check how many pending emails remain
    PENDING=$(cat outreach-queue.json | jq '[.emails[] | select(.status == "pending")] | length' 2>/dev/null || echo "0")

    if [ "$PENDING" = "0" ]; then
        echo "[$(date)] All emails sent! Queue complete." | tee -a "$LOG_FILE"
        break
    fi

    echo "[$(date)] Sending next email ($PENDING remaining in queue)..." | tee -a "$LOG_FILE"

    # Send next email
    if ./send-next-email.sh 2>&1 | tee -a "$LOG_FILE"; then
        echo "[$(date)] Email sent successfully" | tee -a "$LOG_FILE"
    else
        echo "[$(date)] Failed to send email - will retry next iteration" | tee -a "$LOG_FILE"
    fi

    # Check again after sending
    PENDING=$(cat outreach-queue.json | jq '[.emails[] | select(.status == "pending")] | length' 2>/dev/null || echo "0")

    if [ "$PENDING" = "0" ]; then
        echo "[$(date)] All emails sent! Queue complete." | tee -a "$LOG_FILE"
        break
    fi

    echo "[$(date)] Waiting 10 minutes before next email..." | tee -a "$LOG_FILE"
    echo "" | tee -a "$LOG_FILE"

    sleep 600  # 10 minutes
done

echo "[$(date)] Outreach queue finished." | tee -a "$LOG_FILE"
