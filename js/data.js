var data =[
	{
	title:'根目录',
	id:0,
	pId:-1,
	maxid:21,
	checked: false,
    type: 'folder',
	child:[
		{	id : 1,
			pId : 0,
			title:'全部文件',
			checked: false,
    			type: 'folder',
			child:[{
				id:4,
				pId:1,
				title:'视频',
				checked: false,
    				type: 'folder',
				child:[
				{
					id:7,
					pId:4,
					title:'前端视频',
					checked: false,
    					type: 'folder',
    					child:[]
				},{
					id:8,
					pId:4,
					title:'电视剧',
					checked: false,
    					type: 'folder',
    					child:[]
				}]
			},{
				id:5,
				pId:1,
				title:'音乐',
				checked: false,
    				type: 'folder',				
				child:[{
					id:11,
					pId:5,
					title:'轻音乐',
					checked: false,
	    				type: 'folder',
	    				child:[]
				},{
					id:12,
					pId:5,
					title:'流行乐',
					checked: false,
	    				type: 'folder',
	    				child:[]
				}]
			}]
		},{
			id : 2,
			pId : 0,
			title:'我的分享',
			checked: false,
			type: 'folder',			
			child:[]
		},{
			id:3,
			pId:0,
			title:'回收站',
			checked: false,
    			type: 'folder',
    			child:[]
		}		
	]
	}
]
