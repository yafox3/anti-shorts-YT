document.addEventListener('DOMContentLoaded', () => {
	const $currentMinutes = document.querySelector('#current')
	const $limitRange = document.querySelector('#limit')

	// sync local value with storage
	chrome.storage.local.get(['limit']).then(({ limit }) => {
		$limitRange.value = limit
		$currentMinutes.textContent = limit + ' minutes'
	})

	$limitRange.addEventListener('change', function () {
		chrome.storage.local.set({ limit: this.value }).then(async () => {
			const { limit } = await chrome.storage.local.get(['limit'])
			this.value = limit
		})

		$currentMinutes.textContent = this.value + ' minutes'
	})
})
