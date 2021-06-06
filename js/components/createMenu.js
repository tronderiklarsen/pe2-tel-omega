import { getUsername } from "../utilities/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
    const container = document.querySelector(".admin-menu");

    const username = getUsername();

    let authLink = "";

    if (username) {
        authLink = `<div>
                        <a href="add.html">Add</a>
                        <a href="edit.html">Edit</a>
                    </div>
                    <div>
                        <button id="logout">Logout ${username}</button>
                    </div>`;
    }

    container.innerHTML = `${authLink}`

    logoutButton();
}