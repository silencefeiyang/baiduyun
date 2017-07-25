var baiduyun = {};
//变量接受当前file的层级下的数据
var curData=[0];
//变量控制渲染三个区域的ID
var indexId = 0;
//存当前这一层的id
var curDataId ='';
//开关
var canClick = true;
//控制全选的开关
var flag = true;
//根据id找到指定的对象
baiduyun.getItemById = function (data,id){
	var item = null;
	//循环当前的数组
	for(var i = 0 ; i <data.length; i++){
		//如果当前这一层有，那么就让item等于这个
		if(data[i].id === id){
			item = data[i];
			break;
		}
		//如果当前这一层没有，并且没有找到，并且当前这一个对象有子集，那么就继续找子集下面的
		if(!item && data[i].child){
			item = this.getItemById(data[i].child,id)
			if(item){
				break;
			}
		}
	}
	return item;
}
//根据id找到这个id对象下面的子集
baiduyun.getChildrenById = function (data,id){
	var targetData = this.getItemById(data,id);
	//如果有当前这个对象，并且他有子集
	if(targetData && targetData.child){
		return targetData.child;
	}
	return;
}
//根据id获取到自己和自己的所有的父级
baiduyun.getParentsById = function (data,id){
	var items = [];
	var current = this.getItemById(data,id);
	if(current){
		items.push(current);
		items = items.concat(this.getParentsById(data,current.pId))
//		items = this.getParentsById(data,current.pId)
	}
	return items;
}
//弹框提示
function alertTips(inner){
	var outtip= document.querySelector('.outtip');
	outtip.innerHTML = inner;
	tool.animation(outtip,{top:50},1000,function (){
		setTimeout(function(){
			tool.animation(outtip,{top:-100},1000)
		},1000);
	});
}
//检测名字是否可用
function nameCanUse(data, name, replaceData){
  for(var i=0; i<data.length; i++){
    if(data[i].title === name){
      if(replaceData){
        replaceData.pId = data[i].pId;
        data[i] = replaceData;
        // data[i].name = data[i].name + '(新)';
        break;
      }
      return false;
    }
  }
  return true;
}
//检测名字是否可用简易版



//获取最大的id值
function getMaxId(data){
	return data[0].maxid = data[0].maxid+1;
}
var fileList = document.querySelector('#file-list');
//creatFile();
//创建单个节点
function creatFile(){
		//创建外层的li
		var singleFile = document.createElement('li');
		singleFile.className = 'newSingleFile fl';
//		singleFile.className = data[i].id == id ? 'select':'';
		//创建图标
		var fileImg = document.createElement('div');
		fileImg.className = '';
		singleFile.appendChild(fileImg);
		
		//创建文件件名字的外层
		var fileNameWrap = document.createElement('div');
		fileNameWrap.className = 'file-name-wrap';
		//显示的文件夹名
		var fileName = document.createElement('span');
		fileName.innerHTML = '';
		fileName.className = fileName.title='file-name';
		fileNameWrap.appendChild(fileName);
		//编辑的文件夹名
		var editName = document.createElement('input');
		editName.className = 'edit-name';
		editName.type = 'text';
		fileNameWrap.appendChild(editName);
		
		singleFile.appendChild(fileNameWrap);
		//左上角的钩钩，代表文件是否选中
		var fileMode = document.createElement('i');
		fileMode.className = '';
		singleFile.appendChild(fileMode);
		fileList.insertBefore(singleFile,fileList.firstElementChild);
}
    function getRect(obj, type){
      var rect = obj.getBoundingClientRect();
      switch(type){
        case 'left':
          return rect.left;
        break;
        case 'top':
          return rect.top;
        break;
        case 'right':
          return rect.right;
        break;
        case 'bottom':
          return rect.bottom;
        break;
      }
    };
//碰撞检测函数
   function duang(current, target){
      var currentRect = current.getBoundingClientRect();
      var targetRect = target.getBoundingClientRect();
      var currentLeft = currentRect.left, 
          currentTop = currentRect.top,
          currentRight = currentRect.right,
          currentBottom = currentRect.bottom;
      var targetLeft = targetRect.left, 
          targetTop = targetRect.top,
          targetRight = targetRect.right,
          targetBottom = targetRect.bottom;
      return currentRight > targetLeft && currentBottom > targetTop && currentLeft < targetRight && currentTop < targetBottom;
    };

//获取元素函数
function getElement(className){
	var ele = document.querySelector(className);
	return ele;
}


