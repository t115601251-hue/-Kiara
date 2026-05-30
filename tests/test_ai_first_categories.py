import re
import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "index.html").read_text(encoding="utf-8")


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.nav = []
        self.sections = []
        self.cards = []
        self.in_nav = False
        self.current_nav = None
        self.current_section = None
        self.current_subcat = None
        self.current_card = None
        self.capture = None
        self.capture_depth = 0
        self.pending = ""

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = attrs.get("class", "").split()
        if self.capture:
            self.capture_depth += 1
        if tag == "nav" and attrs.get("id") == "nav":
            self.in_nav = True
        if self.in_nav and tag == "a":
            self.current_nav = {"cat": attrs.get("data-cat"), "text": ""}
            self.capture = "nav"
            self.capture_depth = 1
        if tag == "section" and "category" in classes:
            self.current_section = {
                "cats": attrs.get("data-cats", ""),
                "title": "",
                "subcats": [],
            }
        if self.current_section and tag == "div" and "cat-title" in classes:
            self.capture = "cat"
            self.capture_depth = 1
            self.pending = ""
        if self.current_section and tag == "div" and "subcat-title" in classes:
            self.capture = "subcat"
            self.capture_depth = 1
            self.pending = ""
        if self.current_section and tag == "a" and "link-card" in classes:
            self.current_card = {
                "section": self.current_section,
                "subcat": self.current_subcat,
                "href": attrs.get("href"),
                "name": "",
            }
        if self.current_card and tag == "div" and "name" in classes:
            self.capture = "name"
            self.capture_depth = 1
            self.pending = ""

    def handle_data(self, data):
        if self.capture == "nav" and self.current_nav is not None:
            self.current_nav["text"] += data
        elif self.capture:
            self.pending += data

    def handle_endtag(self, tag):
        if self.capture:
            self.capture_depth -= 1
        if self.capture == "nav" and tag == "a" and self.capture_depth == 0:
            self.current_nav["text"] = re.sub(r"\s+", " ", self.current_nav["text"]).strip()
            self.nav.append(self.current_nav)
            self.current_nav = None
            self.capture = None
        elif self.capture == "cat" and tag == "div" and self.capture_depth == 0:
            self.current_section["title"] = re.sub(r"\s+", " ", self.pending).strip()
            self.capture = None
        elif self.capture == "subcat" and tag == "div" and self.capture_depth == 0:
            self.current_subcat = re.sub(r"\s+", " ", self.pending).strip()
            self.current_section["subcats"].append(self.current_subcat)
            self.capture = None
        elif self.capture == "name" and tag == "div" and self.capture_depth == 0:
            self.current_card["name"] = re.sub(r"\s+", " ", self.pending).strip()
            self.capture = None
        if tag == "a" and self.current_card is not None:
            self.cards.append(
                {
                    "section_title": self.current_card["section"]["title"],
                    "section_cats": self.current_card["section"]["cats"],
                    "subcat": self.current_card["subcat"],
                    "href": self.current_card["href"],
                    "name": self.current_card["name"],
                }
            )
            self.current_card = None
        if tag == "section" and self.current_section is not None:
            self.sections.append(self.current_section)
            self.current_section = None
            self.current_subcat = None
        if tag == "nav":
            self.in_nav = False


def parsed_site():
    parser = SiteParser()
    parser.feed(HTML)
    return parser


class AIFirstCategoryTests(unittest.TestCase):
    def test_nav_uses_ai_first_categories(self):
        site = parsed_site()
        self.assertEqual(
            [item["cat"] for item in site.nav],
            ["all", "AI应用", "AI创作", "AI素材", "素材库", "运营", "工具箱"],
        )

    def test_sections_are_ordered_for_daily_ai_use(self):
        site = parsed_site()
        self.assertEqual(
            [section["title"] for section in site.sections],
            ["AI 应用", "AI 创作", "AI 素材 / 灵感", "素材资源", "自媒体运营", "工具箱"],
        )

    def test_key_sites_are_in_expected_sections(self):
        site = parsed_site()
        locations_by_name = {}
        for card in site.cards:
            locations_by_name.setdefault(card["name"], set()).add((card["section_title"], card["subcat"]))
        expected = [
            ("ChatGPT", ("AI 应用", "AI 对话模型")),
            ("ChatExcel", ("AI 应用", "AI 办公与写作")),
            ("Midjourney", ("AI 创作", "AI 绘画")),
            ("即梦AI", ("AI 创作", "AI 视频")),
            ("Awwwards", ("AI 素材 / 灵感", "设计灵感")),
            ("Pexels", ("素材资源", "图片素材")),
            ("抖音指数", ("自媒体运营", "数据热点")),
            ("TinyPNG", ("工具箱", "图片处理")),
        ]
        for name, location in expected:
            self.assertIn(location, locations_by_name.get(name, set()), name)


if __name__ == "__main__":
    unittest.main()
