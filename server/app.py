from flask_cors import CORS
from flask import request, render_template
from flask import Flask, jsonify, request, session, make_response
from flask_restful import Api, Resource, reqparse
from models import User, Charity, Admin, Beneficiary, Inventory, db
from werkzeug.security import generate_password_hash, check_password_hash
from marshmallow import Schema, fields, ValidationError, validates
from flask_migrate import Migrate
from datetime import datetime
import os
from flask_bcrypt import Bcrypt

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///charity.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key='qwwerrtyyu123'
migrate = Migrate(app, db)

bcrypt = Bcrypt(app)
db.init_app(app)
api = Api(app)
CORS(app,supports_credentials=True)


class SignUpResource(Resource):
    def post(self):
        data = request.json

        # Validate required fields
        required_fields = ['full_name', 'username', 'email', 'password', 'image_url', 'user_type']
        for field in required_fields:
            if field not in data:
                return {'message': f'{field} is required'}, 400
        # Check if the username or email is already taken
        if User.query.filter((User.username == data['username']) | (User.email == data['email'])).first():
            return {'message': 'Username or email already taken'}, 400

        # Validate password length
        if len(data['password']) < 6:
            return {'message': 'Password must be at least 6 characters long'}, 400
        

        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

        new_user = User(
            full_name=data['full_name'],
            username=data['username'],
            email=data['email'],
            _password_hash=hashed_password,
            image_url=data['image_url'],
            user_type=data['user_type'],
            approval_status='Pending' if data['user_type'] == 'Charity' else 'Approved'
        )

        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.id

        if data['user_type'] == 'Donor':
            return {'message': 'Signup successful'}, 200
        elif data['user_type'] == 'Charity':
            return {'message': 'Your request has been received and will be processed by the admins soon.'}, 200
class LoginResource(Resource):
    def post(self):
        data = request.json

        # Validate required fields
        required_fields = ['email', 'user_type', 'password']
        for field in required_fields:
            if field not in data:
                return {'message': f'{field} is required'}, 400

        # Find the user by email and user type
        user = User.query.filter_by(email=data['email'], user_type=data['user_type']).first()

        if user and bcrypt.check_password_hash(user._password_hash, data['password']):
            if user.approval_status == 'Approved':
                session['user_id'] = user.id
                return {'message': 'Login successful'}, 200
            else:
                return {'message': 'Account is pending approval or not approved yet.'}, 401
        else:
            return {'message': 'Invalid email, user type, or password'}, 401
class SessionResource(Resource):
    def get(self):
        user_id = session.get('user_id')
        if session.get('user_id'):
            user = User.query.filter(User.id==session["user_id"]).first()
            return user.to_dict(), 200
        return {"error":"Resource not found"}

class DonorsResource(Resource):
    def get(self):
        charities = Charity.query.all()
        charity_list = [{"id": charity.id, "name": charity.name, "description": charity.description, "donation_amount": charity.donation_amount, "stories": charity.stories, "image_url": charity.image_url, "posted_at": charity.posted_at} for charity in charities]
        return jsonify(charities=charity_list)

class CharitiesResource(Resource):
    def get(self):
        charities = Charity.query.all()
        charity_list = [{"id": charity.id, "name": charity.name, "description": charity.description, "donation_amount": charity.donation_amount, "stories": charity.stories, "image_url": charity.image_url, "posted_at": charity.posted_at} for charity in charities]
        return jsonify(charities=charity_list)
    
    
    def post(self):
        data = request.get_json()

        new_charity = Charity(
            name=data.get('name'),
            description=data.get('description'),
            stories=data.get('stories'),
            image_url=data.get('image_url'),
            posted_at=datetime.utcnow(),
            user_id=data.get('user_id'),
            paypal=data.get('paypal'),
            bank=data.get('bank'),
            mpesa=data.get('mpesa'),
            skrill=data.get('skrill'),
        )
        db.session.add(new_charity)
        db.session.commit()
   
        new_beneficiary = Beneficiary(
            name=data.get('beneficiary_name'),
            image_url=data.get('beneficiary_image_url'),
            stories=data.get('beneficiary_stories'),
            charity_id=new_charity.id
        )
        db.session.add(new_beneficiary)
        db.session.commit()

        return {'message': 'Data posted successfully'}
class CharityDetailsResource(Resource):
    def get(self, charity_id):
        charity = Charity.query.get(charity_id)
        
        if charity:
            
            return jsonify({
                "id": charity.id,
                "name": charity.name,
                "description": charity.description,
                "donation_amount": charity.donation_amount,
                "stories": charity.stories,
                "image_url": charity.image_url,
                "posted_at": charity.posted_at.isoformat(),
                "paypal": charity.paypal,
                "bank": charity.bank ,
                "mpesa": charity.mpesa ,
                "skrill": charity.skrill,
                
            })
        else:
            return jsonify({"error": "Charity not found"}), 404
        
class CharityRequestsResource(Resource):
    def get(self):
        charity_requests = Charity.query.filter_by(approved=False).all()
        requests_data = [
            {
                'id': request.id,
                'name': request.name,
                'description': request.description,
                # ... other relevant fields ...
            }
            for request in charity_requests
        ]
        return jsonify(charityRequests=requests_data)

    def put(self, charity_id):
        data = request.json
        action = data.get('action')

        charity = Charity.query.get(charity_id)

        if charity:
            if action == 'approve':
                charity.approved = True
                db.session.commit()
                return {'message': 'Charity account approved successfully'}
            elif action == 'delete':
                db.session.delete(charity)
                db.session.commit()
                return {'message': 'Charity account deleted successfully'}
            else:
                return {'message': 'Invalid action'}, 400
        else:
            return {'message': 'Charity not found'}, 404

class NewsResource(Resource):
    def get(self):
        news = Admin.query.all()
        news_data = [
            {
                'id': item.id,
                'news_title': item.news_title,
                'news_image': item.news_image,
                'news_text': item.news_text,
                'created_at': item.created_at,
                'charity_id': item.charity_id
            }
            for item in news
        ]
        return jsonify(news=news_data)
class ApprovalRequestsResource(Resource):
    def get(self):
        pending_requests = User.query.filter_by(approval_status='Pending').all()
        requests_data = [
            {
                'userId': user.id,
                'full_name': user.full_name,
                'userType': user.user_type,
                'email': user.email,
            }
            for user in pending_requests
        ]
        return {'requests': requests_data}, 200

    def put(self, user_id=None):
        if user_id is None:
            return {'message': 'User ID is required for PUT request'}, 400

        data = request.json
        action = data.get('action')

        user = db.session.query(User).get(user_id)

        if user:
            if action == 'approve':
                user.approval_status = 'Approved'
                db.session.commit()
                return {'message': 'User account approved successfully'}, 200
            elif action == 'delete':
                db.session.delete(user)
                db.session.commit()
                return {'message': 'User account deleted successfully'}, 200
            else:
                return {'message': 'Invalid action'}, 400
        else:
            return {'message': 'User not found'}, 404






api.add_resource(SignUpResource, '/signup')
api.add_resource(LoginResource, '/login')
api.add_resource(DonorsResource,'/donorh')
api.add_resource(CharityDetailsResource, '/donorh/<int:charity_id>')
api.add_resource(CharitiesResource,'/charityh')
api.add_resource(CharityRequestsResource, '/charity-requests/<int:charity_id>')
api.add_resource(NewsResource, '/news')
api.add_resource(ApprovalRequestsResource, '/approval-requests/<int:user_id>/', '/approval-requests/', strict_slashes=False)




if __name__ == '__main__':
    
    app.run(port=5555, debug=True)