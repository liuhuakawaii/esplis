<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <link rel="stylesheet" href="/static/normallize.css">
  <link rel="icon" href="/static/logo.png" type="image/x-icon">
</head>

<body style="background-color: #f0f0f0;">
  <h1>ENTRY PAGE1</h1>
  <input id="env" type="text" value="{{ env }}" style="display: none;">
  <input id="options" type="text" value="{{ options }}" style="display: none;">
  <button id="btn" onclick="handleClick()">发送请求</button>
  <button id="btn2" onclick="handleClick2()">发送Post请求</button>
</body>
<script src="https://cdn.bootcss.com/axios/0.18.0/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-md5@0.8.3/src/md5.min.js"></script>
<script type="text/javascript">
  try {
    window.env = document.getElementById('env').value;
    const options = document.getElementById('options').value;
    window.options = JSON.parse(options);
  } catch (error) {
    console.error(error);
  }

  const handleClick = () => {
    const signKey = 'dbaskb45s3afaf8v2a0asd1a'
    const st = Date.now()
      axios.request({
        url: '/api/project/list',
        method: 'get',
        params:{ a:1, project_key:1 },
        headers: { 
          s_sign:md5(`${signKey}_${st}`), 
          s_t:st 
        }
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    };

    const handleClick2 = () => {
      axios.request({
        url: '/api/project/list2',
        method: 'post',
        data:{a:1,b:2}
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    };
</script>

</html>