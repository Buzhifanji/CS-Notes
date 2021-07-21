前端扩展知识系列构建工具之——grunt

grunt是前端构建工具，对于需要反复重复的任务，例如压缩（minification）、编译、单元测试、linting等，自动化工具可以减轻你的劳动，简化你的工作。当你正确配置好了任务，任务运行器就会自动帮你或你的小组完成大部分无聊的工作。

虽然grunt逐渐被市场淘汰了，但是本文记录学习grunt简单用法与设计思想，以此扩展自己的知识面。

gunt的学习，搞清楚*grunt*.registerTask、*grunt*.initConfig、*grunt*.registerMultiTask这个三个api就差不多了，它

