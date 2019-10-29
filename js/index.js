$(function () {

	table(13)

	var size = 50
	function setHtml(){
		size = $(window).width()/38
		if(size<31.6){return}
		$("body").css({"background-size":$(window).width()+"px"})
		$("#myCanvas").attr({"height":size*13+"px","width":size*13+"px"})
		canvas(size)
		
		$("#qiPan").css({"margin":size+"px 0 0 "+(-(size*6+size/2))+"px","width":size*13})
	    $("td").css({"height":size,"width":size})
	    $("td").css({"background-size":size+"px"})
	}
		
	setHtml()
	$(window).resize(function(){
		setHtml()
	});
		

    var y = []
    for (let i = 0; i < 13; i++) {
    	let x = []
    	for (let j = 0; j < 13; j++) {
    		x[j] = -1
    	}
    	y[i] = x
    }

    
    let recordArr = []

    if(!window.sessionStorage){
        alert("浏览器不支持sessionStorage")
    }else{
       var storage = window.sessionStorage
       storage.setItem('arr','[]')
    }
    
	$("td").click(function () {

		recordArr = JSON.parse(storage.getItem('arr'))

		let name = $(this).prop("className")
		if(name.length>0){
			alert("落子无效！！！")
			return;
		}
    	if(recordArr.length%2 == 0){
    		$(this).addClass(" white");
    		$(this).css({"background-size":size+"px"})
    		let x1 = $(this).index();
    		let y1 = $(this).parent().index();
    		y[y1][x1] = 0;
    		recordArr.push([y1,x1])

    		storage.setItem('arr',JSON.stringify(recordArr))

    		myMath(y)
    	}else{
    		$(this).addClass(" black")
    		$(this).css({"background-size":size+"px"})
    		let x1 = $(this).index();
    		let y1 = $(this).parents("tr").index();
    		y[y1][x1] = 1;
    		recordArr.push([y1,x1])

    		storage.setItem('arr',JSON.stringify(recordArr))

    		myMath(y)
    	}
    })
        
	btns(y)
	
})

function table(k){
	let str = ""
	for (let i = 0; i < k; i++) {
		str += "<tr>" 
		for (let j = 0; j < k; j++) {
			str+="<td></td>"
		}
		str += "</tr>"
	}
	$("table").html(str)
}

function canvas(x) {
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.strokeStyle="#000";
	for (let i = 0; i < 13 ; i++) {
		ctx.moveTo((x*i)+x/2,x/2);
		ctx.lineTo((x*i)+x/2,12*x+x/2);
		ctx.stroke();
	}
	for (let i = 0; i < 13 ; i++) {
		ctx.moveTo(x/2,x/2+(i*x));
		ctx.lineTo(12*x+x/2,(i*x)+x/2);
		ctx.stroke();
	}
	ctx.beginPath();
	ctx.fillStyle="#000"
	ctx.arc(x*3+x/2,x*3+x/2,x*0.1,0,2*Math.PI);
	ctx.fill();
    ctx.closePath()

	ctx.beginPath();
	ctx.fillStyle="#000"
	ctx.arc(x*9+x/2,x*3+x/2,x*0.1,0,2*Math.PI);
	ctx.fill();	
    ctx.closePath()

	ctx.beginPath();
	ctx.fillStyle="#000"
	ctx.arc(x*3+x/2,x*9+x/2,x*0.1,0,2*Math.PI);
	ctx.fill();	
    ctx.closePath()

	ctx.beginPath();
	ctx.fillStyle="#000"
	ctx.arc(x*9+x/2,x*9+x/2,x*0.1,0,2*Math.PI);
	ctx.fill();	
    ctx.closePath()

	ctx.beginPath();
	ctx.fillStyle="#000"
	ctx.arc(x*6+x/2,x*6+x/2,x*0.1,0,2*Math.PI);
	ctx.fill();	
    ctx.closePath();
}

function myMath(arr){
	function result(arr1) {
		for (let i = 0; i < arr1.length; i++) {
			let white = 1
			let black = 1
			for(let j = 0; j < arr1[i].length-1; j++){
				if(arr1[i][j]==0&&arr1[i][j]==arr1[i][j+1]){
					white++
				}else if(arr1[i][j]==1&&arr1[i][j]==arr1[i][j+1]){
					black++
				}
			}
			if(white>=5){
				alert("白棋胜")
				clear(arr)
			}else if(black>=5){
				alert("黑棋胜")
				clear(arr)
			}
		}
	}
	result(arr)//横排
	
	let y = []
	for (let i = 0; i < arr.length; i++) {
		let x =[]
		for (let j = 0; j < arr[i].length; j++) {
			x[j] = arr[j][i]
		}
		y[i] = x
	}
	result(y)//竖排

	let y1 = []
	for (let i = 0; i < arr.length; i++) {
		let x1 = []
		let x2 = []
		for (let j = i; j < arr.length; j++) {
			x1[j] = arr[j-i][j]
			x2[j] = arr[j][j-i]
		}
		y1.push(x1)
		y1.push(x2)
	}
	result(y1) //下斜

	let y2 = []
	for (let i = 0; i < arr.length; i++) {
		let x1 = []
		let x2 = []
		let x = 0
		
		for (let j = arr.length-1; j >=i; j--) {
			x1[j] = arr[j-i][x]
			x2[j] = arr[j][x+i]
			x++
		}
		y2.push(x1)
		y2.push(x2)
	}
	result(y2) //上斜
}

function btns(y){
	$("#clear").click(function () {
		clear(y)
	})
	$("#revocation").click(function () {
		var storage = window.sessionStorage
		let arr = JSON.parse(storage.getItem('arr'))

		let arr1 = arr.pop()
		storage.setItem('arr',JSON.stringify(arr))
		
		y[arr1[0]][arr1[1]] = -1
		$("table tr:eq("+arr1[0]+")> td:eq("+arr1[1]+")").removeClass()
	})
}
function clear(y){
	var storage = window.sessionStorage
	let arr = JSON.parse(storage.getItem('arr'))
	for (var i = 0; i < arr.length; i++) {
		y[arr[i][0]][arr[i][1]] = -1
		$("table tr:eq("+arr[i][0]+")> td:eq("+arr[i][1]+")").removeClass()
	}
	storage.setItem('arr','[]')
}