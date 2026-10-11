#!/usr/bin/env python3
"""Flag GitHub repositories in the README that are archived, missing, or inactive.

Usage:
    GITHUB_TOKEN=... python3 scripts/check_stale.py [--days 365] [--output report.md]

Exit code is 1 when at least one repository is flagged, so CI can react.
Papers, books, and articles are not checked here; lychee handles dead links.
"""
import argparse
import datetime as dt
import json
import os
import re
import sys
import urllib.error
import urllib.request

REPO_RE = re.compile(r"\]\(https://github\.com/([A-Za-z0-9_.-]+)/([A-Za-z0-9_.-]+)/?\)")


def fetch(owner, repo, token):
    req = urllib.request.Request(
        f"https://api.github.com/repos/{owner}/{repo}",
        headers={"Accept": "application/vnd.github+json", "User-Agent": "awesome-finance-agents"},
    )
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as err:
        return {"_error": err.code}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--readme", default="README.md")
    parser.add_argument("--days", type=int, default=365)
    parser.add_argument("--output", default="")
    parser.add_argument("--allowlist", default="scripts/stale-allowlist.txt",
                        help="Repositories (owner/name per line) whose content is evergreen, so inactivity is fine.")
    args = parser.parse_args()

    token = os.environ.get("GITHUB_TOKEN", "")
    text = open(args.readme, encoding="utf-8").read()
    repos = sorted(set(REPO_RE.findall(text)))
    allow = set()
    if os.path.exists(args.allowlist):
        allow = {l.strip().lower() for l in open(args.allowlist, encoding="utf-8") if l.strip() and not l.startswith("#")}
    cutoff = dt.datetime.now(dt.timezone.utc) - dt.timedelta(days=args.days)

    flagged = []
    for owner, repo in repos:
        data = fetch(owner, repo, token)
        name = f"{owner}/{repo}"
        if "_error" in data:
            flagged.append(f"- [{name}](https://github.com/{name}) - HTTP {data['_error']} (missing or private).")
            continue
        if data.get("full_name", name).lower() != name.lower():
            flagged.append(f"- [{name}](https://github.com/{name}) - Renamed to `{data['full_name']}`; update the link.")
        if data.get("archived"):
            flagged.append(f"- [{name}](https://github.com/{name}) - Archived.")
            continue
        pushed = dt.datetime.fromisoformat(data["pushed_at"].replace("Z", "+00:00"))
        if pushed < cutoff and name.lower() not in allow:
            flagged.append(f"- [{name}](https://github.com/{name}) - No push since {pushed.date()}.")

    report = f"Checked {len(repos)} repositories; {len(flagged)} need review.\n\n" + "\n".join(flagged) + "\n"
    print(report)
    if args.output:
        with open(args.output, "w", encoding="utf-8") as fh:
            fh.write("# Stale repository report\n\n" + report)
    return 1 if flagged else 0


if __name__ == "__main__":
    sys.exit(main())
