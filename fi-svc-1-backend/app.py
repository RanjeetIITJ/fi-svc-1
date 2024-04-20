
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime  # Import datetime module for date handling

app = Flask(__name__)
CORS(app) 
client = MongoClient('mongodb://localhost:27017/')
db = client['financial_insights']
transactions_collection = db['transactions']

# Define the schema for the transactions collection
transaction_schema = {
    'date': datetime.now(),  # Date of the transaction (type: datetime)
    'amount': 0.0,  # Amount of the transaction (type: float)
    'category': '',  # Category of the transaction (type: string)
    'description': '',  # Description of the transaction (type: string)
    'email': ''  # Email of the user associated with the transaction (type: string)
}


# The transaction APi to store the transactions in DB
@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    # Validate and extract transaction data from the request
    transaction_data = request.json
    # Ensure all required fields are present
    print('transaction data',transaction_data)
    if all(key in transaction_data for key in transaction_schema):
        transactions_collection.insert_one(transaction_data)
        return jsonify({"message": "Transaction added successfully"}), 201
    else:
        return jsonify({"error": "Incomplete transaction data"}), 400

@app.route('/api/insights', methods=['GET'])
def get_insights():
    category = request.headers.get('category')
    email = request.headers.get('email')
    matching_documents = transactions_collection.find({'email': email, 'category': category})
    insights_data = []
    total_amount = 0
    for doc in matching_documents:
        insights_data.append({
            'date': doc['date'],
            'amount': float(doc['amount']),  # Convert amount to float
            'category': doc['category']
        })
        total_amount += float(doc['amount'])  # Convert amount to float

    return jsonify({
        'total_amount': total_amount,
        'insights_data': insights_data
    })

if __name__ == "__main__":
    app.run(debug=True)
