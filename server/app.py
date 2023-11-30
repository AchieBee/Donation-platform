from flask_cors import CORS
from flask import Flask, jsonify, request, session, make_response
from flask_restful import Api, Resource, reqparse
from models import User, Charity, Admin, Beneficiary, Inventory,Account, db
from flask_migrate import Migrate
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)




app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///charity.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key='qwwerrtyyu123'
db.init_app(app)
api = Api(app)
migrate = Migrate(app, db)


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
            user_id=data.get('user_id')
        )
        db.session.add(new_charity)
        db.session.commit()

        new_account = Account(
            paypal=data.get('paypal'),
            bank=data.get('bank'),
            mpesa=data.get('mpesa'),
            skrill=data.get('skrill'),
            charity_id=new_charity.id
        )
        db.session.add(new_account)
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
                "paypal": charity.account.paypal if charity.account else None,
                "bank": charity.account.bank if charity.account else None,
                "mpesa": charity.account.mpesa if charity.account else None,
                "skrill": charity.account.skrill if charity.account else None,
                
            })
        else:
            return jsonify({"error": "Charity not found"}), 404


class NewsResource(Resource):
    def get(self):
        news_list = Admin.query.all()
        news_data = [
            {
                'id': news.id,
                'news_title': news.news_title,
                'news_image': news.news_image,
                'news_text': news.news_text,
                'created_at': news.created_at,
                'charity_id': news.charity_id
            }
            for news in news_list
        ]

        return jsonify({'news': news_data})



api.add_resource(DonorsResource,'/donorh')
api.add_resource(CharityDetailsResource, '/donorh/<int:charity_id>')
api.add_resource(CharitiesResource,'/charityh')
api.add_resource(NewsResource, '/admin/news')


if __name__ == '__main__':
    
    app.run(port=5555, debug=True)