# 版本与恢复

最后更新：2026-10-11 · 工程版本 0.1.0，产品阶段名称 iDesign_v1.2_Q4。

仓库：https://github.com/water-mirmiles/iDesign_v1.2_Q4 。唯一源码位于此仓库 web/；旧聊天产物只供对照。

## 分支与候选

- main：空仓库初始化入口，后续稳定基线按授权合入。
- baseline-original：此次工程整理前的原型恢复点，本地 Git 保存。
- chore/project-foundation：ITER-001 正式工程候选；工程检查通过、待用户验收，不默认合并。
- v0.1.0-foundation-rc1：完整 CI 检查后在本地建立候选标签并纳入离线 bundle；尚未同步远程标签。rc 不表示正式发布或用户已验收。
- 日常工作在 feature/fix/chore，批量推送约定见 AGENTS 与 DEVELOPMENT_WORKFLOW。

## 保护与真实状态

首轮 [草稿 PR #1](https://github.com/water-mirmiles/iDesign_v1.2_Q4/pull/1) 已建立；完整 CI 证据见 TESTING。已核对远程/本地文件树一致，本机正式分支已跟踪远程同一提交；独立本地恢复点保留在 backup/local-* 分支，不改写历史。CI 工作流已纳入候选源码；服务器侧分支保护尚未配置，不能把它写成已启用。已连接 GitHub 接口未提供保护规则写入工具；浏览器未登录，设置页不可访问。本轮没有更改仓库权限。建议 main 设置必须 PR、必须通过 `Code and browser checks`、禁止强推/删除；评审人数按实际团队确定，单账号不能要求自己批准自己的 PR。

本机 Git CLI 未登录；首轮通过已连接 GitHub 接口初始化和导入，保留 parent 与文件树。本地独立原型恢复历史另留备份，远程同步后以远程提交建立跟踪分支。

连接 GitHub 不等于源码已上传；候选推送不等于合并；文件树一致不一定表示本地/远程提交 SHA 一致。若使用连接器导入，需要保留远程 parent、不强推，核对文件树后协调本地历史。

## 恢复与发布

```sh
git status
git log --oneline --decorate -12
git worktree add ../idesign-review baseline-original
git revert <commit>  # 已共享历史的回退，先保留未提交改动
git bundle create ../iDesign-history.bundle --all
```

禁止 reset --hard、clean 或 force push 覆盖用户工作。bundle 只备份 Git 已提交数据，不包含浏览器草稿或被忽略素材。

`npm run package` 全检查后输出静态包和校验值。正式发布需版本、CHANGELOG、PRD/FEATURES 和验收记录对应当前提交；标签不可改指向，部署另行授权。服务器身份/资产服务尚不存在，静态包不提供企业存储或真实模型。
