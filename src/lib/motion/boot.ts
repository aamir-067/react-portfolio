// Coordinates the one-time boot veil with the hero entrance.
let revealed = false;
const callbacks: Array<() => void> = [];

export function onBootReveal(callback: () => void) {
	if (revealed) {
		callback();
		return;
	}
	callbacks.push(callback);
}

export function signalBootReveal() {
	if (revealed) return;
	revealed = true;
	callbacks.splice(0).forEach((cb) => cb());
}
