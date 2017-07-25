


//将树状菜单，面包屑导航，文件夹初始化的3个函数并到一个函数里面调用；
curData = connection(data,indexId);
//存当前这一层的pId
curDataId = curData[0].pId;
function connection(data,id){
	//左侧树状菜单
	inputLeftTree(data,id);
	//面包屑导航函数
	inputCookie(data,id);
	//弹窗的内容
	createMoveTo(data,id);
	//生成文件夹
	return inputStrFile(data,id);
}



//删除文件------------------------------------------------------
delet();
function delet(){
	if(canClick){
		var deleBtn = document.querySelector('.re-set-name');
		deleBtn.onclick = function (){
			console.log(canClick)
			if(!ifAnyFileSelect()){
				alertTips('你要删人家，是不是应该先选中？');
			}else{
				//循环当前展示这一层的数据
				for(var i= 0 ; i < curData.length ; i++){
					//如果数据里面是被选中的，那么就移除
					if(curData[i].checked == true){
						curData.splice(i,1);
						curData = connection(data,curDataId);
						alertTips('删除成功')
						//一定要i--，因为每次循环的length都在变小
						i--;
					}
				}
			}
		}
	}
}


//重命名----------------------------------------------------------

reName();
function reName(){
	var reNameBtn = document.querySelector('.delet-file');

	reNameBtn.onclick = function (){
		if(!ifAnyFileSelect()){
			alertTips('选择你要重命名的文件夹')
		}else{			
			if(canClick){
				canClick = false;
				if(ifMoreThanOne()){
					//因为选中的li选中之后添加了select的class名字，所以可以通过class名获取到点击的这个li
					var child = fileList.querySelector('.select');
					//获取这个li下面的span和input和i标签
					var nameSpan=child.getElementsByTagName('span');
					var nameInput= child.getElementsByTagName('input');					
					nameSpan[0].style.display = 'none';
					//让这个input自动获取焦点
					nameInput[0].style.display = 'block';
					nameInput[0].focus();
					nameInput[0].addEventListener('blur',function (){
						var val = nameInput[0].value.trim();
						if(val == ''){
							nameSpan[0].style.display = 'block';
							nameInput[0].style.display = '';	
							child.classList.remove('select');
						}else{
							//检测是否重名，如果重复了弹出提示框
							for(let i = 0 ; i <curData.length ; i++){
								if(val == curData[i].title){
									alertTips('重名啦，换一个名字吧')
									nameInput[0].focus();
									return;
								}
																														
							}
							//如果没有重名，就根据当前的id找到对应的那个数据，然后更新它的title
							var afterReName = baiduyun.getItemById(data,nameInput[0].parentNode.parentNode.dataset.id*1);
							afterReName.title = nameInput[0].value;
							//取消li选中
							child.classList.remove('select');
							//命名   span显示  input隐藏
							nameSpan[0].style.display = 'block';
							nameSpan[0].innerHTML = val;
							nameInput[0].style.display = 'none';
							alertTips('重命名成功')
							canClick = true;								
						}
						
					})
				}
				if(!ifMoreThanOne()){
					alertTips('一次只能选择一个进行重命名')
				}
			}
		}
	}
	
	//判断当前几个选中的函数
	function ifMoreThanOne(){
		var num = 0;
		for(var i = 0; i <curData.length ; i++){			
			if(curData[i].checked == true){
				num++;
				if(num>1){					
					return false;
				}
			}
		}
		return true;
	}
}

function ifAnyFileSelect(){
	for(var i = 0 ; i <curData.length ; i++){
		if(curData[i].checked === true){
			return true;
		}
	}
		return false;
}
//移动到--------------------------------------------------------------------
moveFileTo();
function moveFileTo(){
	//移动的按钮
//	var moveToBtn = document.querySelector('.move-to');
	var moveToBtn =	getElement('.move-to');
	//移动的框
	var moveToList = document.querySelector('.move-to-box');
	//li的父级
	var moveToWrap = document.querySelector('.move-to-wrap');
	//关闭弹框
	var closeMove = document.querySelector('.close-move');
	//确定移动
	var sureMove = document.querySelector('.sure-move')
	//取消移动
	var cancelMove = document.querySelector('.cancel-move');
	//遮罩层的后面
	var superbg =document.querySelector('.superbg');
	//提示重复的框
	var resure = document.querySelector('.resure');
	//第二层的确定覆盖的按钮
	var cover = document.querySelector('.cover');
	//第二层的移动但是不覆盖的按钮
	var continueRemove = document.querySelector('.continue-remove');
	//第二层的取消按钮
	var cancelChoice = document.querySelector('.cancel-move2');
	moveToBtn.onclick = function (){
 		if(canClick){	
			if(ifAnyFileSelect()){
				superbg.style.display = 'block';
				tool.animation(moveToList,{top:50},1000);
				//当自身的pid等于父级的id时，说明在往同一级移动，不能移,当自身的id等于目标的id也不能移动
				//如果移动到其他层级，先看有没有重名，有重名的弹出提示框，问是否覆盖。没有重名直接移动过去
				//点击前循环，看哪个被选中了
				//获取当前展示的li，看哪些被选中了
				var nowSelectLi = fileList.getElementsByClassName('select');
				if(nowSelectLi.length == 0){
					alertTips('先选择你要移动的文件');
				}else{				
					moveToWrap.addEventListener('click',function (e){
						
						var target = e.target;
						console.log(target)
						if(target.nodeName.toUpperCase() == 'H3'){
							
							target.classList.toggle('select');
							//让下面的ul显示
							target.nextElementSibling.style.display = 'block';
							//获取当前点击对象
							var nowFile = baiduyun.getItemById(data,target.dataset.id*1);
							
							//获取到当前点击这个文件的所有的父级数据
							var nowFileParent = baiduyun.getParentsById(data,target.dataset.id*1);
							//获取到当前点击这个文件的所有的子数据
							var nowFileChild = baiduyun.getChildrenById(data,target.dataset.id*1);
						
							sureMove.onclick = function (){	
								//如果移动到当前层级
								console.log(nowFile.id)
								console.log(indexId);
								if(nowFile.id == indexId){								
									alertTips('不能移动到自身或者其子目录下');	
								}
								//判断能不能移动到目标位置
								else if(!ifItemCanMove(nowFileParent,curData)){
									alertTips('不能移动到自身或者其子目录下');
								}
								else{									
									//当目标可用移动时，判断跟子集是否重名
									if(!targetParentNameIfRepeat(curData,nowFileChild)){
										//第二层的提示框弹出
										resure.style.display = 'block';
										//弹框第二层点击覆盖按钮
										cover.onclick = function (){
//											console.log(1);
											curSelectFile(curData,nowFileChild,nowFile);
											removeFileNoRepeat();
											resure.style.display = '';
											//重新渲染页面
											reSeatPage();
											superbg.style.display = '';
										}
										//弹框第二层点击不覆盖按钮
//										continueRemove.onclick = function (){
//											
//										}
										//弹框第二层点击取消按钮，第二层弹框消失
										cancelChoice.onclick = function (){
											resure.style.display = '';
										}
										
									}else{
										removeFileNoRepeat()
//										for(var i = 0 ;i < curData.length ;i++){
//											//移动选中的
//											if(curData[i].checked == true){
//												//更改id
//												curData[i].pId = nowFile.id;
//												//更新数据
//												nowFile.child.push(curData.splice(i,1)[0]);
//												i--;
//											}
//										}
//										curData = connection(data,curDataId);	
//										//遮罩层消失
//										superbg.style.display = '';
//										//弹框回去
//										tool.animation(moveToList,{top:-700},1000);
									}

								}
							}
						}
						//移动文件的函数
						function removeFileNoRepeat(){
							for(var i = 0 ;i < curData.length ;i++){
								//移动选中的
								if(curData[i].checked == true){
									//更改id
									curData[i].pId = nowFile.id;
									//更新数据
									nowFile.child.push(curData.splice(i,1)[0]);
									i--;
								}
							}
							curData = connection(data,curDataId);	
							//遮罩层消失
							superbg.style.display = '';
							//弹框回去
							tool.animation(moveToList,{top:-700},1000);			
						}
					})
				}
				//点击关闭
				closeMove.onclick = function(){
					superbg.style.display = '';
					tool.animation(moveToList,{top:-700},1000);
				}
				//点击取消
				cancelMove.onclick = function(){
					superbg.style.display = '';
					tool.animation(moveToList,{top:-700},1000);
				}
			}else{
				alertTips('选择你要移动的文件夹');
			}
			

		}
		//弹框第二层点击取消按钮
		function noTwoCancel (){
			cancelChoice.onclick = function (){
				return true;
			}
		}
 		//重新渲染函数
		function reSeatPage(){
			//重新渲染
			curData = connection(data,curDataId);	
			//遮罩层消失
			superbg.style.display = '';
			//弹框回去
			tool.animation(moveToList,{top:-700},1000);	
		}
		
		flag = true;
		allItem.firstElementChild.innerHTML = '';
	}

}

//判断目标地是不是自身
function ifItemCanMove(nowFileParent,curData){
	//先看当前展示的哪些li是被选中的
	for(var i = 0 ;i <curData.length ; i++){
		if(curData[i].checked){
			for(var j = 0 ; j < nowFileParent.length ; j++){
				//判断目标地有没有重名
				if(curData[i].id == nowFileParent[j].id){
					return false;
				}
			}
		}
	}
	return true;
}

//判断目标的子集有没有重名的
function targetParentNameIfRepeat(curData,nowFileChild){
	//循环当前展示的这层数据
	for(var i = 0 ; i <curData.length ; i++){
		//如果有选中的，将选中的数据分别与目标父级，目标自己比较有没有重名
		if(curData[i].checked){
			for(var j = 0 ; j < nowFileChild.length ; j++){
				if(curData[i].title == nowFileChild [j].title){
					return false;
				}
			}
		}
	}
	return true;
}
//替换目标
function curSelectFile(curData,nowFileChild,nowFile){
	console.log(curData);
	console.log(nowFileChild);
	for(var i = 0 ; i<curData.length; i++){
		if(curData[i].checked){
			for(var j = 0 ; j<nowFileChild.length ; j++){
				if(curData[i].title == nowFileChild[j].title){
					//将选中的id更改
					curData[i].pId = nowFile.id;
					curData[i].checked = false;
					//目标数据添加移动过来的数据
					nowFile.child.push(curData.splice(i,1)[0]);
					//目标点删除要覆盖的
					nowFile.child.splice(j,1);
					i--;
					break;
				}
			}
		}
	}
}








//定义一个变量，存储当前所在文件元素的id，作为新建文件夹数据的pId;
var newPid = 0;

//新建文件夹-------------------------------------------------------------
pushNewChild(data,0);
//新建单个数据节点，判断是否重名
function newCreateFile(){

		canClick = false;
		creatFile();
		var singleFile = fileList.querySelector('.newSingleFile');
		singleFile.classList.add('select');
		//获取这个li下面的span和input  
		var nameSpan=singleFile.getElementsByTagName('span');
		var nameInput= singleFile.getElementsByTagName('input');
		//i标签的状态
		var selecti=singleFile.getElementsByTagName('i');
		selecti[0].className = 'select';
		nameSpan[0].style.display = 'none';
		//让这个input自动获取焦点
		nameInput[0].style.display = 'block';
		nameInput[0].focus();
		nameInput[0].select();
		//编辑文件夹的名字，当input失去焦点的时候，判断是否重名，不重名就新建数据
		nameInput[0].addEventListener('blur',function (){
			//变量存当前input里面的值
			var val = this.value.trim();
			var newcreate = baiduyun.getItemById(data,newPid);
			//检测是否重复
			if(nameInput[0].value == ''){
				//如果没有取名字，就移除这个节点
				fileList.removeChild(singleFile);
				canClick = true;
			}else{
				//循环当前的层级，看是否重复
				for(var i = 0 ; i <curData.length; i++){
					if(curData[i].title == val){
						alertTips('重名啦，换个名字吧')
						nameInput[0].focus();
						return;
					}
				}
				//如果不重复，那么就创建单个新数据
				var newdir = {
					id:getMaxId(data),
					pId:indexId,
					title:nameInput[0].value,
					checked: false,
					type: 'folder',
					child:[]
				}
				//不重复再重新渲染文件区域
				curData.unshift(newdir);
				curData = connection(data,indexId);	
				alertTips('新建文件成功')
				canClick = true;
			}
			
			//取消li选中
			singleFile.classList.remove('select');
			selecti[0].classList.remove('select');
			//命名   span显示  input隐藏
			nameSpan[0].style.display = 'block';
			nameSpan[0].innerHTML = nameInput[0].value;
			nameInput[0].style.display = 'none';
		})
}
//单击新建文件夹，创建文件夹

function pushNewChild(){
//获取新建文件夹元素
var createNewFile = document.querySelector('.creat-new-file');	

	createNewFile.onclick = function (){
		if(canClick){
			canClick =false;
			newCreateFile();	
		}
   }
}

//鼠标画框
//mousedraw()
function mousedraw(){
	fileList.onmousedown = function (e){
		var target = e.target;
		e.preventDefault();
		var ax = e.pageX;
		var ay = e.pageY;
		//鼠标落下创建div
		var drawDiv = document.createElement('div');
		fileList.appendChild(drawDiv);
		drawDiv.classList.add('drawbox');
		this.onmousemove = function(e){
			var x = e.pageX;
			var y = e.pageY;
			var L = Math.min(ax - getRect(fileList, 'left'), x - getRect(fileList, 'left'))
			var T = Math.min(ay - getRect(fileList, 'top'), y - getRect(fileList, 'top'))
			var W = Math.abs(x - ax);
			var H = Math.abs(y - ay);
			pengzhuang(drawDiv,fileList);
			drawDiv.style.width = W+'px';
			drawDiv.style.height = H+'px';
			drawDiv.style.left = L +'px';
			drawDiv.style.top = T+'px';
		}
		document.onmouseup = function (){
			this.onmouseup = fileList.onmouse = null;
			//鼠标抬起移除div
			fileList.removeChild(drawDiv);
		}
		
	}
}
//碰撞之后的函数
function pengzhuang(ele,parent){
	var child = parent.children.length;
	for(var i = 0 ; i< child.length ; i++){
		console.log(1);
		if(duang(ele,child[i]) && ele != child[i]){
			baiduyun.getItemById(data,child[i].dataset.id).checked = true;
			child[i].classList.add('select');
		}
	}
}




























