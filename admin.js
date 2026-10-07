// ==========================
// LOAD ADMIN DASHBOARD
// ==========================

function loadDashboard() {

    const data =
        getData();

    const waitingCustomers =
        getWaitingCustomers();

    const waitingCount =
        waitingCustomers.length;


    const estimatedTime =
        getEstimatedWaitingTime(
            waitingCount
        );


    const crowd =
        getCrowdStatus(
            waitingCount
        );


    document.getElementById(
        "adminCurrent"
    ).innerText =
        data.currentToken;


    document.getElementById(
        "adminWaiting"
    ).innerText =
        waitingCount;


    document.getElementById(
        "adminTime"
    ).innerText =
        estimatedTime + " min";


    document.getElementById(
        "adminCrowd"
    ).innerText =
        crowd;


    // Table

    const table =
        document.getElementById(
            "queueTable"
        );


    table.innerHTML = "";


    if (data.queue.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="5">
                    No customers in queue.
                </td>

            </tr>

        `;

        return;

    }


    data.queue.forEach(
        customer => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <strong>
                        #${customer.token}
                    </strong>
                </td>

                <td>
                    ${escapeAdminHTML(
                        customer.name
                    )}
                </td>

                <td>
                    ${escapeAdminHTML(
                        customer.service
                    )}
                </td>

                <td>
                    ${customer.time}
                </td>

                <td class="${
                    customer.status ===
                    "Waiting"
                        ? "status-waiting"
                        : "status-completed"
                }">

                    ${customer.status}

                </td>

            `;


            table.appendChild(row);

        }
    );

}


// ==========================
// NEXT CUSTOMER
// ==========================

function nextCustomer() {

    const data =
        getData();


    const next =
        data.queue.find(
            customer =>
                customer.status ===
                "Waiting"
        );


    if (!next) {

        showAdminMessage(
            "No waiting customer."
        );

        return;

    }


    next.status =
        "Completed";


    data.currentToken =
        next.token;


    saveData(data);


    showAdminMessage(
        "Token #" +
        next.token +
        " has been served."
    );


    loadDashboard();

}


// ==========================
// CLEAR QUEUE
// ==========================

function clearQueue() {

    const confirmation =
        confirm(
            "Are you sure you want to clear the complete queue?"
        );


    if (!confirmation) {

        return;

    }


    resetQueue();


    showAdminMessage(
        "Queue cleared successfully."
    );


    loadDashboard();

}


// ==========================
// MESSAGE
// ==========================

function showAdminMessage(
    message
) {

    const element =
        document.getElementById(
            "adminMessage"
        );


    if (element) {

        element.innerText =
            message;

    }

}


// ==========================
// HTML SAFETY
// ==========================

function escapeAdminHTML(
    value
) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==========================
// AUTO REFRESH
// ==========================

loadDashboard();

setInterval(
    loadDashboard,
    2000
);