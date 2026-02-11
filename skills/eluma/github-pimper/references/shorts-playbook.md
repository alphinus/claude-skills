# YouTube Shorts Playbook for Repo Promotion

## Format Rules
- **Duration:** 30-60 seconds (sweet spot: 45s)
- **Aspect Ratio:** 9:16 (1080x1920)
- **Hook:** First 2 seconds must stop scrolling
- **CTA:** Last 5 seconds — "Star the repo, link in bio"

## Content Templates

### Template 1: "Build X in 60 Seconds"
```
[0-2s]  HOOK: "I built a [thing] that [does something cool]"
[2-10s] PROBLEM: Show the pain point (screen recording)
[10-35s] SOLUTION: Speed-run through the app/tool working
[35-50s] RESULT: Show the impressive output
[50-60s] CTA: "Link in bio. Star if useful."
```

### Template 2: "This Repo Has X Feature Nobody Knows"
```
[0-2s]  HOOK: "This repo does something nobody talks about"
[2-8s]  SETUP: Quick context on the repo
[8-40s] DEMO: Show the hidden/cool feature in action
[40-50s] WHY: Why this matters
[50-60s] CTA: "Star the repo for more"
```

### Template 3: "Before/After"
```
[0-2s]  HOOK: "Before vs After using [repo name]"
[2-15s] BEFORE: Show the ugly/manual/slow way
[15-17s] TRANSITION: Split screen or quick cut
[17-45s] AFTER: Show the beautiful/automated/fast result
[45-60s] CTA: "Link in bio, it's free"
```

### Template 4: "Code Walkthrough"
```
[0-2s]  HOOK: "3 lines of code that [do something amazing]"
[2-30s] WALKTHROUGH: Screen recording of typing/running code
[30-50s] RESULT: Show the output
[50-60s] CTA: "Full source on GitHub"
```

## Scroll-Stopping Hooks (first 2 seconds)
1. "I automated X and it took 3 lines of code"
2. "This repo replaced my entire X workflow"
3. "Nobody is talking about this GitHub tool"
4. "I built X so you don't have to"
5. "Stop doing X the hard way"
6. "This is the most underrated repo on GitHub"
7. "I open-sourced my X — here's how it works"
8. "You're doing X wrong. Here's the better way."
9. "Free tool that does what X charges $Y/month for"
10. "The repo that got me Z stars in one week"

## Remotion Scene Structure (scenes.json)

```json
{
  "fps": 30,
  "width": 1080,
  "height": 1920,
  "scenes": [
    {
      "id": "hook",
      "type": "text-reveal",
      "duration": 60,
      "text": "{{HOOK_TEXT}}",
      "style": "eluma-dark"
    },
    {
      "id": "demo",
      "type": "screen-recording",
      "duration": 900,
      "source": "{{SCREEN_RECORDING_PATH}}"
    },
    {
      "id": "result",
      "type": "screenshot-zoom",
      "duration": 300,
      "source": "{{SCREENSHOT_PATH}}"
    },
    {
      "id": "cta",
      "type": "cta-card",
      "duration": 150,
      "text": "Star the repo",
      "qr": "{{REPO_URL}}",
      "style": "eluma-gradient"
    }
  ]
}
```

## Hashtags
#coding #developer #programming #opensource #github #webdev #typescript #react #devtools #tech

## Posting Schedule
- **Best days:** Tuesday, Wednesday, Thursday
- **Best times:** 8-10am and 6-8pm (audience timezone)
- **Frequency:** 2-3 shorts per week per repo launch
- **Sequence:** Teaser → Full demo → Feature deep-dive → Behind the scenes
