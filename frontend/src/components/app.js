import { storeRecord,getRecordsByFromField } from "./Database";
async function run() {
    // Insert records into IPFS
    await storeRecord({ from: "1", to: "2", amount: 4 });
    await storeRecord({ from: "1", to: "3", amount: 6 });
    await storeRecord({ from: "3", to: "2", amount: 7 });

    console.log('Current database CIDs:', database);

    // Retrieve and print all records where from = "1"
    console.log('Retrieving all records where from = "1":');
    const records = await getRecordsByFromField("1");

    for (const record of records) {
        console.log(record);
    }
}

run();
