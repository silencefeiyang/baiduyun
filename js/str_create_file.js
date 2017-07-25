//获取父级
var fileList = document.querySelector('#file-list');

//创建文件

function createFile(data,id){

	var str = '';
	if(data){
	for(var i = 0 ;i <data.length ; i++){
		str += `<li class="${data[i].id == id? 'select fl':'fl'}" data-id = "${data[i].id}" data-p-id = "${data[i].pId}">
					<div data-id = "${data[i].id}" data-p-id = "${data[i].pId}"></div>
					<div class="file-name-wrap">
						<span class="file-name">${data[i].title}</span><input type="text" value="" class="edit-name"" />
					</div>
					<i class="${data[i].id == id? 'select':''}"></i>`;
		str += data[i].child? `<ul>${createFile(data[i].child,id)}</ul>` :'';
		str += `</li>`;
	}
	}
	return str;
}

//将生成的文件夹的字符串放到父级里面------------------------------------------------------------

function inputStrFile(data,id){
	//当前这个id下的子集,可以存储每次UL下面的li
	var data = baiduyun.getChildrenById(data,id);
	//每次都清空ul里面的内容
	fileList.innerHTML = '';
	//调用这个函数,获取到生成好的字符串
	var item = createFile(data,id);
	//ul里面放入当前字符串的内容
	fileList.innerHTML = item;
	flag = true;
	return data;
}
//进入文件夹--------------------------------------------------------------------------------
//声明变量负责初始化函数,然后传这个变量,每次点击的时候储存当前点击的id
var enterIndexId = 0;
var indexPid = 0;
enterFile(data,enterIndexId);
function enterFile(data,id){
	fileList.ondblclick = function (e){
		flag = true;
		if(canClick){
			var target = e.target;
			if(target.nodeName.toUpperCase() == 'DIV' ||target.nodeName.toUpperCase() == 'LI'){
				//获取当前点击li或者div身上的id
				indexId = target.dataset.id*1;
				indexPid = target.dataset.pId*1;
				//每次进入文件夹把当前的checked变为false,以防上一层选中的,打开之后没有变回,还有移动到的时候
				for(var i = 0 ; i< curData.length ; i++){
					curData[i].checked = false;
				}
				//给当前点击的这个传入数据,使面包屑,树状菜单同步
				curData = connection(data,indexId);
	//			curDataId = curData[0].pId;		
				allItem.firstElementChild.innerHTML = '';
			}
		}
	}

}

//返回上一级文件夹-----------------------------------------------------------------------------------
//获取到返回上一级菜单按钮

var backPrev = document.querySelector('.back-prev');
backPrev.onclick = function (){
	flag = true;
	if(canClick){
	//由于当前点击这个li身上的pid是上一级的id,所以点一次存一次这个元素身上的pid,然后当做id传进去
	curData = connection(data,indexPid);
	indexId = indexPid;
	curDataId = curData[0].pId;
	
	allItem.firstElementChild.innerHTML = '';

	}
}





//文件夹右键事件
liright ();
function liright (){
	var contextmenu = document.querySelector('#list');
	var children = fileList.children;
	for(var i = 0; i <children.length ; i++){
		(function (i){
			children[i].oncontextmenu = function (e){
				var ax = e.clientX;
				var ay = e.clientY;
				contextmenu.style.display = 'block';
				contextmenu.style.left = ax + 'px';
				contextmenu.style.top = ay + 'px';
				document.onclick = function (){
					contextmenu.style.display = '';
					children[i].oncontextmenu = null;
				}
				e.cancelBubble();
			}
			fileList.oncontextmenu = function (){
				console.log(1);
				return false;
			}
		})(i);
	}

}
//获取全选
var allItem = document.querySelector('.all-item');
//全选,单选
Fileselect ();

function Fileselect (){
	var children = fileList.children;
	var n=0;

	allItem.onclick = function (){
		if(flag){
			//循环当前的li,添加选中状态
			for(var i = 0; i <children.length ; i++){
				children[i].classList.add('select');
				
				//将当前层级的选中变为true;
				curData[i].checked = true;
			}
			if(ifAllSelect()){
				allItem.firstElementChild.innerHTML = '√ ';
			}
			flag = false;
		}else{	
			for(var i = 0; i <children.length ; i++){
				children[i].classList.remove('select');
				//将数组中被取消选中的checked变为false	
				
				curData[i].checked = false;
			}
			if(!ifAllSelect()){
				allItem.firstElementChild.innerHTML = '';
			}
			flag = true;
		}
	}
	whenSingleFile ();
	function whenSingleFile (){
		fileList.addEventListener('click',function (e){
			var children = fileList.children;
			//获取当前点击单个li的id,从而拿到对应的数据
			var singeSelectFile = baiduyun.getItemById(data,e.target.dataset.id*1);
			
			delet(data,e.target.dataset.id*1);
			console.log(e.target);
			if(e.target.nodeName.toUpperCase() === 'LI'){			
				if(!singeSelectFile.checked){
					
					e.target.classList.add('select');
					singeSelectFile.checked = true;
					if(ifAllSelect()){
						allItem.firstElementChild.innerHTML = '√ ';						
						flag = false;
					}
				}else{
				
					e.target.classList.remove('select');
					singeSelectFile.checked = false;	
					if(!ifAllSelect()){
						allItem.firstElementChild.innerHTML = '';						
						flag = true;
					}
				}
				
			}
			if(e.target.nodeName.toUpperCase() == 'DIV'){
				if(!singeSelectFile.checked){
					
					e.target.parentNode.classList.add('select');
					singeSelectFile.checked = true;	
					if(ifAllSelect()){
						allItem.firstElementChild.innerHTML = '√ ';
						flag = false;
					}
				}else{
					e.target.parentNode.classList.remove('select');
					singeSelectFile.checked = false;	
					if(!ifAllSelect()){
						allItem.firstElementChild.innerHTML = ' ';
						flag = true;
					}
				}				
			}
			
		})
	}
	
	//检测有没有全选中
	function ifAllSelect(){
		//如果当前文件下没有子集也不能全选
		if(curData.length == 0){
			alertTips('当前没有文件可以全选啦');
			flag = false;
			return false;
		}
				
		//如果里面有一个不是选中的,那么就代表不是全选中的,那么return false;
		for(var i = 0 ; i < curData.length ; i++){
			if(!curData[i].checked){
				return false
			}
		}
		return true;
	}
}


