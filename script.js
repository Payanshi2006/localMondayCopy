
const form = document.getElementById("tableForm");
const input = document.getElementById("num");
const container = document.getElementById("tableContainer");
const message = document.getElementById("message");
const count = document.getElementById("count");
const clearBtn = document.getElementById("clearBtn");

const colors = [
    { bg: "#e2edff", border: "#b9d3ff" },
    { bg: "#ddf6ed", border: "#b4ead8" },
    { bg: "#eee5ff", border: "#d9c7ff" },
    { bg: "#ffead5", border: "#ffd2a8" },
    { bg: "#ffe0e8", border: "#ffbfd0" }
];

function showEmptyState() {
    container.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">∑</div>
            <h3>Ready to learn?</h3>
            <p>Enter a number above to generate your tables.</p>
        </div>
    `;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const n = Number(input.value);

    message.textContent = "";
    container.innerHTML = "";
    count.textContent = "";

    if (
        input.value.trim() === "" ||
        !Number.isInteger(n) ||
        n < 1 ||
        n > 100
    ) {
        message.textContent =
            "Please enter a whole number between 1 and 100.";
        showEmptyState();
        input.focus();
        return;
    }

    const fragment = document.createDocumentFragment();

    // Generate tables from 1 to n
    for (let i = 1; i <= n; i++) {
        const card = document.createElement("article");
        card.className = "table-card";

        const color = colors[(i - 1) % colors.length];

        card.style.setProperty("--card-color", color.bg);
        card.style.setProperty("--border-color", color.border);
        card.style.animationDelay =
            `${Math.min((i - 1) * 35, 350)}ms`;

        const heading = document.createElement("h3");
        heading.textContent = `Table of ${i}`;
        card.appendChild(heading);

        // Each table runs from 1 to 10
        for (let j = 1; j <= 10; j++) {
            const row = document.createElement("div");
            row.className = "table-row";

            const equation = document.createElement("span");
            equation.className = "equation";
            equation.textContent = `${i} × ${j}`;

            const equals = document.createElement("span");
            equals.className = "equals";
            equals.textContent = "=";

            const answer = document.createElement("span");
            answer.className = "answer";
            answer.textContent = i * j;

            row.append(equation, equals, answer);
            card.appendChild(row);
        }

        fragment.appendChild(card);
    }

    container.appendChild(fragment);

    count.textContent =
        `${n} table${n === 1 ? "" : "s"} generated`;

    document.getElementById("results").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// Clear button
clearBtn.addEventListener("click", function () {
    form.reset();
    message.textContent = "";
    count.textContent = "";

    showEmptyState();
    input.focus();
});
