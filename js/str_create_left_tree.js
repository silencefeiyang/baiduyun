//获取外层的父级
var leftParentUl = document.querySelector('.left-parent-ul');
//给h3添加class,id和pId自定义属性  这里注意data-自定义属性会自自动转换为小写,要驼峰命名的话在要大写的字母前面加-
function createLeftTree(data,id){
	var str = '';
	for(var i = 0 ; i<data.length ; i++){
		str += `<li>
					<h3 class="${data[i].id == id? 'select' : ''}" data-id="${data[i].id}" data-p-Id="${data[i].pId}">
					${data[i].child? `<i></i>`:''}
						<span class="${data[i].id == id? 'open':''}"></span>
						${data[i].title}
					</h3>`;
		str += data[i].child? `<ul>${createLeftTree(data[i].child,id)}</ul>`:'';
		str += `</li>`;			
	}
	return str;
}

//把生成的字符串放到ul父级里
function inputLeftTree(data,id){
	var item = createLeftTree(data,id);
	leftParentUl.innerHTML = item;
}
controlTree(leftParentUl);
function controlTree(ul){
	ul.onclick = function (e){
		if(e.target.nodeName.toUpperCase() == 'H3'){
			console.log(e.target);
			//如果当前点击是h3,那么显示
			e.target.classList.add('select');
			e.target.children[0].classList.add('open');
			e.target.children[1].classList.add('open');
			//获取点击的这个目录的id
			indexId = Number.parseInt(e.target.attributes[1].value);	
			indexPid = e.target.dataset.pId*1;
			//清空全选
			allItem.firstElementChild.innerHTML = '';
			//放到所有的生成文件的函数里进行同步
			curData = connection(data,indexId);
		}
	}
}

//获取弹窗的父级

function createMoveTo(data,id){	
	var moveToWrap = document.querySelector('.move-to-wrap');
	moveToWrap.innerHTML = createLeftTree(data,id);	
}
//controlTree(moveToWrap);





