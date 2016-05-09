import Backbone		from 'backbone';
import HomeTemplate	from '../templates/home.hbs';

/**
 * Represent the page "Home".
 * In this page, the user can chose if he wants to add and event/action or list created bots.
 */
class HomeView extends Backbone.View {
	/**
	 * Create an instance of HomeView
	 */
	constructor() {
		super({});
	}

	/**
	 * Called when the page need to be rendered.
	 */
	render() {
		this.$el.html(HomeTemplate());
	}
}

export default HomeView;
