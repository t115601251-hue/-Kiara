import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "index.html").read_text(encoding="utf-8")


class QuickAccessTests(unittest.TestCase):
    def test_quick_access_bar_sits_between_header_and_category_nav(self):
        self.assertIn('id="quickAccess"', HTML)
        self.assertIn('id="quickAccessTrack"', HTML)
        self.assertIn("快速访问", HTML)
        self.assertLess(HTML.index("</header>"), HTML.index('id="quickAccess"'))
        self.assertLess(HTML.index('id="quickAccess"'), HTML.index('<nav id="nav"'))

    def test_quick_access_records_recent_card_clicks(self):
        self.assertIn("mediaVault.recentLinks.v1", HTML)
        self.assertRegex(HTML, r"MAX_RECENT_LINKS\s*=\s*10")
        self.assertIn("renderQuickAccess", HTML)
        self.assertIn("recordQuickAccessLink", HTML)
        self.assertIn("querySelectorAll('.link-card')", HTML)
        self.assertRegex(HTML, r"localStorage\.(getItem|setItem)")

    def test_quick_access_has_default_ai_shortcuts(self):
        for name in ["ChatGPT", "Claude", "DeepSeek", "豆包", "即梦AI", "Midjourney", "LiblibAI", "Pexels"]:
            self.assertIn(repr(name), HTML)


if __name__ == "__main__":
    unittest.main()
