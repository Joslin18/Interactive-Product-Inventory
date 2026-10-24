const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("--- Initializing Inventory System ---");

const inventory = [
    { name: "Laptop", price: 800 },
    { name: "Mouse", price: 25 }
];

rl.question("Enter Product Name: ", (productName) => {
    rl.question("Enter Product Price: ", (priceInput) => {

        const productPrice = Number(priceInput);

        if (!productName.trim() || isNaN(productPrice) || productPrice <= 0) {
            console.log("\nInvalid product details entered.");
            rl.close();
            return;
        }

        inventory.push({
            name: productName,
            price: productPrice
        });

        function getCategory(price) {
            if (price < 100) {
                return "Budget";
            } else if (price < 500) {
                return "Standard";
            } else {
                return "Premium";
            }
        }

        console.log("\n--- Processing Inventory Roster (forEach) ---");

        inventory.forEach(item => {
            console.log(
                `* Item: ${item.name} ($${item.price}) -> Category: ${getCategory(item.price)}`
            );
        });

        function calculateTotalValue(items) {
            let total = 0;

            for (let i = 0; i < items.length; i++) {
                total += items[i].price;
            }

            return total;
        }

        const applyTax = (amount, taxRate = 0.18) => {
            return amount + amount * taxRate;
        };

        const totalInventoryValue = calculateTotalValue(inventory);

        const affordableItems = inventory
            .filter(item => item.price < 200)
            .map(item => item.name);

        const formattedReport = inventory.map(item =>
            `${item.name.toUpperCase()}: $${item.price}`
        );

        let foundItem = null;

        for (let i = 0; i < inventory.length; i++) {
            if (!inventory[i].name) {
                continue;
            }

            if (inventory[i].price > 100) {
                foundItem = inventory[i];
                break;
            }
        }

        console.log("\n--- Financial Analytics ---");

        console.log(`Total Inventory Value: $${totalInventoryValue}`);

        console.log(
            `Inventory Value With Tax (18%): $${applyTax(totalInventoryValue).toFixed(2)}`
        );

        console.log(
            `Filtered Affordable Items (Under $200): ${JSON.stringify(affordableItems)}`
        );

        console.log(
            `Formatted Report List: ${JSON.stringify(formattedReport)}`
        );

        console.log("\n--- Search Result ---");

        if (foundItem) {
            console.log(
                `First Product Above $100: ${foundItem.name} ($${foundItem.price})`
            );
        }

        console.log("\n--- Project Completed Successfully ---");

        rl.close();
    });
});