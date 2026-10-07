const QUEUE_KEY = "queueless_queue_data";

function createDefaultData() {

    return {
        currentToken: 0,
        nextToken: 1,
        queue: []
    };

}


function getData() {

    const savedData =
        localStorage.getItem(QUEUE_KEY);

    if (!savedData) {

        const newData =
            createDefaultData();

        localStorage.setItem(
            QUEUE_KEY,
            JSON.stringify(newData)
        );

        return newData;
    }

    try {

        return JSON.parse(savedData);

    } catch (error) {

        const newData =
            createDefaultData();

        localStorage.setItem(
            QUEUE_KEY,
            JSON.stringify(newData)
        );

        return newData;
    }

}


function saveData(data) {

    localStorage.setItem(
        QUEUE_KEY,
        JSON.stringify(data)
    );

}


function addCustomer(name, service) {

    const data = getData();

    const token = data.nextToken;

    const customer = {

        token: token,

        name: name,

        service: service,

        status: "Waiting",

        time: new Date().toLocaleTimeString()

    };

    data.queue.push(customer);

    data.nextToken = token + 1;

    saveData(data);

    return customer;

}


function getWaitingCustomers() {

    const data = getData();

    return data.queue.filter(
        customer => customer.status === "Waiting"
    );

}


function getWaitingCount() {

    return getWaitingCustomers().length;

}


function getCrowdStatus(count) {

    if (count >= 10) {

        return "High";

    }

    if (count >= 5) {

        return "Medium";

    }

    return "Low";

}


function getEstimatedWaitingTime(count) {

    const averageServiceTime = 5;

    return count * averageServiceTime;

}


function resetQueue() {

    const newData =
        createDefaultData();

    saveData(newData);

}