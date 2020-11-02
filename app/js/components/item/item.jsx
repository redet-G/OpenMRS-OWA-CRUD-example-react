import React, { Component } from "react";
import API from "../api";
import axios from "axios";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      description: this.props.description,
      uuid: this.props.uuid,
    };
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {}

  deleteItem(e) {
    API.item.delete(this.state.uuid).then(() => {
      this.props.update();
    });
  }

  render() {
    return (
      <tr key={this.state.uuid}>
        <td>{this.state.name}</td>
        <td>{this.state.description}</td>
        <td>
          <a href={"#/Edit/" + this.state.uuid}>
            <button>edit</button>
          </a>
        </td>
        <td>
          <button
            key={this.props.uuid}
            data-uuid={this.props.uuid}
            onClick={this.deleteItem}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Item;
