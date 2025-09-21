#!/bin/bash
# Rotate Events Hook - Keep events.md manageable

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
EVENTS_FILE="$PROJECT_DIR/event-stream.md"

echo "🔄 Rotating events log..."

if [ ! -f "$EVENTS_FILE" ]; then
  echo "   No event-stream.md to rotate"
  exit 0
fi

# Count lines in event-stream.md
LINES=$(wc -l < "$EVENTS_FILE")
echo "   Current event-stream.md: $LINES lines"

# If over 1000 lines, archive old events
if [ $LINES -gt 1000 ]; then
  echo "   Archiving old events..."

  # Create archive directory
  mkdir -p "$PROJECT_DIR/.archive/events"

  # Archive with timestamp
  TIMESTAMP=$(date +%Y%m%d-%H%M%S)
  cp "$EVENTS_FILE" "$PROJECT_DIR/.archive/events/event-stream-$TIMESTAMP.md"

  # Keep header and last 500 lines
  head -10 "$EVENTS_FILE" > "$PROJECT_DIR/events.tmp"
  echo "" >> "$PROJECT_DIR/events.tmp"
  echo "---" >> "$PROJECT_DIR/events.tmp"
  echo "*Previous events archived to .archive/events/event-stream-$TIMESTAMP.md*" >> "$PROJECT_DIR/events.tmp"
  echo "" >> "$PROJECT_DIR/events.tmp"
  tail -500 "$EVENTS_FILE" >> "$PROJECT_DIR/events.tmp"
  mv "$PROJECT_DIR/events.tmp" "$EVENTS_FILE"
  
  echo "✅ Archived to .archive/events/event-stream-$TIMESTAMP.md"
  echo "✅ Kept header and last 500 lines in event-stream.md"
else
  echo "✅ No rotation needed ($LINES lines < 1000)"
fi