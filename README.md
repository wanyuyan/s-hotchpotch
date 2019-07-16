**开发**
```
npm i
npm start
```

**打包**
```
npm run build
```
---

* **每次添加自定义svg图标时，直接加到public/imgs/icons目录下, 然后执行以下命令精简svg**
1. 若本地未安装 svgo, 先安装：
    ```
    npm i svgo -g
    ```
2. 精简整个icons文件:
    ```
    svgo -f public/imgs/icons
    ```
3. 精简单独的svg:
    ```
    svgo public/imgs/icons/xxx.svg
    ```