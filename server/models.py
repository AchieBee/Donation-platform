from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    user_type = db.Column(db.String, nullable=False)
    approval_status = db.Column(db.String(50), default='Approved')
    _password_hash = db.Column(db.String)

    #relationship
    charities = db.relationship('Charity', back_populates= 'users')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('password hash may not be viewed')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash,password.encode('utf-8'))

class Admin(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String(255), nullable=False)

    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'))
    

    #relationship
    charities2 = db.relationship('Charity', back_populates= 'admin')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('password hash may not be viewed')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash,password.encode('utf-8'))

class News(db.Model):
    __tablename__ = 'news'
    id = db.Column(db.Integer, primary_key=True)
    news_title = db.Column(db.String)
    news_image = db.Column(db.String)
    news_text = db.Column(db.String)
    created_at= db.Column(db.DateTime, default=datetime.utcnow)

class Charity(db.Model):
    __tablename__ = 'charities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    donation_amount = db.Column(db.Integer)
    stories = db.Column(db.String)
    image_url= db.Column(db.String)
    posted_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    paypal_email = db.Column(db.String)
    paypal_no = db.Column(db.String)
    bank_no= db.Column(db.String)
    acc_name= db.Column(db.String)
    mpesa_paybill= db.Column(db.String)
    mpesa_acc= db.Column(db.String)
    skrill_country= db.Column(db.String)
    skrill_name= db.Column(db.String)
    phone_no= db.Column(db.String)
    

    #relationship
    users = db.relationship('User', back_populates= 'charities')
    admin = db.relationship('Admin', back_populates= 'charities2')
    beneficiary = db.relationship('Beneficiary', back_populates= 'charities3')



class Beneficiary(db.Model):
    __tablename__ = 'beneficiaries'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image_url = db.Column(db.String)
    stories = db.Column(db.String)
    charity_id = db.Column(db.ForeignKey('charities.id'))

    #relationship
    charities3 = db.relationship('Charity', back_populates= 'beneficiary')
    inventories = db.relationship('Inventory', back_populates= 'beneficiaries2')

class Inventory(db.Model):
    __tablename__ = 'inventories'
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String)
    amount = db.Column(db.Integer)
    charity_id = db.Column(db.ForeignKey('beneficiaries.id'))

    #relationship
    beneficiaries2 = db.relationship('Beneficiary', back_populates= 'inventories')

