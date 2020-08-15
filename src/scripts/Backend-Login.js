import axios from "axios";

const apiKey = "2bd1038ee3d1e80b049162f819c95140";

async function confirmLogin(firstName, lastName, accountId) {
  var account_id = "",
    first_name = "",
    last_name = "";
  const res = await axios.get(
    `http://api.reimaginebanking.com/customers/${accountId}?key=${apiKey}`
  );
  const account = res.data;
  account_id = account._id;
  first_name = account.first_name;
  last_name = account.last_name;

  const confirmation =
    account_id === accountId &&
    first_name === firstName &&
    last_name === lastName;
  return confirmation;
}

export { confirmLogin };
