const chai = require('chai');
chai.use(require('chai-json-schema'));
const supertest = require('supertest');
const schema = require('../json_schema/schema.json');
const rootApi = supertest(`https://api.punkapi.com/v2/`);


const data = [20,5,1];

describe(`Testing Funk Api`, () => {

    data.forEach((page) => {
    
            beforeEach(async() => {
                const response = await rootApi.get(`beers/?page=2&per_page=${page}`).send();
            });
    
            it(`Assertion beers`, async function() {
                const response = await rootApi.get(`beers`).send();
                let lengthData = response.body.length;
                
                chai.expect(response.body).to.be.jsonSchema(schema);
                chai.expect(response.status).to.eql(200);
                chai.expect(response.body.length).to.eql(25);
                for (let index = 0; index < lengthData; index++) {
                    console.log(response.body[index].name);
                }
            });
    });
});