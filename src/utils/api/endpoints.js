/**
 * @constructor
 * @param {number} userId - Id of current user
 */
export default function endPoints(userId) {
	this.url = 'http://localhost:3000/'
	this.userId = userId
	/**
	 *
	 * @returns {string}url to retrieve information from a user
	 */
	this.userInformations = () => this.url + 'user/' + this.userId
	/**
	 *
	 * @returns {string}url to retrieve a user's activity day by day with kilograms and calories
	 */
	this.userActivitys = () => this.url + 'user/' + this.userId + '/activity'
	/**
	 *
	 * @returns {string} url to retrieve the average sessions of a user per day. The week starts on Monday
	 */
	this.userAverageSessions = () => this.url + 'user/' + this.userId + '/average-sessions'
	/**
	 *
	 * @returns {string} url to retrieve a user's performance (energy, endurance, etc.)
	 */
	this.userPerformances = () => this.url + 'user/' + this.userId + '/performance'
}
