describe ('API Testing reqres.in', () => {

const baseUrl = 'https://reqres.in/api';
const headers = {'x-api-key': 'reqres-free-v1'}

it('List User', () => {
cy.request({
      method: 'GET',
      url: `${baseUrl}/users?page=2`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('total', 12);
      expect(response.body).to.have.property('total_pages', 2);
    })
  });

it('Single User', () => {
cy.request({
      method: 'GET',
      url: `${baseUrl}/users/2`,
      headers: headers,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property('first_name', 'Janet');
      expect(response.body.data).to.have.property('email', 'janet.weaver@reqres.in');
    })
  });

  it('User Not Found', () => {
cy.request({
      method: 'GET',
      url: `${baseUrl}/users/23`,
      failOnStatusCode: false,
      headers: headers,
    }).then((response) => {
      expect(response.status).to.eq(404);
    })
  });
  
  it('Create User', () => {
cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: headers,
      body: { "name": "Hanni",
              "job" : "Wifehouse"
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include.keys('id', 'createdAt');
      expect(response.body.name).to.eq('Hanni');
    })
  });

it('Update User (PUT)', () => {
cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      headers: headers,
      body: { "name": "Minji",
              "job" : "Dancer"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include.keys('name', 'updatedAt');
      expect(response.body.name).to.eq('Minji');
    })
  });

it('Update User (PATCH)', () => {
cy.request({
      method: 'PATCH',
      url: `${baseUrl}/users/2`,
      headers: headers,
      body: { "name": "Haerin",
              "job" : "Cat"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include.keys('name', 'job');
      expect(response.body.job).to.eq('Cat');
    })
  });

it('Delete User', () => {
cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/2`,
      headers: headers,
      body: { "name": "Minji",
              "job" : "Dancer"
      }
    }).then((response) => {
      expect(response.status).to.eq(204);
    })
  });

  it('Register Successful', () => {
cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers: headers,
      body: { "email": "eve.holt@reqres.in",
              "password" : "bbangsaz"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include.keys('id', 'token');
      expect(response.body.token).to.eq('QpwL5tke4Pnpja7X4');
    })
  });

it('Register Unsuccessful', () => {
cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      failOnStatusCode: false,
      headers: headers,
      body: { "email": "minji.kim@newjeans.ador"
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Missing password');
    })
  });

it('Login Success', () => {
cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers: headers,
      body: { "email": "eve.holt@reqres.in",
              "password" : "cityslicka"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.token).to.eq('QpwL5tke4Pnpja7X4');
    })
  });

it('Login Unsuccess)', () => {
cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      failOnStatusCode: false,
      headers: headers,
      body: { "email": "pham.hanni@newjeans.ador"
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Missing password');
    })
  });

})
