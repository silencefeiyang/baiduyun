//获取到面包屑导航的父级
var cookieList = document.querySelector('.step-list');
//获取到返回上一级菜单的按钮
var backPrev = document.querySelector('.back-prev');

creatCookie(data,0);
//创建面包屑导航的内容
function creatCookie(data,id){
	var str = '';
	//循环对应id和包含父级的数组，然后生成对应的内容
	for(var i = 0; i<data.length-1 ; i++){
		str += `<a href="javascript:;" class="fl"  data-id="${data[i].id}" data-p-Id="${data[i].pId}">${data[i].title}</a>
				<i class="next fl">></i>`				
	}
	//最后一个是span  所以不放到for循环里,不然会生成循环那么多个的span
	str += `<span>${data[data.length-1].title}</span>`	
	return str;
};
//面包屑点击事件----------------------------------------------------------- 
//声明变量负责初始化函数,然后传这个变量,每次点击的时候储存当前点击的id;
//var singleId = 0;
inputCookie(data,indexId);
//面包屑导航事件
function inputCookie(data,id){
	//当在根目录时,没有返回上一级菜单,所以返回上一级不显示
	if(id==0){
		backPrev.style.display = 'none';
	}else{
		backPrev.style.display = 'block';
	}
	//根据id使用:获取到自己和父级的函数,获取到对应id和它的父级,返回一个数组
	var item = baiduyun.getParentsById(data,id).reverse();
	//将这个数组传入生成面包屑内容的函数内,
	var welldone = creatCookie(item,id);
	cookieList.innerHTML = welldone;
	var children = cookieList.getElementsByTagName('a');
	for(var i = 0 ;i <children.length ; i++){
		children[i].onclick = function (){
			//dataset获取到的是字符串,要转换成数字才能用
			indexId = this.dataset.id*1;
			//单独的变量存储当前在哪个id的文件下
			newPid = indexId;
			curData = connection(data,indexId)
			curDataId = curData[0].pId;
		}
	}
}

