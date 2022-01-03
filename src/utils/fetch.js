export default function CallApi(userId) {
	this.identity = () => fetch(`http://localhost:3000/user/${userId}`).then(res => res.json())
	this.performance = () => fetch(`http://localhost:3000/user/${userId}/performance`).then(res => res.json())
	this.activity = () => fetch(`http://localhost:3000/user/${userId}/activity`).then(res => res.json())
}
