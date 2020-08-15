import axios from "axios";

const apiKey = "";

async function getAccount(accountId, accountType) {
  const res = await axios.get(
    `http://api.reimaginebanking.com/accounts/${accountId}?key=${apiKey}`
  );
  const account = res.data;
  account.filter((account) => account.type === accountType);
  return account;
  // axios
  //   .get(`http://api.reimaginebanking.com/accounts/${accountId}?key=${apiKey}`)
  //   .then((res) => {
  //     var account = res.data;
  //     account.filter((account) => account.type === accountType);
  //   });
  // return account;
}

async function getBalance(accountId) {
  const res = await axios.get(
    `https://api.reimaginebanking.com/accounts/${accountID}?key=${apiKey}`
  );
  const balance = res.data;
  return response.balance;
  // axios
  // .get(`https://api.reimaginebanking.com/accounts/${accountID}?key=${apiKey}`)
  // .then((res) => {
  // var response = res.data;
  // return response.balance;
  // })
  // .catch((e) => {
  // console.log(e);
  // });
  //
  //  }
}

async function makeAccount(customerId, postData) {
  let res = axios.post(
    `http://api.reimaginebanking.com/customers/${accountId}?key=${apiKey}`
  );
  // axios
  //   .post(
  //     `http://api.reimaginebanking.com/customers/${accountId}?key=${apiKey}`
  //   )
  //   .then((res) => {
  //     const response = res.data;
  //     if (response.code === 404) {
  //       throw new Error(response.message);
  //     }
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
}

function makePurchase(accountId, postData) {
  let res = axios.post(
    `https://api.reimaginebanking.com/accounts/${accountID}/purchases?key=${apiKey}`,
    postData
  );
  // axios
  //   .post(
  //     `https://api.reimaginebanking.com/accounts/${accountID}/purchases?key=${apiKey}`,
  //     postData
  //   )
  //   .then((res) => {
  //     const response = res.data;
  //     if (response.code === 404) {
  //       throw new Error(response.message);
  //     }
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
}

function updateAccount(accountId, postData) {
  let res = axios.put(
    `http://api.reimaginebanking.com/accounts/${accountId}?key=${apiKey}`
  );
  // axios
  //   .put(`http://api.reimaginebanking.com/accounts/${accountId}?key=${apiKey}`)
  //   .then((res) => {
  //     const response = res.data;
  //     if (response.code === 404) {
  //       throw new Error(response.message);
  //     }
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
}

export { getAccount, getBalance, makeAccount, makePurchase };
