$(function () {
  // semantic UI里的表单Radio Checkbox，使用需要加上下面这句代码
  $('.ui.radio.checkbox').checkbox();

  // 图片上传立即显示
  var dataUrl;
  var articleCover = document.getElementById('articleCover');
  var input__upload_img = document.getElementById('input__upload-img');
  articleCover.onchange = function () { 
    var fileReader = new FileReader();
    fileReader.onload = function () {
      dataUrl = fileReader.result;
      input__upload_img.src = dataUrl;
    }
    fileReader.readAsDataURL(articleCover.files[0]);
  }

  // 新建富文本插件quill实例
  hljs.configure({   // optionally configure hljs
    languages: ['javascript', 'ruby', 'python']
  });
  var toolbarOptions = [    
    // [{ 'size': [] }],
    [ 'bold', 'italic', 'underline', 'strike' ],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'super' }, { 'script': 'sub' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }, 'blockquote', 'code-block' ],
    [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
    [ 'direction', { 'align': [] }],
    [ 'link', 'image', 'video', 'formula' ],
    [ 'clean' ]  
  ];
  var quill = new Quill('#editor', {
    modules: {
      formula: true,
      syntax: true,
      toolbar: toolbarOptions
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'
  });

  quill.on('editor-change', function () {
    $('#editor__input-content').val(quill.root.innerHTML)
    $('#editor__input-text').val(quill.root.innerText)
    $('#editor__input-delta').val(JSON.stringify(quill.getContents()))
  })

  var delta = document.getElementById('editor__input-delta');
  if (delta.value) {
    quill.setContents(JSON.parse(delta.value))
  }

})