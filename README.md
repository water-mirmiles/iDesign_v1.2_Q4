# iDesign · 鞋履设计工作台

工程版本：0.1.0 · 最后更新：2026-10-11 · 状态：工程检查通过，待用户验收。

以用户提供的 24 张截图为视觉基准，复刻项目中心、全球产品库、经营看板和无限画布。当前是可运行的前端交互原型；PDM、ERP、AI、法务与经营数据仍为演示或未接入。仓库名中的 `v1.2_Q4` 表示产品阶段，不等于工程已达到正式 1.2 发布质量。

唯一源码为本仓库的 `web/`。此前聊天中的 ZIP、预览副本、`dist/` 和 `release/` 是产物，不在这些目录继续开发。

## 快速启动

需要 Node.js 24 LTS；发布打包另需 Python 3。运行时没有第三方前端依赖，npm 依赖仅用于浏览器回归。

```sh
git clone https://github.com/water-mirmiles/iDesign_v1.2_Q4.git
cd iDesign_v1.2_Q4
git switch chore/project-foundation  # 首轮候选尚未合入 main 时
npm ci
npm run dev
```

打开 http://127.0.0.1:8876/。若端口占用，使用 `PORT=8880 npm run dev`；浏览器存储按来源隔离，换端口不会自动迁移旧草稿。Windows 可在 PowerShell 用 `$env:PORT='8880'; npm run dev`。

入口：项目中心 → 我的设计 → 自建项目 → AS 演示。画布参考图右侧 `+` 打开四类设计工具；底栏可上传图片或选择演示素材。浅深主题、项目和画布记录保存在当前浏览器。

## 验证与交付

```sh
npx playwright install chromium
npm run check
npm run docs:sync -- origin/main  # 提交后检查整批 PR 的文档同步
npm run package
```

`check` 包含 JavaScript 语法、资源引用、文档链接、版本一致性、静态构建、单元和真实 Chromium 主流程回归。`package` 在全部检查通过后输出 `release/iDesign-0.1.0-static.zip`、逐文件校验清单和 ZIP SHA-256；解压产物可由静态 Web 服务承载，支持 `/iDesign/` 子目录。`npm run preview` 只用于本机预览构建。

首轮候选见 [草稿 PR #1](https://github.com/water-mirmiles/iDesign_v1.2_Q4/pull/1)。Linux CI 已通过完整工程门禁，证据见 TESTING。自动检查不能证明完整像素一致、真实外部服务或用户业务验收。当前具体验证结果见 [TESTING](docs/TESTING.md)，迭代状态见 [ITERATIONS](docs/ITERATIONS.md)。不默认部署或合并远程分支。

## 文档入口

| 文档 | 唯一职责 |
| --- | --- |
| [项目原则](docs/PROJECT_PRINCIPLES.md) | 产品、工程与协作约束 |
| [PRD](docs/PRD.md) | 需求编号、范围、状态与验收条件 |
| [开发流程](docs/DEVELOPMENT_WORKFLOW.md) | 从需求到交付的门禁及文档更新时机 |
| [功能台账](docs/FEATURES.md) | 实际实现、演示能力、已知缺口 |
| [迭代记录](docs/ITERATIONS.md) | 每轮目标、改动、证据与验收状态 |
| [测试](docs/TESTING.md) | 自动和人工验证，以及受阻记录 |
| [版本保护](docs/VERSIONING.md) | 分支、恢复、远程同步与发布 |
| [素材来源](docs/ASSET_SOURCES.md) | 截图素材、来源与使用边界 |
| [CHANGELOG](CHANGELOG.md) | 版本变化 |
| [AGENTS](AGENTS.md) | AI 必须执行的仓库工作规则 |

## 严格开发约定

沿用 iAMZ：先读文档和 `git status` → 记录迭代目标与验收 → `feature/`、`fix/` 或 `chore/` 分支开发 → 同步相关文档 → 检查 → 本地提交恢复点 → 批量推送与草稿 PR → 用户验收 → 另行授权合并/发布。

日常不自动推送。用户发起“打包推送”后先完成测试、文档和可审阅变更清单，随后收到 OK 才推送及更新 PR；明确包含推送的当前指令可作为该批次授权。本次初始化属于已授权批次，不自动授权以后推送、合并或部署。

产品代码变化必须在同批提交更新 PRD、FEATURES、ITERATIONS、CHANGELOG；开发命令、测试和 CI 变化必须更新 README、TESTING、ITERATIONS、CHANGELOG。相关内容发生变化时一起更新；纯样式也在 PRD 记录受影响需求和验收结果。每轮就地更新这些文档，不另建多个“最新版 PRD”。CI 对 PR 强制检查文件同步；文字准确性由评审核对。服务器侧分支保护的实际状态另记 VERSIONING，不把书面规则当作已启用权限限制。

## 当前能力与边界

- 可用：页面切换、主题、新建/重命名/复制/归档/回收/恢复项目、图片上传、节点拖动与刷新保留、参考图下载、项目 JSON 与画布 SVG 导出。
- 演示：CT 品牌项目、产品库样例及总数、经营看板、PDM/ERP 选图、创作/衍生/多视角/元素提取。
- 未接入：正式登录/品牌权限、公司资产服务、真实 AI/法务/3D、企业数据、跨设备分享与多人协作。
- JSON 导出缺少导入恢复功能；部分画布状态和导出一致性尚需补齐，见 [已知缺口](docs/FEATURES.md#已知缺口)。浏览器本地保存不等于公司云端备份。

## 目录

```text
web/                 唯一前端源码及截图裁切素材
scripts/             本机服务、构建、检查、打包
tests/               工程门禁单元与浏览器行为回归
docs/                产品、能力、流程、迭代和验证事实
.github/             CI、PR 和需求/缺陷模板
dist/ release/       生成产物，Git 忽略
```
