---
description: Show pipeline status and session info
---

## 🔍 Pipeline Status

**Session ID**: !`bash .claude/get-session-id.sh`

!`python3 -c "
import json
d = json.load(open('.claude/state/pipeline.json'))
p = d['phase']
if p == 0:
    print('⚪ No active phase')
else:
    icons = {'1':'🔍','2':'📝','3':'📋','4':'🔨','5':'🧹'}
    names = {'1':'Research','2':'Specification','3':'Planning','4':'Execution','5':'Cleanup'}
    print(f\"{icons[str(p)]} Phase {p}: {names[str(p)]}\")
    print(f\"   Loop {d['loops'][str(p)]} of {d['max_loops'][str(p)]}\")
    if d['loops'][str(p)] >= d['max_loops'][str(p)]:
        print('   ⚠️  MAX LOOPS REACHED - Consider next phase')
"`