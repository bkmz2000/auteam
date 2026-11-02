#!/usr/bin/env bash
set -euo pipefail

sha="${1:-}"
if [[ ! "$sha" =~ ^[0-9a-f]{40}$ ]]; then
  echo 'Expected a 40-character lowercase commit SHA' >&2
  exit 2
fi

root="${AUTEAM_DEPLOY_ROOT:-/srv/auteam}"
release="$root/releases/$sha"
if [[ ! -f "$release/index.html" || ! -f "$release/admin/config.yml" ]]; then
  echo "Release is incomplete: $release" >&2
  exit 1
fi

ln -sfn "$release" "$root/site.next"
mv -Tf "$root/site.next" "$root/site"
touch "$release"

mapfile -t stale < <(
  find "$root/releases" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' \
    | sort -nr \
    | awk 'NR > 5 { sub(/^[^ ]+ /, ""); print }'
)
for old in "${stale[@]}"; do
  if [[ "$old" != "$release" ]]; then
    rm -rf -- "$old"
  fi
done
