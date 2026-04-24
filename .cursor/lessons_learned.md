# 智慧管理平台开发与自动化治理经验教训 (Lessons Learned)

本节用于记录与沉淀项目迭代历程中的高发异常案例及排雷指北。**Agent 在执行任何前端/后端自动化作业前，须强制检索并读取本档案中的相关案例，避免“重复踩坑”。**

## 一、 Agent 自动化调试防挂起 (Vite Port 5173 特性冲突)

**背景与影响**：在执行 `@[/full-site-regression]` 冒烟测试或单纯的页面探测时，Agent 自动化框架（如 Playwright）经常卡在 `Loading URL / Opening Browser` 阶段长达几分钟以上。

**根本原因**：
*   测试对象如果是 `http://localhost:5173`（前端 Vite 开发模式），Vite 注入的 HMR 热更新会与浏览器保持长连接的 WebSocket。
*   默认自动化探针在获取 DOM 前会等待网卡达成 `NetworkIdle` 级别的安静状态，由于 WebSocket 频繁收发心跳包导致目标条件永远无法达成。

**优化方案 (Rule)**：
1. **测试口径迁移**：将自动化的默认首选访问口切至 `http://localhost:8080`（后端打包后的静态转发入口），该端口不含 HMR 隧道。
2. **侦测退改策略**：如果不得不访问 5173 页面，工作流里应自动附带参数，命令自动化浏览器仅等待 `DOMContentLoaded`，或在超时10秒后直接抓取控制台 (Browser Console Check)。

## 二、 实体类不同步与 DB 重构崩盘 (sm_indicator_lib)

**背景与影响**：在迭代中增加 `SmIndicatorLib.java` 属性（如 `calc_formula`, `is_composite`），导致项目启停即崩溃：`BadSqlGrammarException`。

**根本原因**：
*   MyBatis-Plus 在运行时执行 SELECT / UPDATE 映射时直接映射底层表名，实体类的增加并没有同步映射至 `ALTER TABLE sm_indicator_lib ADD COLUMN ...`。

**优化方案 (Rule)**：
1. **DDL 优先工作流**：凡改变 `src/main/java/**/entity/` 目录中带 `@TableName` 类的，Agent 必须第一时间生成对应 SQL 语句脚本并提交给用户 `ExecuteSqlData.java` 环境执行校验。
2. **错误自检**：如果控制台打印 `Unknown Column xyz in field list`，立刻调取该库表 `DESC sm_xxx` 并补充 `ALTER TABLE`，不要浪费时间看 Java 逻辑业务逻辑。

## 三、 Dashboard 聚合网关与面包屑保持

**背景与影响**：点击门户 (Portal) 的聚合入口卡片或左侧 Menu 时，由于路由参数传递失败或缓存未清，引发 `<KeepAlive>` 的内容窜线。

**优化方案 (Rule)**：
*   使用 `@mcp:sequential-thinking` 多步检查涉及 `name`, `path` 和 `meta.icon` 的大小写一致性。避免出现由于名称不一致导致 Vue3 Menu 组件渲染崩溃。
