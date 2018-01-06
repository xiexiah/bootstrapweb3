$(document).ready(function(){
//日历选择
setDatePicker();
//点击上传文件
handleFileName();	
//表单重置
btnResetClick();
//uphtml上传按钮
submitBtn1();
//queryhtml提交按钮
submitBtn2();
 //翻页
 pageClick()




//	tab选项卡
var $div_li =$("div.tab-menu ul li");
      $div_li.click(function(){
      $(this).addClass("selected")            
           .siblings().removeClass("selected");  
           var index =  $div_li.index(this);  
      $("div.tab-box > div")    
          .eq(index).show()   
          .siblings().hide(); 

    })


//模态框
$('.btn-xs').click(function(){
	   $('#upModal').modal('show');
})


// 模态框table
$('.othabe tbody').css('text-align','left');
$('.othabe tbody tr td').css('border','none');
$('.othabe tbody tr td span').css('color','#000');
$('.othabe tbody tr td label').css('color','#000');
      
      
      
      
});

function handleFileName(){
  $(".upload").change(function(){
    var fileName = $(this).val(),
      len = insertTitle(fileName),
      $this=$(this);
    if (len < 0) {
      return;
    } else {
      $this.parents("div").find(".file_name").val(fileName.substring(len + 1));
    }
  });


};

//文档路径截取
function insertTitle(path){
   var test1=path.lastIndexOf('/');
   var test2=path.lastIndexOf('\\');
   var test=Math.max(test1,test2)
   return test;
}


//日历
 function setDatePicker(){
  $(".form_datetime").datetimepicker({
            language:  'zh-CN',
            format: 'yyyy-mm-dd',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 3, //这里就设置了默认视图为年视图
            minView: 3, //设置最小视图为年视图
            forceParse: 0,
   });
};

//遍历uphtml里的每个input
function checkNotNull1(){
	var $null=false;
	$.each($('.uphtml .notnull'), function(index,item) {
		if ($(this).val()=="") {
			$null=true;
		}
	});
	return $null;
}


//上传页面提交按钮
function submitBtn1(){
	$('.btn_submit1').click(function(){
		if (checkNotNull1()) {
			layer.alert('还有未填写的选项',{
			icon:7
			})
			return;
		} 
		//ajax 发往后台
		$.ajax({
			type:"post",
      url:"",
      async:true,
      data:$(".content_zone").serialize(),
      dataType:"json",
      success:function(data){
        if(data.success=="true"){
          layer.alert("保存成功！",{
            icon:1
          });
          //重置表单
          $(".btn_reset").trigger("click");
        }else{
          layer.alert("保存失败！",{
            icon:2
          });        //alert("保存失败！",{ 的结尾
        };           //else   的结尾
      }          
		})
	})
}

//查询页面
//遍历queryhtml的所以form组件不能为空
function checkNotNull2(){
	var $null=false;
	$.each($('.queryhtml .notnull'), function(index,item) {
		if ($(this).val()=="") {
			$null=true;
		}
	});
	return $null;
}

//查询页面提交按钮
function submitBtn2(){
	$('.btn_submit2').click(function(){
		if (checkNotNull2()) {
			layer.alert('还有未填写的选项',{
			icon:7
			})
			return;
		} 
		//ajax 发往后台
		$.ajax({
			type:"post",
      url:"",
      async:true,
      data:$(".content_zone").serialize(),
      dataType:"json",
      success:function(data){
        if(data.success=="true"){
          layer.alert("保存成功！",{
            icon:1
          });
          //重置表单
          $(".btn_reset").trigger("click");
        }else{
          layer.alert("保存失败！",{
            icon:2
          });        //alert("保存失败！",{ 的结尾
        };           //else   的结尾
      }          
		})
	})
};

//点击重置按钮form重置
function btnResetClick(){
	//让表单清空
    $(".btn_reset").click(function(){
				    //让表单清空
				    $(".content_zone")[0].reset();
				    //让input的值清空
				    $(".notnull").val("");
  });
}

//翻页
  function pageClick(){//翻页点击
  //点击上一页
  $(".prev_btn").click(function(){
    
    var nowPageNum=$(this).parents(".table_zone").find(".now_page_num").text();
    var allPageNum=$(this).parents(".table_zone").find(".all_page_num").text();
    if(nowPageNum==1){
      layer.msg('已经是第一页', {icon: 7})
      }else{
        nowPageNum--;
        $(this).parents(".table_zone").find(".now_page_num").text(nowPageNum);
        $(this).parents(".table_zone").find("tbody").addClass("hidden1")
        $(this).parents(".table_zone").find("tbody").eq(nowPageNum-1).removeClass("hidden1");
      };
  });
  //点击下一页
  $(".next_btn").click(function(){
    var nowPageNum=$(this).parents(".table_zone").find(".now_page_num").text();
    var allPageNum=$(this).parents(".table_zone").find(".all_page_num").text();
    if(nowPageNum==allPageNum){
      layer.msg('已经是最后一页', {icon: 7})
      }else{
        nowPageNum++;
        $(this).parents(".table_zone").find(".now_page_num").text(nowPageNum);
        $(this).parents(".table_zone").find("tbody").addClass("hidden1")
        $(this).parents(".table_zone").find("tbody").eq(nowPageNum-1).removeClass("hidden1");
      };
  });
};

