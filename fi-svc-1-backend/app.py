from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app) 
client = MongoClient('mongodb://localhost:27017/')
db = client['financial_insights']
transactions_collection = db['transactions']

@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    transaction_data = request.json
    transactions_collection.insert_one(transaction_data)
    return jsonify({"message": "Transaction added successfully"}), 201

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
            'amount': int(doc['amount']),
            'category': doc['category']
        })
        total_amount += int(doc['amount'])

    return jsonify({
        'total_amount': total_amount,
        'insights_data': insights_data
    })

if __name__ == "__main__":
    app.run(debug=True)
