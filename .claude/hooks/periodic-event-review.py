#!/usr/bin/env python3
"""
Periodic Event Review System
Automatically reviews events.md and provides summaries
"""
import json
import sys
import os
from datetime import datetime, timedelta
from pathlib import Path

def get_recent_events(events_file, hours=1):
    """Extract events from the last N hours"""
    if not os.path.exists(events_file):
        return []
    
    recent_events = []
    current_time = datetime.now()
    cutoff_time = current_time - timedelta(hours=hours)
    
    with open(events_file, 'r') as f:
        lines = f.readlines()
    
    current_date = None
    for line in lines:
        # Parse date headers
        if line.startswith('## '):
            date_str = line.strip('## \n')
            try:
                current_date = datetime.strptime(date_str, '%Y-%m-%d').date()
            except:
                continue
        
        # Parse time entries
        if line.startswith('### ') and current_date:
            time_str = line.split(' - ')[0].strip('### ')
            try:
                event_time = datetime.combine(current_date, 
                    datetime.strptime(time_str, '%H:%M:%S').time())
                if event_time > cutoff_time:
                    recent_events.append({
                        'time': event_time,
                        'description': line.split(' - ', 1)[1].strip() if ' - ' in line else ''
                    })
            except:
                continue
    
    return recent_events

def summarize_events(events):
    """Create a summary of recent events"""
    if not events:
        return "No recent events in the last hour"
    
    summary = {
        'total_events': len(events),
        'tools_used': set(),
        'files_modified': set(),
        'key_actions': []
    }
    
    for event in events:
        desc = event['description'].lower()
        
        # Track tool usage
        if 'tool' in desc:
            summary['tools_used'].add(desc.split()[0])
        
        # Track file modifications
        if any(word in desc for word in ['write', 'edit', 'create', 'update']):
            summary['files_modified'].add(desc)
        
        # Track key actions
        if any(word in desc for word in ['complete', 'fix', 'implement', 'deploy']):
            summary['key_actions'].append(event['description'])
    
    return summary

def generate_review_message(summary):
    """Generate a review message for Claude"""
    if isinstance(summary, str):
        return summary
    
    message = f"""
📊 EVENT STREAM REVIEW - Last Hour
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Events: {summary['total_events']}
Active Tools: {len(summary['tools_used'])}
Files Modified: {len(summary['files_modified'])}

"""
    
    if summary['key_actions']:
        message += "🎯 Key Actions:\n"
        for action in summary['key_actions'][:5]:
            message += f"  • {action}\n"
    
    message += """
💡 Recommendations:
1. Update events.md with any missing critical actions
2. Review completed tasks and update task lists
3. Ensure documentation reflects recent changes
"""
    
    return message

def main():
    # Read hook input
    try:
        input_data = json.load(sys.stdin)
    except:
        input_data = {}
    
    project_dir = os.environ.get('CLAUDE_PROJECT_DIR', os.getcwd())
    events_file = os.path.join(project_dir, 'events.md')
    
    # Check if this is a periodic review trigger
    hook_event = input_data.get('hook_event_name', '')
    
    # Get recent events
    recent_events = get_recent_events(events_file, hours=1)
    
    # Generate summary
    summary = summarize_events(recent_events)
    
    # Generate review message
    review_message = generate_review_message(summary)
    
    # Output for Claude to see
    print(review_message)
    
    # Save summary to a review file
    review_file = os.path.join(project_dir, '.claude', 'last-event-review.md')
    os.makedirs(os.path.dirname(review_file), exist_ok=True)
    
    with open(review_file, 'w') as f:
        f.write(f"# Event Review - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write(review_message)
    
    return 0

if __name__ == "__main__":
    sys.exit(main())