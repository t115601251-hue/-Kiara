# 导航站入库元数据要求

本文件用于约束 `index.html` 中所有网站卡片的介绍、标签和搜索关键词维护方式。新增或调整网站时必须同步更新本文件要求对应的元数据。

## 必填项

每个入库网站都必须具备以下信息：

- 页面卡片一句话描述：写在 `.desc`，让用户一眼知道这个网站能做什么。
- 悬停详情介绍：优先写入 `CARD_INFO[name].detail`，没有单独配置时必须能通过分类默认规则生成明确介绍。
- 使用帮助：优先写入 `CARD_INFO[name].helps`，说明这个网站能帮用户完成什么任务。
- 可见标签：通过 `CARD_INFO[name].tags`、`SITE_META[name].tags` 或分类规则生成，显示在卡片下方和悬停详情里。
- 隐藏关键词：写入 `SITE_META[name].keywords`，用于搜索匹配，不一定显示给用户。
- 任务入口映射：通过 `SITE_META[name].tasks`、`SUBCAT_META[subcat].tasks` 或 `CATEGORY_META[category].tasks` 进入对应任务场景。

## 任务入口词

`按任务找工具` 的按钮只使用单一任务词，不能使用多个空格分隔关键词，否则搜索会按 AND 逻辑过滤导致结果过少。

当前任务词：

- `写文案脚本`
- `做网页界面`
- `生成图片视频`
- `做封面海报`
- `找素材资源`
- `查热点运营`
- `处理文件图片`
- `休息摸鱼`

这些任务词必须能在对应网站的 `dataset.search` 中命中。实现路径是：

1. 任务词映射到 `TASK_ALIAS_TO_KEY`
2. 任务 key 映射到 `TASK_WORDS`
3. 卡片通过 `CATEGORY_META`、`SUBCAT_META`、`SITE_META` 获得任务 key
4. `enhanceCards()` 合并任务词、隐藏关键词和标签到 `card.dataset.search`

## 关键词编写规则

隐藏关键词要覆盖用户真实搜索说法，至少包含：

- 网站英文名、中文名、常用简称
- 功能词：如 `抠图`、`去背景`、`压缩`、`视频生成`
- 任务词：如 `封面`、`文案`、`热点`、`配音`
- 资源类型：如 `图片素材`、`字体`、`图标`、`PPT模板`
- 平台词：如 `小红书`、`抖音`、`微博`、`B站`
- 同义词和口语词：如 `去底`、`透明背景`、`摸鱼`

不要只写分类名或网站名。关键词越接近用户自然输入，搜索越有用。

## 新增网站流程

1. 在对应分类和子分类中新增 `.link-card`。
2. 写清楚 `.desc`，避免只写“工具平台”“资源网站”这类模糊描述。
3. 如果网站很重要或功能特殊，在 `CARD_INFO` 中写 `short`、`detail`、`helps`、`tags`。
4. 在 `SITE_META` 中添加同名条目，至少补 `keywords`，必要时补 `tags` 和 `tasks`。
5. 如果新增了新子分类，同步补 `SUBCAT_META`。
6. 如果新增了新任务入口，同步补 `TASK_WORDS`、`TASK_ALIAS_TO_KEY` 和任务按钮。
7. 运行校验，确保每张卡片都有 `dataset.search`、`dataset.tags`、`dataset.hiddenTags`、`dataset.tasks`。

## 校验标准

每次维护后至少验证：

- 任务入口点击后必须出现结果。
- 搜索同义词能命中，例如 `抠图` 命中 Remove.bg，`封面` 命中设计和图片生成工具。
- 所有 `.link-card` 都生成标签和隐藏关键词。
- `python -m unittest discover -s tests` 通过。
- 内联脚本解析通过。
