## 功能
集成插件后，会自动上报接口数据

## 集成
```javascript
import  reportNetwork from '/dist/wechat/plugin/report-network/index.esm';
sensors.instance.usePlugin(reportNetwork);

reportNetwork.reportNetwork();
```

## 变动
新增属性 `url` 、 `url_path` 、 `body`、`head`、`method`、`http_code`、`biz_code`、`cost_time`、`tract_id`
