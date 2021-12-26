export default class {
	constructor(name, parent, parent_entry_pos) {
		this.name = name;
		this.parent = parent;
		this.parent_entry_position = parent_entry_pos;
		this.symbol_table = null;
	}
}