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
  <input id="env" type="text" value="{{ env }}" style="display: none;">
  <input id="options" type="text" value="{{ options }}" style="display: none;">
</body>
<script type="text/javascript">
  try {
    window.env = document.getElementById('env').value;
    const options = document.getElementById('options').value;
    window.options = JSON.parse(options);
  } catch (error) {
    console.error(error);
  }
</script>

</html>