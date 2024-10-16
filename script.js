// Initialize state
let participants = ['You'];
let expenses = [];

// Select DOM elements
const participantForm = document.getElementById('participant-form');
const participantInput = document.getElementById('participant');
const participantsList = document.getElementById('participants-list');
const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const paidBySelect = document.getElementById('paidBy');
const expenseList = document.getElementById('expense-list');
const totalAmountSpan = document.getElementById('total-amount');
const perPersonAmountSpan = document.getElementById('per-person-amount');

// Add Participant
participantForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const participant = participantInput.value.trim();
    if (participant && !participants.includes(participant)) {
        participants.push(participant);
        participantInput.value = '';
        updateParticipantsList();
        updatePaidBySelect();
    }
});

// Add Expense
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const paidBy = paidBySelect.value;
    
    if (description && !isNaN(amount) && paidBy) {
        expenses.push({ description, amount, paidBy });
        descriptionInput.value = '';
        amountInput.value = '';
        updateExpensesList();
        updateTotalAndPerPerson();
    }
});

// Update Participants List
function updateParticipantsList() {
    participantsList.innerHTML = '';
    participants.forEach((participant) => {
        const li = document.createElement('li');
        li.textContent = participant;
        participantsList.appendChild(li);
    });
}

// Update Paid By Select
function updatePaidBySelect() {
    paidBySelect.innerHTML = '<option value="">Paid by</option>';
    participants.forEach((participant) => {
        const option = document.createElement('option');
        option.value = participant;
        option.textContent = participant;
        paidBySelect.appendChild(option);
    });
}

// Update Expenses List
function updateExpensesList() {
    expenseList.innerHTML = '';
    expenses.forEach((expense) => {
        const li = document.createElement('li');
        li.textContent = `${expense.description} - $${expense.amount.toFixed(2)} (Paid by ${expense.paidBy})`;
        expenseList.appendChild(li);
    });
}

// Update Total and Per Person Amount
function updateTotalAndPerPerson() {
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    const perPersonAmount = totalAmount / participants.length;
    totalAmountSpan.textContent = totalAmount.toFixed(2);
    perPersonAmountSpan.textContent = perPersonAmount.toFixed(2);
}

// Initial Setup
updateParticipantsList();
updatePaidBySelect();
