var config = {
	width: 550,
	height: 430,
	middleLineColor: "rgb(133,205,250)",
	axisX: {
		max: 50,
		points: [15, 20, 25, 30, 35, 40, 45, 50],
		min: 15
		
	},
	axisY: {
		max:3,
		min:0,
		middle: 2.2,
		points: [0, 1, 2, 3],
		points2:[
			{val:0, lbl:"0"},
			{val:0.6, lbl:"20"},
			{val:1.2, lbl:"40"},
			{val:1.8, lbl:"60"},
			{val:2.4, lbl:"80"},
			{val:3, lbl:"100%"}
		]
	},
	data: [
   		{
   			color: "rgb(102,217,2)",
   			label: "Менеджмент", 
   			id: "someid",
   			points: [
				{x: 18, y: 1.2,  percent:42}, 
				{x: 28.4, y: 2, percent: 70},
				{x: 40.4, y: 0.8, percent: 10}
   			]
   		},
   		{
   			color: "rgb(0,150,245)",
   			label: "Менеджер",
   			id: "someid2",
   			points: [{x: 28, y: 2.2, percent: 15}]
   		},
   		{
   			color: "rgb(241,220,45)",
   			label: "Программист",
   			id: "someid3",
   			points: [
				{x: 19 , y: 0.2, percent: 12}, 
				{x: 24, y:0.6, percent: 15}, 
				{x: 28, y:3, percent: 1}
   			]
   		}
   		
   ]
}







var Chart = function(elem, config) {

	svgNS = "http://www.w3.org/2000/svg"

	var container = document.querySelector(elem),
		mySvg = document.createElementNS(svgNS, "svg"),
		padding, minX, minY, maxX, maxY

	setSvg()
	drawGrid()
	render(config.data[0])


	function setSvg() {
		mySvg.setAttribute("version", "1.1")
		mySvg.setAttribute("baseProfile", "tiny")
		container.appendChild(mySvg)
	}

	function drawGrid() {
		padding = 30
		minX = padding
		minY = config.height - padding
		maxX = config.width - padding + 15
		maxY = padding

		drawAxisX(minX, minY, maxX, minY)
		addTicksX(config.axisX, minX, maxX, minY)
		addNumbersX(config.axisX, minX, maxX, minY)
		addNumbersYRight(config.axisY, maxX, minY, maxY)
		addNumbersYLeft(config.axisY, minX, minY, maxY, padding)
		drawLevels(config.axisY, minX, maxX, minY, maxY)


		// ! параметры собрать в один объект и передавать объект

	}

	function drawAxisX(x1, y1, x2, y2) {

	    var xLine = document.createElementNS(svgNS, "line")

	    xLine.setAttributeNS(null, "x1", x1)
	    xLine.setAttributeNS(null, "y1", y1)
	    xLine.setAttributeNS(null, "x2", x2)
	    xLine.setAttributeNS(null, "y2", y2)
	    xLine.setAttributeNS(null, "stroke", "grey")
	    
	    mySvg.appendChild(xLine)
	}

	function addTicksX(configX, minX, maxX, minY) {
		var pieces = configX.points.length-1,
			step = Math.round( (maxX - minX) / pieces ),
			x = minX-1,
			y = minY+11

		for(var i=0; i <= pieces; i++) {
			insertTick(x, y)
			x += step
		}

	}

	function insertTick(x, y) {
		var xTick = document.createElementNS(svgNS, "text")

		xTick.setAttributeNS(null, "x", x)
	    xTick.setAttributeNS(null, "y", y)
	    xTick.setAttributeNS(null, "fill", "grey")
	    xTick.textContent = '\''
	    
	    mySvg.appendChild(xTick)
	}

	function addNumbersX(configX, minX, maxX, minY) {
		var pieces = configX.points.length-1,
			step = Math.round( (maxX - minX) / pieces ),
			x = minX-7,
			y = minY+20,
			val

		for(var i=0; i <= pieces; i++) {
			val = configX.points[i]
			insertNumber(x, y, val)
			x += step
		}
	}

	function addNumbersYLeft(configY, minX, minY, maxY, padding) {
		var pieces = configY.points.length-1,
			step = Math.round( (maxY - minY) / pieces ),
			x = minX - padding/2,
			y = minY+step+4,
			val

		for(var i=1; i <= pieces; i++) {
			val = configY.points[i]
			insertNumber(x, y, val)
			y += step
		}
	}
	
	function insertNumber(x, y, val) {
		var number = document.createElementNS(svgNS, "text")

		number.setAttributeNS(null, "x", x)
	    number.setAttributeNS(null, "y", y)
	    number.setAttributeNS(null, "fill", "grey")
	    number.setAttributeNS(null, "font-size", "12px")
	    number.textContent = val
	    
	    mySvg.appendChild(number)

	}

	function addNumbersYRight(configY, maxX, minY, maxY) {
		var pieces = configY.points2.length-1,
			step = Math.round( (maxY - minY) / pieces ),
			x = maxX + 10,
			y = minY+4,
			val

		for(var i=0; i <= pieces; i++) {
			val = configY.points2[i].lbl
			insertNumber(x, y, val)
			y += step
		}
	}

	function drawLevels(configY, minX, maxX, minY, maxY) {

		var pieces = configY.points.length-1,
			step = Math.round( (maxY - minY) / pieces ),
			y = minY+step,
			color = config.middleLineColor

		for(var i=1; i <= pieces; i++) {
			val = configY.points[i]
			insertLine(minX, maxX, y, color)
			y += step
		}

	}

	function insertLine(x1, x2, y, color) {
		var horLine = document.createElementNS(svgNS, "line")

	    horLine.setAttributeNS(null, "x1", x1)
	    horLine.setAttributeNS(null, "y1", y)
	    horLine.setAttributeNS(null, "x2", x2)
	    horLine.setAttributeNS(null, "y2", y)
	    horLine.setAttributeNS(null, "stroke", color)
	    
	    mySvg.appendChild(horLine)
	}




	function update(obj) {

		// clear()
		render(obj)

	}

	function clear() {
		
	}

	function render(obj) {

		var mySvg = document.getElementsByTagName("svg")[0] // исправить, для случая нескольких графиков

		for(var i = 0, length = obj.points.length; i < length; i++) {
			var color = obj.color

			cx = getCoordinateX(obj.points[i].x)
			cy = getCoordinateY(obj.points[i].y)

			drawPath(obj)
			drawPoint(cx, cy, color, mySvg)
			// showValue(obj)
			// drawLabel(obj)

		}
	}

	function getCoordinateX(val) {
		return Math.round( ( (val - config.axisX.min)/(config.axisX.max - config.axisX.min) )*(maxX - minX) ) + padding
	}

	function getCoordinateY(val) {
		return minY - Math.round( (val/config.axisY.max)*(minY-padding) )
	}

	function drawPath(obj) {
		
	}

	function drawPoint(cx, cy, cColor, mySvg) {
		var circle = document.createElementNS(svgNS, "circle")

		circle.setAttributeNS(null, "cx", cx)
	    circle.setAttributeNS(null, "cy", cy)
	    circle.setAttributeNS(null, "r", "5")
	    circle.setAttributeNS(null, "fill", "#fff")
	    circle.setAttributeNS(null, "stroke", cColor);
		circle.setAttributeNS(null, "stroke-width", "2");
	    
	    mySvg.appendChild(circle)
	}


}


