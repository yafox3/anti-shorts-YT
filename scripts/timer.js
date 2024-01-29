class CountdownTimer {
	constructor(minutes = 1) {
		this.currentTime = Number(minutes) > 0 ? Number(minutes) : 1
		this.timer = document.createElement('div')

		this.#mount()
	}

	#mount() {
		this.timer.style.position = 'fixed'
		this.timer.style.top = '60px'
		this.timer.style.right = '70px'
		this.timer.style.color = '#cc0000'
		this.timer.style.fontSize = '18px'
		this.timer.style.fontWeight = '700'
		this.timer.id = 'timer'

		this.timer.textContent = this.currentTime + ' minutes left'

		document.querySelector('#end').insertAdjacentElement('afterbegin', this.timer)
	}

	#unmount() {
		this.timer.remove()
		window.location.href = 'https://youtube.com/'
	}

	#render() {
		this.timer.textContent = this.currentTime + ' minutes left'
	}

	start() {
		const countdown = setInterval(() => {
			if (this.currentTime > 1) {
				this.currentTime--
			} else {
				this.stop()
				clearInterval(countdown)
			}

			this.#render()
		}, 60000)
	}

	stop() {
		this.#unmount()
		this.currentTime = 0 // for stopping the timer
	}
}

let countdownTimer;

const observer = new MutationObserver(async () => {
	const $timer = document.querySelector('#timer')

	if (!window.location.href.includes('shorts')) {
		countdownTimer && countdownTimer.stop()
		return
	}

	if ($timer) {
		return
	}

	const { limit: minutes } = await chrome.storage.local.get(['limit'])
 	countdownTimer = new CountdownTimer(minutes)

	countdownTimer.start()
})

observer.observe(document.body, { attributes: true, childList: true, characterData: true })
