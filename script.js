
let stocks = JSON.parse(localStorage.getItem("stocks") || "[]");

const form = document.getElementById("stockForm");
const stockList = document.getElementById("stockList");

function saveStocks() {
    localStorage.setItem("stocks", JSON.stringify(stocks));
}

function displayStocks() {
    stockList.innerHTML = "";

    let totalInvestment = 0;
    let totalValue = 0;

    stocks.forEach((stock, index) => {
        let investment = stock.shares * stock.purchasePrice;
        let value = stock.shares * stock.currentPrice;
        let profit = value - investment;

        totalInvestment += investment;
        totalValue += value;

        const row = document.createElement("tr");

        const tickerCell = document.createElement("td");
        tickerCell.textContent = stock.ticker;

        const sharesCell = document.createElement("td");
        sharesCell.textContent = stock.shares;

        const profitCell = document.createElement("td");
        profitCell.textContent = "$" + profit.toFixed(2);
        profitCell.className = profit >= 0 ? "positive" : "negative";

        const actionCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeStock(index));
        actionCell.appendChild(removeButton);

        row.append(tickerCell, sharesCell, profitCell, actionCell);
        stockList.appendChild(row);
    });

    const totalProfit = totalValue - totalInvestment;

    document.getElementById("investment").textContent =
        totalInvestment.toFixed(2);

    document.getElementById("value").textContent =
        totalValue.toFixed(2);

    const profitElement = document.getElementById("profit");
    profitElement.textContent = totalProfit.toFixed(2);
    profitElement.className =
        totalProfit >= 0 ? "positive" : "negative";
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const ticker = document.getElementById("ticker").value.trim().toUpperCase();
    const shares = Number(document.getElementById("shares").value);
    const purchasePrice = Number(document.getElementById("purchasePrice").value);
    const currentPrice = Number(document.getElementById("currentPrice").value);

    if (!ticker || !Number.isFinite(shares) || shares <= 0 ||
        !Number.isFinite(purchasePrice) || purchasePrice < 0 ||
        !Number.isFinite(currentPrice) || currentPrice < 0) {
        alert("Please enter valid stock information.");
        return;
    }

    stocks.push({
        ticker,
        shares,
        purchasePrice,
        currentPrice
    });

    saveStocks();
    displayStocks();
    form.reset();
});

function removeStock(index) {
    stocks.splice(index, 1);
    saveStocks();
    displayStocks();
}

displayStocks();
