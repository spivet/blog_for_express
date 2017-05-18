$(function () {
  // 获取文章列表
  function getPaging(num) {
    $.ajax({
      url: '/admin/manage/paging',
      type: 'post',
      dataType: 'JSON',
      data: {
        pageSize: 10,
        currentPage: num
      },
      success: function (data) {
        console.log(data.length)
        var str = '';
        for (var i = 0; i < data.length; i++) {
          str += '<tr>'
              +    '<td>'+data[i].title+'</td>' 
              +    '<td>'+data[i].createtime+'</td>' 
              +    '<td>'+data[i].updatetime+'</td>' 
              +    '<td>'+data[i].pv+'</td>' 
              +    '<td><a class="ui primary basic button" href="/admin/edit/"'+data[i]._id+'>编辑</a></td>' 
              +    '<td><a class="ui negative basic button" href="/admin/delete/"'+data[i]._id+'>编辑</a></td>' 
              +  '</tr>'
        }
        $('#tbody__manage').html(str)
      }
    })
  }

  $.ajax({
    url: '/admin/manage/length',
    type: 'get',
    success: function (data) {
      $('#pagination').jqPaginator({
        totalCounts: parseInt(data, 10),
        pageSize: 10,
        visiblePages: 7,
        currentPage: 1,
        onPageChange: function (num, type) {
          console.log('当前第' + num + '页');
          getPaging(num)
        }
      });
    }
  })
})