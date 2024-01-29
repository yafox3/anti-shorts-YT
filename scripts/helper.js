const $currentMinutes = document.querySelector('#current')

document.querySelector('#limit').addEventListener('change', function(e) {
	$currentMinutes.textContent = this.value + ' minutes'
})