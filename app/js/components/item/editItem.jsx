import React, { Component } from "react";
import API from "../api";

class EditItem extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.params);

    this.name = React.createRef();
    this.description = React.createRef();

    this.handelSubmit = this.handelSubmit.bind(this);
  }
  componentDidMount() {
    API.item.get(this.props.params.uuid).then((res) => {
      this.name.current.value = res.data.name;
      this.description.current.value = res.data.description;
    });
  }

  handelSubmit(e) {
    e.preventDefault();
    const data = {
      uuid: this.props.params.uuid,
      name: this.name.current.name.value,
      description: this.description.current.value,
    };
    API.item.update(data).then(() => {
      console.log("saved");
      window.location.href = "#/";
    });
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
                  <input type="text" id="name" name="name" ref={this.name} />
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
                    ref={this.description}
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

export default EditItem;
