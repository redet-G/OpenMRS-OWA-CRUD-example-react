import React, { Component } from "react";
import API from "../api";

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: this.props.uuid,
      name: this.props.name,
      description: this.props.description,
    };
    this.handelSubmit = this.handelSubmit.bind(this);
  }

  handelSubmit(e) {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      description: e.target.description.value,
    };

    API.item.create(data).then(() => {
      this.props.update();
      //   this.setState({ name: "", description: "" });
    });
    e.target.name.value = "";
    e.target.description.value = "";
  }

  render() {
    return (
      <div>
        {this.props.children}
        <form onSubmit={this.handelSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.name}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Description</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={this.state.description}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input type="submit" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default CreateItem;
