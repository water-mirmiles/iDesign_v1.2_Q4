# 测试与验收

最后更新：2026-10-11 · ITER-001 · 自动测试、视觉对照、外部集成和用户验收分别记录。

## 自动检查

`npm run check` 顺序执行 lint、docs:check、build、test:unit、test:e2e。Node 24；Playwright 1.63.0 锁定在 package-lock。首次需 `npm ci` 和 `npx playwright install chromium`。CI 在 Linux 安装对应 Chromium 后执行同一命令，无重试掩盖不稳定行为。

- lint：所有 JS/MJS 语法、HTML 资源链接和源码字面量素材引用。
- docs:check：正式文档齐全、相对文件链接存在、README 与 package 版本一致、PRD 有更新字段。锚点和事实准确性需评审。
- build：仅复制唯一 web 源到 dist，保留相对 URL。
- 单元：产品/工程变化的文档要求；构建在 `/iDesign/` 路径可访问、缺图/路径越界/非 GET 方法的行为。
- 浏览器 2 条主流程：dist 在子目录下的项目/主题刷新/产品详情/看板且无脚本或资源错误；新建项目 → 自由创作演示 → 刷新保留结果 → 解析真实下载 JSON。
- PR 同步：以 PR base 的 merge-base 比较整批变更；web 变化必须含 PRD/FEATURES/ITERATIONS/CHANGELOG；工具变化必须含 README/TESTING/ITERATIONS/CHANGELOG。只检测文件变化，内容由评审。
- 打包：检查之后输出静态 ZIP 与 SHA-256；源码、测试、密钥和用户数据不进入包。

上述主流程是回归起点，不覆盖所有产品验收条件。涉及项目复制、SVG、配额、迁移、权限与真实接口时另加针对性的行为测试。

## 当前验证记录

- 整理前人工：本次会话浏览器检查项目切换、新建、四类工具面板、演示生成、颜色提取入口、三来源选图、拖动/刷新、主题、详情、看板、JSON 下载；未记录浏览器脚本错误。此前 Node 语法与 ZIP 校验通过。
- ITER-001 本地：语法/资源、文档链接/版本、构建和 3 项单元检查通过；Python 打包脚本语法通过。Chromium 已下载到工作区，但启动因 macOS MachPortRendezvous Permission denied（1100）被阻断，两条浏览器断言均未执行，完整 npm run check 未通过。Linux CI 的后续通过证据见下条，本地限制仍保留，不删减回归门禁。
- 全 24 屏固定分辨率像素对照未完成；正式用户验收未完成。
- 首次 Linux CI（af95adf，[run 38146591304](https://github.com/water-mirmiles/iDesign_v1.2_Q4/actions/runs/38146591304)）在浏览器断言发现两处测试定位错误：卡片标题带状态文字，不能用整段精确文本；描述的模糊标签同时匹配润色按钮。改用项目完整 aria-label 与 textbox 精确名称，保留两条原流程和全部断言，修正后重新验证。
- 第二次 Linux CI（fc770b6，[run 38146721061](https://github.com/water-mirmiles/iDesign_v1.2_Q4/actions/runs/38146721061)）：新建/生成/刷新/JSON 文件主流程通过；产品卡鼠标中心命中 hover 创作入口而非详情，改用可聚焦产品卡的 Enter 打开详情，继续核对详情/看板及资源错误，不删断言。
- 没有真实 AI、PDM/ERP、法务、经营和协作服务，因此不记录这些联网验收通过。此前在线部署未完成，不等于当前 GitHub 同步失败。

- 最终功能验证提交 `d9e66e08ea07d387bffeaa3cb4c95de96a63b735`：[Linux CI 38146866579](https://github.com/water-mirmiles/iDesign_v1.2_Q4/actions/runs/38146866579) 完整通过：语法/资源、文档、构建、3 项单元、2 条 Chromium 主流程、PR 文档同步与发布包创建。后续仅补充验证文档，最新 head 的检查以 PR 显示为准。本机 Chromium 受阻与前两次定位失败记录保留。
- 44 个参考素材逐个与大小/SHA-256 清单核对一致；本地与远程文件树一致。

## 人工验收步骤

1. 全新浏览器存储打开项目，检查 PDM 空态 → 自建两个项目 → CT 品牌 → 状态/搜索筛选；另建项目，不用真实用户稿测试。
2. 新建测试稿：名字、Brief、节点拖动、刷新、上传、归档/回收/恢复；检查项目隔离。核对完整复制缺口，不能当已修复。
3. 四类创作面板对照截图；描述与历史保留，生成明确为演示。左右脚/角度只是演示，不能算真实模型效果。
4. PDM/ERP/全球产品库导入页、未选禁用、选图数量上限、加入节点；切来源看演示状态。
5. 浅/深项目、库、详情、看板、画布/侧栏和弹窗，对照 PRD 截图索引；保存对照结论，不把输出截图放 Git。
6. 实际下载源图/JSON/SVG，查看文件及移动/样式一致性。当前缺口逐条记录，JSON 无恢复入口。
7. 用户给出接受或退回原因；ITERATIONS 才能更新为已验收。自动检查通过不自动接受视觉与业务功能。

检查受阻时记录命令、阶段、报错和哪些断言未运行；不把语法通过等同浏览器通过，也不降低 check 标准。
