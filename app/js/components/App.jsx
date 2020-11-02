/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from "react";
import Item from "./item/item";
import CreateItem from "./item/createItem";
import API from "./api";
import { hashHistory } from "react-router";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      isEditing: false,
    };
    this.fetchItems = this.fetchItems.bind(this);
    this.getItem = this.getItem.bind(this);
  }
  componentDidMount() {
    console.log("App component mounted.");
    API.checkLogin().then((res) => {
      if (res.data.authenticated) this.setState({ session: res.data });
      else hashHistory.push("/login");
    });
    this.fetchItems();
  }

  fetchItems() {
    API.items().then((res) => {
      const items = res.data.results;
      this.setState({ items: items });
      console.log(res.data);
    });
  }
  getItem() {
    if (this.state.isEditing) {
      let item = this.state.items.find(
        (item) => item.uuid == this.state.isEditing
      );

      return item;
    }
    return <span></span>;
  }
  render() {
    return (
      <div>
        <h1>Items</h1>
        <CreateItem update={this.fetchItems} />
        <h2>Items list</h2>
        <table>
          <tbody>
            {this.state.items.map((item) => (
              <Item
                key={item.uuid}
                uuid={item.uuid}
                name={item.name}
                description={item.description}
                update={this.fetchItems}
                onEdit={(uuid) => {
                  this.setState({ isEditing: uuid });
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
