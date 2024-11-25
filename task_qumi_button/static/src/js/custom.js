/** @odoo-module */
import { registry} from '@web/core/registry';
import { useService } from "@web/core/utils/hooks";
const { Component, mount} = owl

export class AdvancedDashboard extends Component {
	setup(){
    	this.action = useService("action");
		this.orm = useService("orm");
	}

	async loadData(){
		await this.orm.call('task_qumi_button.student', 'get_values', [], {})
		const salamMessage = document.getElementById('new_action');
		salamMessage.textContent = 'Print in log Check it';

	}

	showSalam() {
        const salamMessage = document.getElementById('new_massage');
        salamMessage.textContent = 'salam';
    }

}
AdvancedDashboard.template = "client_action.advanced_dashboard"
registry.category("actions").add("advanced_dashboard", AdvancedDashboard)

