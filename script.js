// ==========================
// LOGIN
// ==========================

function login() {

    const usernameElement =
        document.getElementById("username");

    const roleElement =
        document.getElementById("role");

    const messageElement =
        document.getElementById("loginMessage");


    const username =
        usernameElement.value.trim();

    const role =
        roleElement.value;


    if (username === "") {

        messageElement.innerText =
            "Please enter your name.";

        return;

    }


    localStorage.setItem(
        "queueLessUser",
        username
    );


    if (role === "admin") {

        window.location.href =
            "admin.html";

    } else {

        window.location.href =
            "user.html";

    }

}


// ==========================
// JOIN QUEUE
// ==========================

function joinQueue() {

    const nameElement =
        document.getElementById(
            "customerName"
        );

    const serviceElement =
        document.getElementById(
            "service"
        );

    const tokenBox =
        document.getElementById(
            "tokenBox"
        );


    if (!nameElement || !serviceElement) {

        return;

    }


    const name =
        nameElement.value.trim();

    const service =
        serviceElement.value;


    if (name === "") {

        alert("Please enter your name.");

        nameElement.focus();

        return;

    }


    // Add customer to database
    const customer =
        addCustomer(
            name,
            service
        );


    // Number of people before this customer
    const data =
        getData();


    const waitingBeforeCustomer =
        data.queue.filter(
            item =>
                item.status === "Waiting" &&
                item.token < customer.token
        ).length;


    const waitingTime =
        getEstimatedWaitingTime(
            waitingBeforeCustomer
        );


    // Show token
    tokenBox.innerHTML = `

        <div class="token-result">

            <div class="big-token">
                #${customer.token}
            </div>

            <h2>🎟️ Your Digital Token</h2>

            <p>
                <strong>Name:</strong>
                ${escapeHTML(customer.name)}
            </p>

            <p>
                <strong>Service:</strong>
                ${escapeHTML(customer.service)}
            </p>

            <p>
                <strong>Waiting Time:</strong>
                ${waitingTime} minutes
            </p>

            <p class="waiting">
                Status: Waiting
            </p>

        </div>

    `;


    // Disable button
    const button =
        document.getElementById(
            "tokenButton"
        );

    button.innerText =
        "Token Generated ✓";

    button.disabled = true;


    updateUserStatus();

}


// ==========================
// USER STATUS
// ==========================

function updateUserStatus() {

    const data =
        getData();

    const waitingCount =
        getWaitingCount();


    const currentToken =
        document.getElementById(
            "currentToken"
        );

    const totalPeople =
        document.getElementById(
            "totalPeople"
        );

    const crowdStatus =
        document.getElementById(
            "crowdStatus"
        );


    if (currentToken) {

        currentToken.innerText =
            data.currentToken;

    }


    if (totalPeople) {

        totalPeople.innerText =
            waitingCount;

    }


    if (crowdStatus) {

        crowdStatus.innerText =
            getCrowdStatus(
                waitingCount
            );

    }

}


// ==========================
// HTML SAFETY
// ==========================

function escapeHTML(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==========================
// AUTO UPDATE
// ==========================

setInterval(
    updateUserStatus,
    2000
);


// Initial update

if (
    document.getElementById(
        "totalPeople"
    )
) {

    updateUserStatus();

}