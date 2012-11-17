var Menu = function() {
	var list = document.querySelector('.menu'),
		listAll = list.getElementsByTagName('a')

	list.addEventListener( 'click', function(e){onChangeSelect(e)} )

	function onChangeSelect(e) {

		var elem = e.target,
			tag = elem.tagName.toLowerCase(),
			activeItem = document.querySelector('.selected'),
			data

		if(tag == 'span') {
			var selectedItem = elem.parentNode

			changeSelect(activeItem, selectedItem)

			var order = getOrder(selectedItem, listAll)
			
			if (config.data[order]) {
				data = config.data[order]
				console.log('data: ', data)
			}

			update(data)

		}

	}

	function changeSelect(activeItem, selectedItem) {
		activeItem.classList.remove('selected')
		selectedItem.setAttribute('class', 'selected')
	}

	function getOrder(item, itemsList) {
		for (var i = 0, length = itemsList.length; i < length; i++) {
			if (item == itemsList[i]) {
				return i
			}
		}
	}
	
}

