import { DBClient } from "../utility/databaseClient";

export class DBoperation {
    constructor () {}
     
    async executeQuery(queryString: string, values: unknown[]) {
        const client = await DBClient();
        await client.connect();
        const result = await client.query(queryString, values);
        await client.end();
        return result
    }

    async executeQuerystring(queryString: string) {
        const client = await DBClient();
        await client.connect();
        const result = await client.query(queryString);
        console.log("result", result.rows)
        await client.end();
        return result
    }
}