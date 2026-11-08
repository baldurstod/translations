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


lang = "swedish"

with open("./todo/" + lang + ".json", "r") as f:
    with open("./translations/english.json", "r") as english:
        l1 = json.load(f)
        l2 = json.load(english)
        #print(L1["strings"])
        l1_strings = l1["strings"]
        l2_strings = l2["strings"]

        for x in list(l1_strings):
            if l1_strings[x] == l2_strings[x]:
                del l1_strings[x]
                #print(x)

        with open("./translations/" + lang + ".json", "w", encoding="utf8") as f2:
            json.dump(l1, f2, indent=2, ensure_ascii=False)
