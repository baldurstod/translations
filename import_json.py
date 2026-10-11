import json
import sys
from collections import OrderedDict


def join_duplicate_keys(ordered_pairs):
    seen = OrderedDict()
    for k, v in ordered_pairs:
        if k not in seen:
            seen[k] = v
        else:
            if seen[k] != v:
                print("error", k, "|" + seen[k] + "|", "|" + v + "|")
    return seen


with open("french.json", "r") as f:
    L = json.load(f, object_pairs_hook=join_duplicate_keys)

    with open("data.json", "w", encoding="utf8") as f2:
        json.dump(L, f2, indent=2, ensure_ascii=False)
