let load = function () {
  // keys: ["firstName", "lastName", "customerID", "budgetCap", "balance"],
  chrome.storage.sync.get(["budgetCap", "balance"], function (data) {
    const budgetCap = data.budgetCap;
    const balance = data.balance;
    // const budgetCap = 100;
    // const balance = 51;
    // alert("loaded settings: budgetCap=" + budgetCap + ", balance=" + balance);

    if (window.location.href.includes("/s?")) {
      // alert("window.onload: search page");
      showSearchData(balance, budgetCap);
    } else {
      // alert("window.onload: item page");
      showItemData(balance, budgetCap);
    }
  });
};
window.onload = load;
setInterval(load, 3000);

function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

// ============= functions for Search page =============

function addExtensionNotifier() {
  let n = getElementByXpath(
    "/html/body/div[1]/div[2]/div[1]/div/div[1]/div/span[3]/div[2]/div[2]/span/div/div/h1/span"
  );
  if (n !== undefined) {
    let notifier = document.createElement("p");
    notifier.id = "notifiedId";
    notifier.innerText = "You are currently using ChaperONE!";
    notifier.style.padding = "12px";
    notifier.style.margin = "8px";
    notifier.style.backgroundColor = "rgba(201, 66, 127, 0.23";
    notifier.style.borderRadius = "10px";
    notifier.style.fontSize = "20px";

    n.parentElement.appendChild(notifier);
  }
}

function getPriceSearch(priceParentNode) {
  // let n = priceParentNode.children[1].children[1];
  // let nText = n.innerText;
  let nText = priceParentNode.children[1].innerText;
  // return parseInt(n.innerText.substring(0, nText.length - 2));
  return parseFloat(nText.substring(1));
}

function showSearchData(balance, budgetCap) {
  if (document.getElementById("notifiedId"))
    return;
  addExtensionNotifier();

  let resultClass = "a-price";
  let results = document.getElementsByClassName(resultClass);

  for (let i = 0; i < results.length; i++) {
    let result = results[i];
    if (result.classList.contains("a-text-price")) {
      continue; // This element describes a price that is wrong because of a sale
    }

    let price = getPriceSearch(result);
    // let percent = (price / budget) * 100;
    if (price >= balance) {
      let someParent =
        result.parentElement.parentElement.parentElement.parentElement.parentElement;
      someParent.style.backgroundColor = "rgba(250, 160, 60, 0.4)"; // background color of the card
      someParent.style.borderRadius = "10px";
      result.style.background = "orange";
    } else {
      result.style.background = "rgba(20, 190, 90, 0.5)";
    }
    result.style.padding = "6px";
    result.style.borderRadius = "10px";
    // Other ways to show price information: change the search result image, add an image overlay, add warning text
  }
}

// ============= functions for Item page =============

function disableCheckoutButton() {
  let b = document.getElementById("submit.add-to-cart");
  b.style.display = "none";
}

function getPriceItem(priceString) {
  if (priceString.includes(" - ")) {
    // The user hasn't selected a specific item, so a range of prices is displayed. Assume the highest price?
    return parseFloat(priceString.split(" - ")[1].substring(1));
  } else {
    // There's only once price displayed
    return parseFloat(priceString.substring(1));
  }
}

function showItemData(balance, budgetCap) {
  let warningElementItem = document.createElement("p");
  warningElementItem.id = "warningElementItem";
  warningElementItem.style.fontSize = "20px";
  warningElementItem.style.padding = "6px";
  warningElementItem.style.borderRadius = "10px";
  if (document.getElementById("warningElementItem"))
    return;

  let result = document.getElementById("priceblock_ourprice");
  if (result === null) {
    result = document.getElementById("priceblock_saleprice");
  }
  if (result === null) {
    return;
  }

  let price = getPriceItem(result.innerText);
  let percentOfBalance = (price / balance) * 100;
  let warningString = "";

  result.style.background = "pink";
  result.style.padding = "6px";
  result.style.borderRadius = "10px";
  if (price >= balance) {
    disableCheckoutButton();
    warningString =
      "Watch out! At $" +
      price +
      ", this item is " +
      Math.floor(percentOfBalance) +
      "% of your remaining balance. I think you should consider another option.";
    warningElementItem.style.background = "orange";
  } else {
    warningString =
      "At $" +
      price +
      ", this item is only " +
      Math.floor(percentOfBalance) +
      "% of your remaining balance. You're all good!";
    warningElementItem.style.background = "rgba(0, 200, 50, 0.4)";
  }
  warningElementItem.innerText = warningString;
  result.parentElement.parentElement.parentElement.parentElement.parentElement.appendChild(
    warningElementItem
  );
}
