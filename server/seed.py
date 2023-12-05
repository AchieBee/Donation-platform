from app import app, db
from models import User, Charity, Admin, Beneficiary, Inventory
from datetime import datetime

with app.app_context():
    
 # Seed User
    user1 = User(full_name='John Doe', username='johndoe', email='john@example.com', image_url='https://i.pinimg.com/564x/ca/a7/c0/caa7c0a4efff8ebdf2efd88f0f1cf69a.jpg',user_type='Donation',approval_status='Approved')
    user1._password_hash='hashed_password'
    db.session.add(user1)

    user2 = User(full_name='Jane Doe', username='janedoe', email='jane@example.com', image_url='https://i.pinimg.com/564x/df/e4/c7/dfe4c7b7f4aab85f777e091b29b696c7.jpg',user_type='Donation',approval_status='Approved')
    user2._password_hash = 'hashed_password'
    db.session.add(user2)

    user3 = User(full_name='Mary Lee', username='marylee', email='mary@example.com', image_url='https://i.pinimg.com/564x/46/e2/9d/46e29d5be1fb6f3b82014ac7f5289b23.jpg',user_type='Donation',approval_status='Approved')
    user3._set_password_hash='hashed_password'
    db.session.add(user3)

    user4 = User(full_name='John Wick', username='johnwick', email='wick@example.com', image_url='https://i.pinimg.com/564x/26/e6/13/26e613efbf493b816d00f3d36fd4bf9f.jpg',user_type='Donation',approval_status='Approved')
    user4._password_hash='hashed_password'
    db.session.add(user4)

    user5 = User(full_name='Joe Cole', username='joecole', email='joe@example.com', image_url='https://i.pinimg.com/564x/11/42/52/1142520b864cebc5f30b650404d86359.jpg',user_type='Donation',approval_status='Approved')
    user5._password_hash='hashed_password'
    db.session.add(user5)

    user6 = User(full_name='Anne Louis', username='annelou', email='anne@example.com', image_url='https://i.pinimg.com/564x/2e/58/88/2e5888ed9cf3ac1c5bbbaf523d9dda57.jpg',user_type='Donation',approval_status='Approved')
    user6._password_hash='hashed_password'
    db.session.add(user6)

    # Seed Charity
    charity1 = Charity(name='Charity1', description='Description for Charity1', donation_amount=100,stories='Stories for Charity1', image_url='https://i.pinimg.com/564x/96/59/b6/9659b6909a3416d27c50c875e00a403a.jpg', posted_at=datetime.utcnow(), users=user1,paypal='example@gmail.com+ \n 254772467546',bank='01531637281 \n charity',mpesa='561239 \n hope1',skrill='kenya \n johndoe \n +254789663790')
    db.session.add(charity1)

    charity2 = Charity(name='Charity2', description='Description for Charity2', donation_amount=100,stories='Stories for Charity2', image_url='https://i.pinimg.com/564x/15/90/fe/1590fe78a001ca7856bf1d437a958c4b.jpg', posted_at=datetime.utcnow(), users=user1,paypal='example1@gmail.com \n +254702787546',bank='01594655281 \n charity',mpesa='464839 \n hope3',skrill='kenya \n johndoe \n +254760643790')
    db.session.add(charity2)

    charity3 = Charity(name='Charity3', description='Description for Charity3', donation_amount=100,stories='Stories for Charity3', image_url='https://i.pinimg.com/564x/60/44/10/6044105d2141ba75b0e39f1e76187b66.jpg', posted_at=datetime.utcnow(), users=user1,paypal='example2@gmail.com \n +254704567546',bank='01594630981 \n charity',mpesa='764939 \n hope4',skrill='kenya \n johndoe \n +254789689090')
    db.session.add(charity3)

    charity4 = Charity(name='Charity4', description='Description for Charity4', donation_amount=100,stories='Stories for Charity4', image_url='https://i.pinimg.com/564x/73/93/7b/73937bf137b0846a538a4941cdc223f2.jpg', posted_at=datetime.utcnow(), users=user1,paypal='example3@gmail.com \n +254706767546',bank='01570937281 \n charity',mpesa='064439 \n hope5',skrill='kenya \n johndoe \n +254789678790')
    db.session.add(charity4)

    charity5 = Charity(name='Charity5', description='Description for Charity5', donation_amount=100,stories='Stories for Charity5', image_url='https://images.pexels.com/photos/19069507/pexels-photo-19069507/free-photo-of-smiling-child-by-tree.jpeg?auto=compress&cs=tinysrgb&w=600',  posted_at=datetime.utcnow(), users=user1,paypal='example3@gmail.com \n +254706767546',bank='01570937281 \n charity',mpesa='064439 \n hope5',skrill='kenya \n johndoe \n +254789678790')
    db.session.add(charity5)

    charity6 = Charity(name='Charity6', description='Description for Charity6', donation_amount=100,stories='Stories for Charity6', image_url='https://i.pinimg.com/564x/d6/7d/b3/d67db34c7eaa0a96008369c216aa94b3.jpg',  posted_at=datetime.utcnow(),users=user1,paypal='example3@gmail.com \n +254706767546',bank='01570937281 \n charity',mpesa='064439 \n hope5',skrill='kenya \n johndoe \n +254789678790')
    db.session.add(charity6)
    # Seed Admin
    admin1 = Admin(fullname='Nic Exe', email='nic44@gmail.com' ,image_url='https://i.pinimg.com/564x/9a/e4/7f/9ae47f01dfed1a7ec357c555aeab916c.jpg',news_title='World Charity Day',news_image='https://i.pinimg.com/564x/51/57/9a/51579ab90620cb36fb8592b19cd4280f.jpg', news_text='On 4 December 2023 ,there will be a world charity day which will take place at our headquarters on Ngongroad 1st lane. We  have games for children and adults that will make and gear the day towards a fruitful charity event.' ,created_at=datetime.utcnow(),charities2=charity1)
    admin1._password_hash='hashed_password'
    db.session.add(admin1)

    admin2 = Admin(fullname='Belza Archie', email='belza44@gmail.com' ,image_url='https://i.pinimg.com/564x/50/2e/20/502e205580c40d854fcb6ec547c7dc14.jpg',news_title='Climate Conservation',news_image='https://i.pinimg.com/564x/fc/c5/6f/fcc56fb069402b40a9bb680835da37b1.jpg', news_text='The climate conservation  day was a success and we were able to raise a substantial amount in order to achieve the intended goal for climate change awareness and to also organize for a community environment  cleanup . Thanks to all who participated.' ,created_at=datetime.utcnow(),charities2=charity3)
    admin2._password_hash='hashed_password'
    db.session.add(admin2)

    admin3 = Admin(fullname='Toby Omondi', email='toby44@gmail.com' ,image_url='https://i.pinimg.com/564x/85/81/42/8581425e8ea241666d6583d1f327fdf8.jpg',news_title='Water for all',news_image='https://i.pinimg.com/564x/57/5c/36/575c363b3d4fd67dea0547ce2cdcb1de.jpg', news_text='On 12th November our partners - Charity Ke were able to dig boreholes for communities in desert-prone areas, through the cause that was posted on our platform. We thank and highly appreciate everybody who participated in the execise and cause.Kudos!' ,created_at=datetime.utcnow(),charities2=charity4)
    admin3._password_hash='hashed_password'
    db.session.add(admin3)

    # Seed Beneficiary
    beneficiary1 = Beneficiary(name='Beneficiary1', image_url='https://images.pexels.com/photos/6646907/pexels-photo-6646907.jpeg?auto=compress&cs=tinysrgb&w=600', stories='Stories for Beneficiary1', charities3=charity1)
    db.session.add(beneficiary1)

    beneficiary2 = Beneficiary(name='Beneficiary2', image_url='https://images.pexels.com/photos/933624/pexels-photo-933624.jpeg?auto=compress&cs=tinysrgb&w=600', stories='Stories for Beneficiary2', charities3=charity2)
    db.session.add(beneficiary2)

    beneficiary3 = Beneficiary(name='Beneficiary3', image_url='https://i.pinimg.com/564x/7a/8b/0f/7a8b0fd9eba59136a6baa8c32ef62356.jpg', stories='Stories for Beneficiary3', charities3=charity3)
    db.session.add(beneficiary3)

    #Seed Inventory
    inventory1 = Inventory(item_name='hope1', amount='$20')
    db.session.add(inventory1)
    inventory2 = Inventory(item_name='hope2', amount='$65')
    db.session.add(inventory2)
    inventory3 = Inventory(item_name='hope3', amount='$40')
    db.session.add(inventory3)

    db.session.commit()
    print('Seeding done')
