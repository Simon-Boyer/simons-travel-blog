#! /usr/bin/env node

const sgClient = require('@sendgrid/client');
sgClient.setApiKey(process.env.SENDGRID_API_KEY);

const data = {
    name: 'Blog Simon',
    send_to: {
        list_ids: ['de8ca425-5ab0-4d10-a0cd-27a8cf77bfdc']
    },
    email_config: {
      sender_id: 4441360,
      design_id: 'b983dfb7-42fe-4172-a5f5-e2d07b92dfb2',
      suppression_group_id: 212357
    }
  };
  
const request = {
    url: '/v3/marketing/singlesends',
    method: 'POST',
    body: data
}
  
sgClient.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
    sgClient.request({
      url: `/v3/marketing/singlesends/${response.body.id}/schedule`,
      method: 'PUT',
      body: {
        send_at: 'now'
      }
    }).then(([response, body]) => {
      console.log(response.statusCode);
      console.log(response.body);
    })
    .catch(error => {
      console.error(error.response.body.errors);
    });
  })
  .catch(error => {
    console.error(error.response.body.errors);
  });