import React, { useState } from 'react';
import { Plus, X, DollarSign, Users, Receipt, CreditCard, Menu, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

const SplitEasyApp = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', paidBy: '' });
  const [participants, setParticipants] = useState(['You']);
  const [newParticipant, setNewParticipant] = useState('');
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  const addExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.paidBy) {
      setExpenses([{ ...newExpense, id: Date.now(), date: new Date().toISOString() }, ...expenses]);
      setNewExpense({ description: '', amount: '', paidBy: '' });
      setIsAddingExpense(false);
    }
  };

  const addParticipant = () => {
    if (newParticipant && !participants.includes(newParticipant)) {
      setParticipants([...participants, newParticipant]);
      setNewParticipant('');
    }
  };

  const calculateTotalSpend = () => {
    return expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Header */}
      <header className="bg-green-500 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <CreditCard className="mr-2" size={24} />
            <h1 className="text-2xl font-bold">SplitEasy</h1>
          </div>
          <Button variant="ghost" size="icon" className="text-white">
            <Menu size={24} />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Total Spend Section */}
        <Card className="bg-white shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700">Total Spend</h2>
              <p className="text-4xl font-bold text-green-500 mt-2">${calculateTotalSpend()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Activity History */}
        <Card className="bg-white shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-gray-700 flex items-center">
              <Activity size={20} className="mr-2 text-green-500" />
              Activity History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <AnimatePresence>
              {expenses.map((expense) => (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-between items-center mb-4 bg-gray-50 p-4 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-700">{expense.description}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()} • Paid by {expense.paidBy}
                    </div>
                  </div>
                  <span className="font-bold text-gray-800">${parseFloat(expense.amount).toFixed(2)}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      </main>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg"
        onClick={() => setIsAddingExpense(true)}
      >
        <Plus size={24} />
      </Button>

      {/* Add Expense Hover Screen */}
      <AnimatePresence>
        {isAddingExpense && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Add Expense</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsAddingExpense(false)}>
                  <X size={24} />
                </Button>
              </div>
              <div className="space-y-4">
                <Input
                  placeholder="Description"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                />
                <Input
                  type="number"
                  placeholder="Amount"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                />
                <select
                  className="w-full border rounded px-3 py-2 text-gray-700"
                  value={newExpense.paidBy}
                  onChange={(e) => setNewExpense({...newExpense, paidBy: e.target.value})}
                >
                  <option value="">Paid by</option>
                  {participants.map((participant, index) => (
                    <option key={index} value={participant}>{participant}</option>
                  ))}
                </select>
                <Button onClick={addExpense} className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Add Expense
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Participant Section (accessed via menu) */}
      {/* This would typically be in a side menu or separate screen */}
      <div className="hidden">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Add Participant</h2>
        <div className="flex space-x-2">
          <Input
            placeholder="Enter participant name"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={addParticipant} className="bg-green-500 hover:bg-green-600 text-white">
            <Plus size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplitEasyApp;
