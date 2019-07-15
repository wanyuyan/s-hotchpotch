1. 每次添加svg图标时，直接加到public/imgs/icons目录下, 然后执行以下命令精简svg
svgo -f public/imgs/icons
svgo public/imgs/icons/xxx.svg