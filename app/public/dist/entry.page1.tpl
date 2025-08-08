<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/static/normallize.css">
  <link rel="icon" href="/static/logo.png" type="image/x-icon">
  <title>{{title}}</title>
</head>

<body>
  <div id="root"></div>
<script>
  // 将字符串型 env 直接注入
  window.env = '{{ env }}';
  // 将 JSON 结构直接注入（保持原样，不转义），避免 HTML 实体造成 JSON.parse 出错
  window.options = {{ options | safe }};
</script>
<script defer src="http://127.0.0.1:9002/public/dist/dev/js/runtime_947d2f86.bundle.js"></script><script defer src="http://127.0.0.1:9002/public/dist/dev/js/vendor_cf0d5d3a.bundle.js"></script><script defer src="http://127.0.0.1:9002/public/dist/dev/js/entry.page1_4a2b5d07.bundle.js"></script></body>
</html>