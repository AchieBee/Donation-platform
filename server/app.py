from flask_cors import CORS
from flask import session
from flask_mail import Mail, Message
from flask import request, render_template
from flask import Flask, jsonify, request, session, make_response
from flask_restful import Api, Resource, reqparse
from models import User, Charity, Admin, Beneficiary, Inventory, News, db
from werkzeug.security import generate_password_hash, check_password_hash
from marshmallow import Schema, fields, ValidationError, validates
from flask_migrate import Migrate
from datetime import datetime
from dotenv import load_dotenv
from cloudinary.uploader import upload
from cloudinary import CloudinaryImage, config, uploader
import os
from flask_bcrypt import Bcrypt

load_dotenv()
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://charity:4890@localhost/charity'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key='qwwerrtyyu123'
migrate = Migrate(app, db)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587 
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'nesemere55@gmail.com'
app.config['MAIL_PASSWORD'] = 'ijdmwcmwxmwmunmr'
app.config['MAIL_DEFAULT_SENDER'] = 'nesemere55@gmail.com'
CLOUDINARY_CLOUD_NAME='dwvsqbfsm'
CLOUDINARY_API_KEY='992648586995818'
CLOUDINARY_API_SECRET='2k96pHdmkZyDT0IKTSfTbIQBKto'

bcrypt = Bcrypt(app)
mail = Mail(app)
db.init_app(app)
api = Api(app)
CORS(app,supports_credentials=True)
config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

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

        required_fields = ['email', 'user_type', 'password']
        for field in required_fields:
            if field not in data:
                return {'message': f'{field} is required'}, 400

        user = User.query.filter_by(email=data['email'], user_type=data['user_type']).first()
        admin = Admin.query.filter_by(email=data['email']).first()

        if user and bcrypt.check_password_hash(user._password_hash, data['password']):
            if user.approval_status == 'Approved':
                session['user_id'] = user.id
                response = make_response({'message': 'Login successful'}, 200)
                response.set_cookie('user_id', str(user.id))
                return response
            else:
                return {'message': 'Account is pending approval or not approved yet.'}, 401
        elif admin and bcrypt.check_password_hash(admin._password_hash, data['password']):
            session['admin_id'] = admin.id
            response = make_response({'message': 'Login successful'}, 200)
            response.set_cookie('admin_id', str(admin.id))
            return response
        else:
            return {'message': 'Invalid email, user type, or password'}, 401
class SessionResource(Resource):
    def get(self):
        user_id = session.get('user_id')
        admin_id = session.get('admin_id')

        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        elif admin_id:
            admin = Admin.query.filter(Admin.id == admin_id).first()
            return admin.to_dict(), 200
        else:
            return {"error": "Resource not found"}, 404
class AdminProfileResource(Resource):
    def get(self):
        admin_id = session.get('admin_id')

        if admin_id:
            admin = Admin.query.filter(Admin.id == admin_id).first()
            if admin:
                return admin.to_dict(), 200
            else:
                return {"error": "Admin not found in the database"}, 404
        else:
            return {"error": "Admin ID not found in the session"}, 404
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
            paypal_email=data.get('paypal_email'),
            paypal_no=data.get('paypal_no'),
            bank_no=data.get('bank_no'),
            acc_name=data.get('acc_name'),
            mpesa_paybill=data.get('mpesa_paybill'),
            mpesa_acc=data.get('mpesa_acc'),
            skrill_country=data.get('skrill_country'),
            skrill_name=data.get('skrill_name'),
            phone_no=data.get('phone_no'),
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
                "paypal_email": charity.paypal_email,
                "paypal_no": charity.paypal_no,
                "bank_no": charity.bank_no,
                "acc_name": charity.acc_name ,
                "mpesa_paybill": charity.mpesa_paybill,
                "mpesa_acc": charity.mpesa_acc,
                "skrill_country": charity.skrill_country,
                "skrill_name": charity.skrill_name,
                "phone_no": charity.phone_no
                
            })
        else:
            return jsonify({"error": "Charity not found"}), 404

     
class CharityRequestsResource(Resource):
    def put(self, charity_id):
        data = request.json
        action = data.get('action')

        charity = Charity.query.get(charity_id)

        if charity:
            user = User.query.get(charity.user_id)  
            if action == 'approve':
                charity.approved = True
                db.session.commit()
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
        news = News.query.all()
        news_data = [
            {
                'id': item.id,
                'news_title': item.news_title,
                'news_image': item.news_image,
                'news_text': item.news_text,
                'created_at': item.created_at
            }
            for item in news
        ]
        return jsonify(news=news_data)
    
    def post(self):
        data = request.get_json()

        new_news = News(
            news_title = data.get('news_title'),
            news_text = data.get('news_text'),
            news_image = data.get('news_image'),
        )
        db.session.add(new_news)
        db.session.commit()

        return ({'message': 'News added successfully'}), 201
    
class AddAdminResource(Resource):
    def post(self):
        data = request.get_json()
        
        required_fields = ['fullname','email', 'password', 'image_url']
        for field in required_fields:
            if field not in data:
                return {'message': f'{field} is required'}, 400
        if Admin.query.filter((Admin.fullname == data['fullname']) | (Admin.email == data['email'])).first():
            return {'message': 'Fullname or email already taken'}, 400
        if len(data['password']) < 6:
            return {'message': 'Password must be at least 6 characters long'}, 400
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_admin = Admin(
            fullname=data['fullname'],
            email=data['email'],
           _password_hash=hashed_password,
            image_url=data['image_url'],
        )
        db.session.add(new_admin)
        db.session.commit()
        return {'message': 'Data posted successfully'}
    
class AdminLoginResource(Resource):
    def post(self):
        data = request.json

        required_fields = ['email', 'password']
        for field in required_fields:
            if field not in data:
                return {'message': f'{field} is required'}, 400

        admin = Admin.query.filter_by(email=data['email']).first()

        if admin and bcrypt.check_password_hash(admin._password_hash, data['password']):
            session['admin_id'] = admin.id
            response = make_response({'message': 'Login successful'}, 200)
            response.set_cookie('admin_id', str(admin.id))
            return response
        else:
            return {'message': 'Invalid email or password'}, 401
         
class ApprovalRequestsResource(Resource):
    def get(self):
        pending_requests = User.query.filter_by(approval_status='Pending').all()
        requests_data = [
            {
                'userId': user.id,
                'image_url': user.image_url,
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

        user = User.query.get(user_id)
        if user:
            if action == 'approve':
                user.approval_status = 'Approved'
                db.session.commit()
                self.send_approval_email(user.email)
                return {'message': 'User account approved successfully'}, 200
            elif action == 'delete':
                self.send_rejection_email(user.email)
                db.session.delete(user)
                db.session.commit()
                return {'message': 'User account deleted successfully'}, 200
            else:
                return {'message': 'Invalid action'}, 400
        else:
            return {'message': 'User not found'}, 404

    def send_approval_email(self, to_email):
        subject = "Account Approval"
        body = "Congratulations! Your account has been approved."
        self.send_email(to_email, subject, body)

    def send_rejection_email(self, to_email):
        subject = "Account Rejection"
        body = "We regret to inform you that your account application has been rejected."
        self.send_email(to_email, subject, body)

    def send_email(self, to_email, subject, body):
        msg = Message(subject, recipients=[to_email], body=body)
        mail.send(msg)
        
class DashboardResource(Resource):
    def get_dashboard_data():
        chart_data = {
            'labels': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            'datasets': [
                {
                    'label': 'Number of Requests',
                    'data': [10, 15, 20, 25, 30],
                    'borderColor': 'rgba(75, 192, 192, 1)',
                    'borderWidth': 2,
                },
            ],
        }
        return jsonify({'chartData': chart_data})

class LogoutResource(Resource):
    def get(self):
        session.pop('admin_id', None)
        return {'message': 'Logout successful'}, 200







api.add_resource(SignUpResource, '/signup')
api.add_resource(LoginResource, '/login')
api.add_resource(DonorsResource,'/donorh')
api.add_resource(CharityDetailsResource, '/donorh/<int:charity_id>')
api.add_resource(CharitiesResource,'/charityh')
api.add_resource(CharityRequestsResource, '/charity-requests/<int:charity_id>')
api.add_resource(NewsResource, '/news')
api.add_resource(ApprovalRequestsResource, '/approval-requests/<int:user_id>/', '/approval-requests/', strict_slashes=False)
api.add_resource(AddAdminResource, '/admin')
api.add_resource(AdminLoginResource, '/adminlogin')
api.add_resource(DashboardResource,'/dashboard')
api.add_resource(AdminProfileResource, '/adminprofile')
api.add_resource(LogoutResource, '/logout')



if __name__ == '__main__':
    
    app.run(port=5555, debug=True)