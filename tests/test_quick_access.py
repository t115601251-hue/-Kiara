import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "index.html").read_text(encoding="utf-8")


class QuickAccessTests(unittest.TestCase):
    def test_category_nav_sits_inside_header_before_quick_access(self):
        self.assertIn('id="quickAccess"', HTML)
        self.assertIn('id="quickAccessTrack"', HTML)
        self.assertIn('id="quickAccessMode"', HTML)
        self.assertLess(HTML.index("<header>"), HTML.index('<nav id="nav"'))
        self.assertLess(HTML.index('<nav id="nav"'), HTML.index("</header>"))
        self.assertLess(HTML.index("</header>"), HTML.index('id="quickAccess"'))

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
